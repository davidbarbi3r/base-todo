import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from 'firebase/firestore';
import { database } from '../config/config';

type Props = {
    todoId: string
}

export default function DeleteTodo({todoId}: Props) {

    const handleDelete = async (todoId: string) => {
        await deleteDoc(doc(database, "todos", todoId))
    }

  return (
    <>
    </>
  )
}