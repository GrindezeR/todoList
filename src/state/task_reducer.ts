import {TaskType} from "../App";
import {addTodolistActionType, deleteTodolistActionType} from "./todolist_reducer";
import {v1} from "uuid";

export type InitialTaskStateType = {
    [key: string]: TaskType[]
}

const initialState: InitialTaskStateType = {}

export const taskReducer = (state = initialState, action: ActionsType): InitialTaskStateType => {
    switch (action.type) {
        case "DELETE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: !t.isDone
                } : t)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    {id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]
                ]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "DELETE-TODOLIST":
            let copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        case "TASKS-LOCALSTORAGE":
            return action.tasks;
        default:
            return state;
    }
}

type ActionsType = deleteTaskActionType | changeTaskStatusActionType | addTodolistActionType
    | addTaskActionType | deleteTodolistActionType | changeTaskTitleActionType
    | setTasksFromLocalStorageActionType

type deleteTaskActionType = ReturnType<typeof deleteTaskAC>;
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type addTaskActionType = ReturnType<typeof addTaskAC>;
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
type setTasksFromLocalStorageActionType = ReturnType<typeof setTasksFromLocalStorageAC>;

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'DELETE-TASK', todolistId, taskId} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId} as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}

export const setTasksFromLocalStorageAC = (tasks: InitialTaskStateType) => {
    return {type: 'TASKS-LOCALSTORAGE', tasks} as const
}