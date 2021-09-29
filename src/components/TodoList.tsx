import React, {ChangeEvent} from 'react';
import {Button, Checkbox, IconButton} from "@mui/material";
import {filterValuesType,taskType} from '../App';
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import s from './TodoList.module.css';
import {Delete, DeleteForever} from "@mui/icons-material";

type PropsType = {
    title: string
    tasks: Array<taskType>
    filter: filterValuesType
    todolistID: string
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: filterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTitleTodolist: (todolistID: string, newTitle: string) => void
}

export function TodoList({tasks, filter, todolistID, ...props}: PropsType) {
    //Create lists
    const taskList = tasks.map(t => {
        const onClickHandler = () => props.removeTask(todolistID, t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
        }

        const onChangeTitleHandler = (inputValue: string) => {
            props.changeTaskTitle(todolistID, t.id, inputValue);
        }

        return <div key={t.id} className={t.isDone ? s.done : s.tasks}>
            <IconButton size={"small"} onClick={onClickHandler}>
                <Delete/>
            </IconButton>
            <Checkbox color={'info'}
                      onChange={onChangeHandler}
                      checked={t.isDone}/>
            <EditableSpan title={t.title} callback={onChangeTitleHandler}/>

        </div>
    })

    //Funcitons
    const onClickRemoveTodolist = () => props.deleteTodolist(todolistID);
    const filterChangeFunction = (filter: filterValuesType) => props.changeFilter(todolistID, filter);
    const onChangeTitleTodolistHandler = (inputValue: string) => {
        props.changeTitleTodolist(todolistID, inputValue);
    }
    const callBackAddItem = (title: string) => {
        props.addTask(todolistID, title);
    }

    const filterAll = () => filterChangeFunction('all');
    const filterActive = () => filterChangeFunction('active');
    const filterCompleted = () => filterChangeFunction('completed');

    //Styles
    const styleAll = filter === 'all' ? 'contained' : 'text';
    const styleActive = filter === 'active' ? 'contained' : 'text';
    const styleCompleted = filter === 'completed' ? 'contained' : 'text';

    return (
        <div>
            <h3 className={s.title}>
                <EditableSpan title={props.title} callback={onChangeTitleTodolistHandler}/>
                <IconButton onClick={onClickRemoveTodolist}>
                    <DeleteForever color={'error'}/>
                </IconButton>
            </h3>
            <AddItemForm callback={callBackAddItem}/>
            <div className={s.tasksWrapper}>{taskList}</div>
            <div>
                <Button title={'All'}
                        className={s.filterBtn}
                        color={"success"}
                        variant={styleAll}
                        onClick={filterAll}>All
                </Button>

                <Button title={'Active'}
                        className={s.filterBtn}
                        color={"success"}
                        variant={styleActive}
                        onClick={filterActive}>Active
                </Button>

                <Button title={'Completed'}
                        className={s.filterBtn}
                        color={"success"}
                        variant={styleCompleted}
                        onClick={filterCompleted}>Completed
                </Button>
            </div>
        </div>
    );
}
