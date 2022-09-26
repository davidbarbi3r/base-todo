import { Box, FormControlLabel, Grid } from '@mui/material'
import ITodo from '../interface/todo'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckBox from '@mui/material/Checkbox';

type Props = {
    todo: ITodo,
    removeTodo: (id: string) => void
}

export default function DisplayTodo({todo, removeTodo}: Props) {
  return (
    <Box display={'flex'} flexDirection={"column"} alignItems={'center'} border={'1px solid lightgrey'}>
        <Grid display={'flex'} alignItems={'center'} justifyContent={'space-evenly'} width={"100%"}>
            <h3>{todo.text}</h3>
            <Grid display={'flex'} alignItems={'right'}>
                <AddIcon/>
                <DeleteIcon onClick={() => removeTodo(todo.id)}/>
            </Grid>
            <FormControlLabel control={<CheckBox color='success'/>} label="done"/>
        </Grid>
    </Box>
  )
}