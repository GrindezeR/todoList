import axios, {AxiosResponse} from "axios";

//Types
export type ResponseAPIType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}
export type TodolistAPIType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskAPIType = {
    description: string
    title: string
    status: TaskAPIStatuses
    priority: TaskAPIPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTasksAPIResponseType = {
    items: TaskAPIType[]
    totalCount: number
    error: string
}
export type CreateTaskAPIResponseType = {
    resultCode: 0 | 1
    messages: string[]
    data: {
        item: TaskAPIType
    }
}
export type UpdateTaskModelAPIType = {
    title: string
    description: string
    completed: boolean
    status: TaskAPIStatuses
    priority: TaskAPIPriorities
    startDate: string //2023-03-19T07:22Z
    deadline: string //2023-03-19T07:22Z
}
export enum TaskAPIStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskAPIPriorities {
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
    getTodolists() {
        return instance.get<TodolistAPIType[]>(`todo-lists`)
    },

    createTodolist(title: string) {
        return instance.post<ResponseAPIType<{ item: TodolistAPIType }>, AxiosResponse<ResponseAPIType<{ item: TodolistAPIType }>>, { title: string }>
        ('todo-lists', {title: title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseAPIType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, newTitle: string) {
        return instance.put<ResponseAPIType, AxiosResponse<ResponseAPIType>, { title: string }>
        (`todo-lists/${todolistId}`, {title: newTitle})
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksAPIResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateTaskAPIResponseType, AxiosResponse<CreateTaskAPIResponseType>, { title: string }>
        (`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseAPIType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, task: UpdateTaskModelAPIType) {
        return instance.put<UpdateTaskModelAPIType, AxiosResponse<ResponseAPIType<{ item: TaskAPIType }>>>
        (`/todo-lists/${todolistId}/tasks/${taskId}`, task)
    }
}