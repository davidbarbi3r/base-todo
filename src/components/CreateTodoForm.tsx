import { Dayjs } from "dayjs";
import { User } from "firebase/auth";
import { useRef, useState } from "react";
import DateInput from "./DateInput";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Box,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { crud } from "../controllers/CRUDcontrollers";
import ITodo from "../interface/todo";

interface Props {
  user: User | null;
  todos: ITodo[];
}

export default function CreateTodo({ user, todos }: Props) {
  const form = useRef<null | HTMLFormElement>(null); //created to reset form
  const [echeanceDate, setEcheanceDate] = useState<Dayjs | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    crud.create(newTodo);
    form.current && form.current.reset();
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 4,
          alignItems: "center",
          maxWidth: "1200px",
        }}
      >
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="button">Create new Todo</Typography>
          </AccordionSummary>
          <AccordionDetails >
            <Box
              component="form"
              ref={form}
              onSubmit={handleSubmit}
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
                <Grid item xs={12} sm={40}>
                  <FormControlLabel
                    control={<Switch value={true} color="primary" />}
                    label="Important task"
                    name="important"
                  />
                </Grid>
                <Grid item xs={12} sm={40}>
                <DateInput
                  echeanceDate={echeanceDate}
                  setEcheanceDate={setEcheanceDate}
                />
                </Grid>
                <Grid item width={"100%"} textAlign="right">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, maxWidth: "150px", width: "30%" }}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
