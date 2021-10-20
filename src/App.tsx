import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {
    todolistReducer,
    deleteTodolistAC,
    addTodolistAC,
    changeTitleTodolistAC,
    changeFilterTodolistAC, newStateTodolistAC
} from "./state/todolist-reducer";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    newStateTasktAC,
    taskReducer
} from "./state/task-reducer";

export type filterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string
    title: string
    filter: filterValuesType
}
export type taskType = {
    id: string
    title: string
    isDone: boolean
}

export type ObjTasksType = { [key: string]: taskType[] }

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolist, dispatchTodolist] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to Learn', filter: 'all'},
        {id: todolistID2, title: 'What to Buy', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ]
    });

    useEffect(() => {
        let localTasksString = localStorage.getItem('tasks');
        if (localTasksString) {
            let newTasksValue = JSON.parse(localTasksString);
            dispatchTasks(newStateTasktAC(newTasksValue));
        }

        let localTodolistsString = localStorage.getItem('todolists');
        if (localTodolistsString) {
            let newTodolistsValue = JSON.parse(localTodolistsString);
            newTodolistsValue = [...newTodolistsValue].map(tl => ({...tl, filter: 'all'}));
            dispatchTodolist(newStateTodolistAC(newTodolistsValue));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('todolists', JSON.stringify(todolist));
    }, [todolist]);

    const removeTask = (todolistID: string, id: string) => {
        dispatchTasks(removeTaskAC(todolistID, id));
    }
    const addTask = (todolistID: string, title: string) => {
        dispatchTasks(addTaskAC(todolistID, title));
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeStatusTaskAC(todolistID, taskId, isDone));
    }
    const changeTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        dispatchTasks(changeTitleTaskAC(todolistID, taskId, newTitle));
    }

    //Todolists Functions
    const changeFilter = (todolistID: string, value: filterValuesType) => {
        dispatchTodolist(changeFilterTodolistAC(value, todolistID));
    }
    const changeTitleTodolist = (todolistID: string, newTitle: string) => {
        dispatchTodolist(changeTitleTodolistAC(newTitle, todolistID));
    }
    const deleteTodolist = (todolistID: string) => {
        const action = deleteTodolistAC(todolistID);
        dispatchTodolist(action);
        dispatchTasks(action);
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTasks(action)
        dispatchTodolist(action);
    }

    const todolistList = todolist.map(tl => {
        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }

        return (
            <Grid item>
                <Paper className={'todolistWrapper'} elevation={5}>
                    <TodoList title={tl.title}
                              key={tl.id}
                              todolistID={tl.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              changeTaskTitle={changeTaskTitle}
                              filter={tl.filter}
                              deleteTodolist={deleteTodolist}
                              changeTitleTodolist={changeTitleTodolist}
                    />
                </Paper>
            </Grid>
        );
    })

    return (
        <div className="App">
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

            <Container fixed>
                <Grid className={'addTodolistWrapper'} container>
                    <AddItemForm titleList={'Add list'} callback={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolistList}
                </Grid>
            </Container>
        </div>
    );
}

export default App;