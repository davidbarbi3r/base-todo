import {
  FormControlLabel,
  Grid,
  Button,
  ButtonGroup,
  TextField,
  ListItem,
  Divider,
  ListItemText,
  Chip,
  Checkbox,
  Typography,
} from "@mui/material";
import ITodo from "../interface/todo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../config/config";
import { crud } from "../controllers/CRUDcontrollers";
import dayjs from "dayjs";

type Props = {
  todo: ITodo;
};

export default function DisplayTodo({ todo }: Props) {
  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState<ITodo>(todo);

  return (
    <>
      <ListItem sx={todo.done ? {backgroundColor: "lightgray", borderRadius: "5px", mb: 0.5} : {}}>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={todo.done}
                onChange={(e) => crud.update(editedTodo, setEdit, todo.id, e)}
              />
            }
            label=""
          />
          {edit ? (
            <TextField
              autoFocus
              defaultValue={todo.text}
              onChange={(e) => setEditedTodo({ ...todo, text: e.target.value })}
            ></TextField>
          ) : (
            <>
              <ListItemText
                sx={todo.done? {textDecoration: "line-through"} : {}}
                primary={todo.text}
                secondary={`Limit date: ${todo.echeanceDate?.split(' ')[0]}`}
              >
              </ListItemText>
              <Grid>
              {todo.important && (
                <Chip
                  sx={{ m: 1 }}
                  icon={<PriorityHighIcon />}
                  variant="outlined"
                  color="warning"
                  size="small"
                  label="important"
                />
              )}
              <Chip
                  sx={{ m: 1 }}
                  variant="outlined"
                  color="info"
                  size="small"
                  label={todo.type as string}
                />
                </Grid>
            </>
          )}
          <ButtonGroup
            size="small"
            variant="outlined"
            aria-label="outlined button group"
          >
            {edit ? (
              <Button onClick={() => crud.update(editedTodo, setEdit, todo.id)}>
                <SaveAltOutlinedIcon />
              </Button>
            ) : (
              ""
            )}
            <Button onClick={() => setEdit((prev) => !prev)}>
              <EditIcon />
            </Button>
            <Button onClick={() => crud.delete(todo.id)}>
              <DeleteIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
}
