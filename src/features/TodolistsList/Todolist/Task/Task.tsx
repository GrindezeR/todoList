import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import s from "./Task.module.css";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {TasksStatuses, TaskType} from "../../../../api/todolist-api";

type TaskPropsType = {
    todolistId: string
    task: TaskType
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TasksStatuses) => void
    deleteTask: (todolistId: string, taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const {todolistId, task, changeTaskStatus, changeTaskTitle, deleteTask} = props
    const {id, title, status, entityStatus} = task

    const disableWhileLoading = entityStatus === 'loading';
    const deleteTaskHandler = useCallback(() => {
        deleteTask(todolistId, id)
    }, [deleteTask, todolistId, id]);

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(todolistId, id, newIsDoneValue ?
            TasksStatuses.Completed : TasksStatuses.New)
    }, [changeTaskStatus, todolistId, id]);

    const changeTaskTitleCallback = useCallback((title: string) => {
        changeTaskTitle(todolistId, id, title)
    }, [changeTaskTitle, todolistId, id]);

    return (
        <div className={status === TasksStatuses.Completed ? s.done : ''}>
            <Checkbox color={'info'}
                      onChange={changeTaskStatusHandler}
                      checked={status === TasksStatuses.Completed}
                      disabled={entityStatus === 'loading'}
            />
            <EditableSpan title={title}
                          callback={changeTaskTitleCallback}
                          disabled={disableWhileLoading}/>
            <IconButton size={'small'} onClick={deleteTaskHandler} disabled={disableWhileLoading}>
                <Delete/>
            </IconButton>
        </div>
    );
});