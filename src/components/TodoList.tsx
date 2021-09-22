import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from '../App';
import s from './TodoList.module.css';
import {Button} from "./Button";
import {SingleInput} from "./SingleInput";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todolistID: string
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskId:string, newTitle: string) => void
    changeTitleTodolist: (todolistID: string, newTitle: string) => void
}

export function TodoList({tasks, filter, todolistID, ...props}: PropsType) {
    let [inputValue, setInputValue] = useState("");
    let [error, setError] = useState<string | null>(null)

    //Create lists
    const taskList = tasks.map(t => {
        const onClickHandler = () => props.removeTask(todolistID, t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
        }

        const onChangeTitleHandler = (inputValue: string) => {
            props.changeTaskTitle(todolistID, t.id, inputValue);
        }

        return <li key={t.id} className={t.isDone ? s.done : s.list}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <EditableSpan title={t.title} callback={onChangeTitleHandler}/>
            <button onClick={onClickHandler}>x</button>
        </li>
    })

    //Funcitons
    const onClickRemoveTodolist = () => props.deleteTodolist(todolistID);
    const filterChangeFunction = (filter: FilterValuesType) => props.changeFilter(todolistID, filter);

    const addTask = () => {
        if (inputValue.trim() !== "") {
            props.addTask(todolistID, inputValue.trim());
            setInputValue("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeTitleTodolistHandler = (inputValue: string) => {
        props.changeTitleTodolist(todolistID, inputValue);
    }


    //Styles
    const styleAll = filter === 'all' ? s.activeFilter : "";
    const styleActive = filter === 'active' ? s.activeFilter : "";
    const styleCompleted = filter === 'completed' ? s.activeFilter : "";

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={onChangeTitleTodolistHandler}/>
            </h3>
            {/*<h3>{props.title}</h3>*/}
            <Button title={'Delete list'} callback={onClickRemoveTodolist}/>
            <div className={s.inputWrapper}>
                <SingleInput inputValue={inputValue}
                             setInputValue={setInputValue}
                             error={error}
                             setError={setError}
                             callback={addTask}/>
                <Button title={'+'} callback={addTask}/>
            </div>
            <ul>{taskList}</ul>
            <div>
                <Button title={'All'}
                        className={styleAll}
                        callback={() => filterChangeFunction('all')}/>

                <Button title={'Active'}
                        className={styleActive}
                        callback={() => filterChangeFunction('active')}/>

                <Button title={'Completed'}
                        className={styleCompleted}
                        callback={() => filterChangeFunction('completed')}/>
            </div>
        </div>
    );
}
