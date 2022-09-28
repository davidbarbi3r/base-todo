import { Box, FormControlLabel, Grid, Button, ButtonGroup, TextField, Typography, ListItem, Divider, ListItemText } from "@mui/material";
import ITodo from "../interface/todo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import CheckBox from "@mui/material/Checkbox";
import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { database } from "../config/config";

type Props = {
  todo: ITodo;
};

export default function DisplayTodo({ todo }: Props) {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState<string>("");

  const handleEdit = async () => {
    setEdit(false);
    if (editText != "") {
      await updateDoc(doc(database, "todos", todo.id), { text: editText });
    }
  };

  const handleDelete = async (todoId: string) => {
    await deleteDoc(doc(database, "todos", todoId))
  }

  return (
    <>
    <ListItem>
    
      <Grid
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <FormControlLabel control={<CheckBox />} label=""/>
        {edit ? (
            <TextField
              autoFocus
              defaultValue={todo.text}
              onChange={(e) => setEditText(e.target.value)}
            ></TextField>
        ) : (
          <ListItemText primary={todo.text} secondary={todo.echeanceDate ? todo.echeanceDate?.toString() : ""}></ListItemText>
        )}
        <Grid display={"flex"} alignItems={"right"}>
          
          
        </Grid>
        
        <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
          {edit ? <Button onClick={() => handleEdit()}><SaveAltOutlinedIcon/></Button>: ""}
          <Button onClick={() => setEdit((prev) => !prev)}><EditIcon/></Button>
          <Button onClick={() => handleDelete(todo.id)}><DeleteIcon/></Button>
        </ButtonGroup>
      </Grid>
    </ListItem>
    <Divider/>
    </>
  );
}
