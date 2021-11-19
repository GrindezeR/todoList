import React, {useCallback, useEffect} from "react";
import s from './Todolist.module.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Task} from "../Task/Task";
import IconButton from "@mui/material/IconButton";
import {DeleteForever} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {TaskAPIStatuses, TaskAPIType} from "../../API/todolist-api";
import {FiltersValueType} from "../../state/todolist_reducer";
import {useDispatch} from "react-redux";
import {getTasksTC} from "../../state/task_reducer";

type TodolistPropsType = {
    tasks: TaskAPIType[]
    title: string
    filter: FiltersValueType
    todolistId: string
    deleteTodolist: (todolistId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FiltersValueType) => void
    changeTodolistTitle: (todolistId: string, title: string) => void

    addTask: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskAPIStatuses) => void
    deleteTask: (todolistId: string, taskId: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const {
        tasks, title, filter,
        todolistId,
        deleteTask, changeTaskStatus, addTask, changeTaskTitle,
        changeTodolistFilter, deleteTodolist, changeTodolistTitle,
    } = props

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksTC(todolistId));
    }, [dispatch, todolistId])

    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => t.status === TaskAPIStatuses.New);
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.status === TaskAPIStatuses.Completed);
    }

    const tasksList = filteredTasks.map(t => {
        return (
            <Task key={t.id}
                  task={t}
                  todolistId={todolistId}
                  changeTaskTitle={changeTaskTitle}
                  changeTaskStatus={changeTaskStatus}
                  deleteTask={deleteTask}/>
        );
    })

    //Callbacks
    const allFilterHandler = useCallback(() => {
        changeTodolistFilter(todolistId, 'all')
    }, [changeTodolistFilter, todolistId]);

    const activeFilterHandler = useCallback(() => {
        changeTodolistFilter(todolistId, 'active')
    }, [changeTodolistFilter, todolistId]);

    const completeFilterHandler = useCallback(() => {
        changeTodolistFilter(todolistId, 'completed')
    }, [changeTodolistFilter, todolistId]);

    const deleteTodolistHandler = useCallback(() => {
        deleteTodolist(todolistId)
    }, [deleteTodolist, todolistId]);

    const changeTodolistTitleCallback = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title)
    }, [changeTodolistTitle, todolistId]);

    const addTaskCallback = useCallback((title: string) => {
        addTask(todolistId, title)
    }, [addTask, todolistId]);


    //Styles
    const allStyle = filter === 'all' ? 'contained' : 'text';
    const activeStyle = filter === 'active' ? 'contained' : 'text';
    const completeStyle = filter === 'completed' ? 'contained' : 'text';

    return (
        <div key={todolistId} className={s.wrapper}>
            <h3 className={s.title}>
                <EditableSpan title={title} callback={changeTodolistTitleCallback}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteForever color={'error'}/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskCallback}/>
            <div className={s.tasksWrapper}>{tasksList}</div>
            <div className={s.btnWrapper}>
                <Button title={'All'}
                        className={s.filterBtn}
                        color={"info"}
                        variant={allStyle}
                        onClick={allFilterHandler}>All
                </Button>

                <Button title={'Active'}
                        className={s.filterBtn}
                        color={"warning"}
                        variant={activeStyle}
                        onClick={activeFilterHandler}>Active
                </Button>

                <Button title={'All'}
                        className={s.filterBtn}
                        color={"success"}
                        variant={completeStyle}
                        onClick={completeFilterHandler}>Completed
                </Button>
            </div>
        </div>
    );
});