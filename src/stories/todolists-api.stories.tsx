import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../API/todolist-api";

export default {
    title: 'API'
}

//Todolists
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => setState(res.data));
    }, []);

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('Todolist NEW')
            .then((res) => {
                setState(res.data);
            });

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist('9f59529a-538e-4d45-afda-194dfc332b6c')
            .then(res => setState(res.data));
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist('908253fc-e0b7-476c-b2cb-10d29e64309c', 'NEW TITLE')
            .then(res => setState(res.data));
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

//Tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTasks('5aa01351-47d8-4124-8cad-6c164bf2e5e1')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTask('5aa01351-47d8-4124-8cad-6c164bf2e5e1', 'newTASK')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTask('5aa01351-47d8-4124-8cad-6c164bf2e5e1', '257dba32-193a-4732-ab2f-988602412dbe')
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTask('5aa01351-47d8-4124-8cad-6c164bf2e5e1', 'fdaa3d32-4292-4696-8741-b5495bc4a079', {
            completed: true,
            title: 'IT-KAMASUTRA',
            deadline: '2023-03-19T07:22Z',
            description: 'my task Postman',
            priority: 0,
            startDate: '2022-03-19T07:22Z',
            status: 0
        })
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}