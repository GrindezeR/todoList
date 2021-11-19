import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "./Task.module.css";
import {Checkbox} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskAPIStatuses, TaskAPIType} from "../../API/todolist-api";

type TaskPropsType = {
    todolistId: string
    task: TaskAPIType

    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskAPIStatuses) => void
    deleteTask: (todolistId: string, taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {todolistId, task, changeTaskStatus, changeTaskTitle, deleteTask} = props
    const {id, title, status} = task

    const deleteTaskHandler = useCallback(() => {
        deleteTask(todolistId, id)
    }, [deleteTask, todolistId, id]);

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(todolistId, id, newIsDoneValue ? TaskAPIStatuses.Completed : TaskAPIStatuses.New)
    }, [changeTaskStatus, todolistId, id]);

    const changeTaskTitleCallback = useCallback((title: string) => {
        changeTaskTitle(todolistId, id, title)
    }, [changeTaskTitle, todolistId, id]);

    return (
        <div className={status === TaskAPIStatuses.Completed ? s.done : ''}>
            <Checkbox color={'info'}
                      onChange={changeTaskStatusHandler}
                      checked={status === TaskAPIStatuses.Completed}/>
            <EditableSpan title={title} callback={changeTaskTitleCallback}/>
            <IconButton size={'small'} onClick={deleteTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});