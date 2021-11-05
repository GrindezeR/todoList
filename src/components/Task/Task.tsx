import React, {useCallback} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "./Task.module.css";
import {TaskType} from "../../App";
import {Checkbox} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";

type TaskPropsType = {
    todolistId: string
    task: TaskType

    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string) => void
    deleteTask: (todolistId: string, taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {todolistId, task, changeTaskStatus, changeTaskTitle, deleteTask} = props
    const {id, title, isDone} = task

    const deleteTaskHandler = useCallback(() => {
        deleteTask(todolistId, id)
    }, [deleteTask, todolistId, id]);

    const changeTaskStatusHandler = useCallback(() => {
        changeTaskStatus(todolistId, id)
    }, [changeTaskStatus, todolistId, id]);

    const changeTaskTitleCallback = useCallback((title: string) => {
        changeTaskTitle(todolistId, id, title)
    }, [changeTaskTitle, todolistId, id]);

    return (
        <div className={isDone ? s.done : ''}>
            <Checkbox color={'info'}
                      onChange={changeTaskStatusHandler}
                      checked={isDone}/>
            <EditableSpan title={title} callback={changeTaskTitleCallback}/>
            <IconButton size={'small'} onClick={deleteTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});