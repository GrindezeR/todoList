import axios, {AxiosResponse} from "axios";
import {RequestStatusType} from "../app/app-reducer";

//Types
export type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    description: string
    title: string
    status: TasksStatuses
    priority: TasksPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
export type UpdateTasksModelType = {
    title: string
    description: string
    status: TasksStatuses
    priority: TasksPriorities
    startDate: string
    deadline: string
}
export type GetTasksType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export enum TasksStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TasksPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '761e6f2b-b609-440b-9ec5-0bbc9398cba5'
    }
})

export const todolistAPI = {
    //Todolists
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>
        ('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>
        (`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, newTitle: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>
        (`todo-lists/${todolistId}`, {title: newTitle})
    },

    //Tasks
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>
        (`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>
        (`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, task: UpdateTasksModelType) {
        return instance.put<UpdateTasksModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>
        (`/todo-lists/${todolistId}/tasks/${taskId}`, task)
    }
}