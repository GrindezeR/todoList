import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    FiltersValueType,
    getTodolistsTC,
    TodolistDomainType
} from "./todolist_reducer";
import {addTaskTC, deleteTaskTC, TaskDomainType, updateTaskTC} from "./task_reducer";
import React, {useCallback, useEffect} from "react";
import {TasksStatuses} from "../../api/todolist-api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import s from "./TodolistsList.module.css";
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: PropsType) => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskDomainType>(state => state.tasks);
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(getTodolistsTC());
    }, [dispatch, demo, isLoggedIn])

    //Tasks Functions
    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId));
    }, [dispatch]);
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TasksStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}));
    }, [dispatch]);
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title));
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}));
    }, [dispatch]);

    //Todolists Functions
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title));
    }, [dispatch]);
    const changeTodolistFilter = useCallback((todolistId: string, filterValue: FiltersValueType) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue));
    }, [dispatch]);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);
    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId));
    }, [dispatch]);


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const todolistList = todolists.map(tl => {
        const tasksForTodolist = tasks[tl.id];

        return (
            <Grid key={tl.id} item>
                <Paper className={s.todolistWrapper} elevation={5}>
                    <Todolist
                        todolist={tl}
                        tasks={tasksForTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        deleteTodolist={deleteTodolist}
                        changeTodolistFilter={changeTodolistFilter}
                        changeTaskTitle={changeTaskTitle}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTask={deleteTask}
                        demo={demo}
                    />
                </Paper>
            </Grid>
        );
    })

    return (
        <>
            <Grid className={s.addItemFormWrapper} container>
                <AddItemForm title={'Add list'} callback={addTodolist}/>
            </Grid>
            <Grid className={s.listWrapper} container spacing={4}>
                {todolistList}
            </Grid>
        </>
    );
}