import {
  AppBar,
  Box,
  CssBaseline,
  List,
  Toolbar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
  FormControl,
  NativeSelect,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodoForm";
import DisplayTodo from "../components/Todo";
import Header from "../components/Header";
import ITodo from "../interface/todo";
import { User } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../config/config";
import logging from "../config/logging";
import dayjs from "dayjs";

interface Props {
  user: User | null;
}

export default function TodoApp({ user }: Props) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("");

  const queryTodos = user?.uid
    ? query(collection(database, "todos"), where("userId", "==", user?.uid))
    : collection(database, "todos");

  useEffect(() => {
    const unsub = onSnapshot(queryTodos, (res) => {
      setTodos(res.docs.map((todo): any => ({ ...todo.data(), id: todo.id })));
      logging.info("Database updated");
    });
    return unsub;
  }, []);

  const todosDisplay = todos
    .sort(
      (a, b) =>
        dayjs(b.creationDate, "DD/MM/YYYY HH/mm/ss").toDate().valueOf() -
        dayjs(a.creationDate, "DD/MM/YYYY HH/mm/ss").toDate().valueOf()
    )
    .filter((todo) => !todo.done)
    .filter((todo) => typeFilter ? todo.type === typeFilter : !todo.done)
    .map((todo) => <DisplayTodo todo={todo} key={todo.id} />);

  const doneTodosDisplay = todos
    .sort(
      (a, b) =>
      dayjs(b.creationDate, "DD/MM/YYYY HH/mm/ss").toDate().valueOf() -
      dayjs(a.creationDate, "DD/MM/YYYY HH/mm/ss").toDate().valueOf()
    )
    .filter((todo) => todo.done)
    .map((todo) => <DisplayTodo todo={todo} key={todo.id} />);

  return (
    <Box sx={{ p: 0, m: 0, width: 1 }}>
      <Header user={user} />
      <CreateTodo user={user} todos={todos} />
      <Accordion
        sx={{ margin: 3 }}
        expanded={todos.filter((todo) => !todo.done).length ? true : false}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Todos</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <FormControl>
            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
              Type filter
            </InputLabel>
            <NativeSelect
              defaultValue=""
              onChange={(e) => setTypeFilter(e.currentTarget.value)}
             >
              <option value="">All</option>
              <option value="work">Work</option>
              <option value="home">Home</option>
              <option value="other">Other</option>
            </NativeSelect>
          </FormControl>
          <List>{todosDisplay}</List>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ margin: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Done todos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>{doneTodosDisplay}</List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
