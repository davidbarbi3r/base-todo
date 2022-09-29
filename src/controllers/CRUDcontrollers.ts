import {
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";
import { database } from "../config/config";
import ITodo from "../interface/todo";

export const crud = {

  create: async (newTodo: ITodo) => {
    await addDoc(collection(database, "todos"), newTodo);
  },

  update: async (
    editedTodo: ITodo,
    setEdit: (value: React.SetStateAction<boolean>) => void,
    todoId: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => {
    await updateDoc(doc(database, "todos", todoId), {
        done: event ? event?.target.checked : editedTodo.done,
        text: editedTodo.text,
      })
    setEdit(false);
  },

  delete: async (todoId: string) => {
    await deleteDoc(doc(database, "todos", todoId));
  },
};
