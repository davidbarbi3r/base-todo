import {
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";
import { database } from "../config/config";
import ITodo from "../interface/todo";

export const todoCRUD = {

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

export const excelCRUD = {

  post: async (data: unknown[]) => {
    // iteate through the data and post it to the database

    for await (const item of data) {
      await addDoc(collection(database, "testExcel"), item);
    };
  },

  get: async () => {
    // get all the data from the testExcel collection
    const data = await getDocs(collection(database, "testExcel"));
    return data.docs.map((doc) => doc.data());
  },
};
