import React, {useCallback} from "react";
import {FiltersValueType, TaskType} from "../../App";
import s from './Todolist.module.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Task} from "../Task/Task";
import IconButton from "@mui/material/IconButton";
import {DeleteForever} from "@mui/icons-material";
import Button from "@mui/material/Button";

type TodolistPropsType = {
    tasks: TaskType[]
    title: string
    filter: FiltersValueType
    todolistId: string
    deleteTodolist: (todolistId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FiltersValueType) => void
    changeTodolistTitle: (todolistId: string, title: string) => void

    addTask: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    const {
        tasks, title, filter,
        todolistId,
        deleteTask, changeTaskStatus, addTask, changeTaskTitle,
        changeTodolistFilter, deleteTodolist, changeTodolistTitle,
    } = props

    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone);
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

    //Styles
    const allStyle = filter === 'all' ? 'contained' : 'text';
    const activeStyle = filter === 'active' ? 'contained' : 'text';
    const completeStyle = filter === 'completed' ? 'contained' : 'text';

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