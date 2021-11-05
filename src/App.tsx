import React, {useCallback, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistTitleAC, deleteTodolistAC,
    changeTodolistFilterAC,
    InitialTodolistStateType, setTodolistFromLocalStorageAC
} from "./state/todolist_reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    InitialTaskStateType, setTasksFromLocalStorageAC
} from "./state/task_reducer";
import {AppRootStateType} from "./store/store";
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Todolist} from './components/Todolist/Todolist';
import s from './App.module.css';


export type FiltersValueType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        let todolistFromLS = localStorage.getItem('todolists');
        if (todolistFromLS) {
            dispatch(setTodolistFromLocalStorageAC(JSON.parse(todolistFromLS)));
        }
        let taskFromLS = localStorage.getItem('tasks');
        if (taskFromLS) {
            dispatch(setTasksFromLocalStorageAC(JSON.parse(taskFromLS)));
        }
    }, [dispatch])

    const todolists = useSelector<AppRootStateType, InitialTodolistStateType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, InitialTaskStateType>(state => state.tasks);


    useEffect(() => {
        localStorage.setItem('todolists', JSON.stringify(todolists));
    }, [todolists])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    //Tasks Functions
    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC(todolistId, taskId));
    }, [dispatch]);
    const changeTaskStatus = useCallback((todolistId: string, taskId: string) => {
        dispatch(changeTaskStatusAC(todolistId, taskId));
    }, [dispatch]);
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title));
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title));
    }, [dispatch]);

    //Todolists Functions
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, [dispatch]);
    const changeTodolistFilter = useCallback((todolistId: string, filterValue: FiltersValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue));
    }, [dispatch]);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch]);
    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistAC(todolistId));
    }, [dispatch]);


    const todolistList = todolists.map(tl => {
        const tasksForTodolist = tasks[tl.id];

        return (
            <Grid key={tl.id} item>
                <Paper className={s.todolistWrapper} elevation={5}>
                    <Todolist todolistId={tl.id}
                              tasks={tasksForTodolist}
                              title={tl.title}
                              filter={tl.filter}

                              changeTodolistTitle={changeTodolistTitle}
                              deleteTodolist={deleteTodolist}
                              changeTodolistFilter={changeTodolistFilter}
                              changeTaskTitle={changeTaskTitle}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              deleteTask={deleteTask}/>
                </Paper>
            </Grid>
        );
    })

    return (
        <div className={s.mainApp}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container className={s.todolistsContainer} fixed>
                <Grid className={s.addTodolistWrapper} container>
                    <AddItemForm title={'Add list'} callback={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistList}
                </Grid>
            </Container>
        </div>
    );
}

export default App;