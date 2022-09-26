import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";
import DisplayTodo from "../components/DisplayTodo";
import Header from "../components/Header";
import ITodo, { DEFAULT_TODO } from "../interface/todo";
import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/config";

interface Props {
  user: User | null;
}

export default function TodoApp({ user }: Props) {
  const [todos, setTodos] = useState<ITodo[]>([DEFAULT_TODO]);

  const createTodo = (todo: ITodo): void => {
    setTodos((prev) => [todo, ...prev]);
    console.log(todos);
  };

  const removeTodo = (id: string): void => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    // getDocs(collection(database, "todo")).then((res) =>
      // console.log(res.docs.map((doc): ITodo => ({ ...doc.data(), id: doc.id}))));
  }, [todos]);

  const todoDisplay = todos.map((todo) => (
    <DisplayTodo todo={todo} key={todo.id} removeTodo={removeTodo} />
  ));

  return (
    <Box maxWidth="xl" height={"100vh"}>
      <Header user={user} />
      <CreateTodo createTodo={createTodo} user={user} />
      <div>{todoDisplay}</div>
    </Box>
  );
}
