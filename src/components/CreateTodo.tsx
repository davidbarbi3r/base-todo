import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Switch from '@mui/material/Switch';
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Checkbox, Grid } from "@mui/material";
import ITodo from "../interface/todo";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../config/config";
import { useRef } from "react";
import DateInput from "./DateInput";

interface ICreateTodoProps {
  user: User | null;
  todos: ITodo[];
}

export default function CreateTodo({ user, todos }: ICreateTodoProps) {

  const form = useRef<null | HTMLFormElement>(null); //created to reset form
  const [echeanceDate, setEcheanceDate] = React.useState<Dayjs | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //A new todo formated with ITodo interface
    const newTodo: ITodo = {
      userId: user ? user.uid : "",
      text: data.get("text") ? data.get("text")?.toString() : "",
      creationDate: Date.now(),
      echeanceDate: echeanceDate ? echeanceDate?.toDate() : null,
      done: false,
      important: data.get("important") ? true : false,
      urgent: data.get("urgent") ? true : false,
      id: `${todos.length}`,
    };

    await addDoc(collection(database, "todos"), newTodo);

    form.current && form.current.reset();
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "left",
        }}
      >
        <Typography component="h2" variant="h5">
          Create Todo
        </Typography>
        <Box
          component="form"
          ref={form}
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2} flexDirection="column">
            <Grid item xs={12} sm={40}>
              <TextField
                name="text"
                required
                fullWidth
                id="text"
                label="My new todo"
                autoFocus
              />
            </Grid>
            <Grid item xs={30}>
              <FormControlLabel
                control={<Switch value={true} color="primary" />}
                label="Important task"
                name="important"
              />
            </Grid>
            <DateInput echeanceDate={echeanceDate} setEcheanceDate={setEcheanceDate}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
