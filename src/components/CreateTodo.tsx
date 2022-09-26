import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Checkbox, Grid } from "@mui/material";
import ITodo from "../interface/todo";
import { User } from "firebase/auth";
import {addDoc, collection} from "firebase/firestore"
import { database } from "../config/config";

interface ICreateTodoProps {
  createTodo: (todo: ITodo) => void
  user: User | null
}

export default function CreateTodo({createTodo, user}:ICreateTodoProps) {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newTodo: ITodo = {
      userId: user ? user.uid : "",
      text: data.get("text") ? data.get("text")?.toString() : "",
      creationDate: new Date(),
      done: false,
      important: data.get("important") ? true : false,
      urgent: data.get("urgent") ? true : false,
      id:""  
    }
    await addDoc(collection(database, "todo"), newTodo)
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "left"
        }}
      >
        <Typography component="h2" variant="h5">
          Create Todo
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                control={<Checkbox value={true} color="primary" />}
                label="[IMPORTANT] Check if it's important to achieve your goals"
                name="important"
              />
            </Grid>
            <Grid item xs={30}>
              <FormControlLabel
                control={<Checkbox value={true} color="primary" />}
                label="[URGENT] Check if the deadline is less than 5 days"
                name="urgent"
              />
            </Grid>
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
