import { AppBar, Box, CssBaseline, List, Toolbar, Typography } from "@mui/material";
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";
import DisplayTodo from "../components/DisplayTodo";
import Header from "../components/Header";
import ITodo from "../interface/todo";
import { User } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { database } from "../config/config";
import logging from "../config/logging";

interface Props {
  user: User | null;
}

export default function TodoApp({ user }: Props) {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const queryTodos = user?.uid
    ? query(collection(database, "todos"), where("userId", "==", user?.uid))
    : collection(database, "todos");

  useEffect(() => {
    const unsub = onSnapshot(queryTodos, (res) => {
      setTodos(res.docs.map((todo):any => ({...todo.data(), id: todo.id})))
      logging.info("Database updated")
    });
    return unsub
  }, []);

  const todoDisplay = todos
    .sort((a, b) => b.creationDate - a.creationDate)
    .map((todo) => (
      <DisplayTodo todo={todo} key={todo.id} />
    ));

  return (
    <Box sx={{ p: 0, m: 0, width: 1 }}>
      <Header user={user} />
      <CreateTodo
        user={user}
        todos={todos}
      />
      <List>{todoDisplay}</List>
    </Box>
  );
}
