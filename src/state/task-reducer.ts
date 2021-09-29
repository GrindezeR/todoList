import {ObjTasksType, taskType} from "../App";
import {v1} from "uuid";

export const taskReducer = (state: ObjTasksType, action: actionsTypes): ObjTasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]: [{id: v1(), title: action.title, isDone: false},
                    ...state[action.todolistID]]
            };
        case "CHANGE-STATUS-TASK":
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, isDone: action.status} : t)]
            };
        case "CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)]
            };
        case "ADD-TASK-LIST":
            return {...state, [action.id]: []};
        case "RETURN-NEW-STATE-TASK":
            return {...action.state};
        default:
            return state;
    }
}

type actionsTypes = removeTaskACType
    | addTaskACType
    | changeStatusTaskACType
    | changeTitleTaskACType
    | returnNewStateTasktACType
    | addTaskListACType

type removeTaskACType = ReturnType<typeof removeTaskAC>;
type addTaskACType = ReturnType<typeof addTaskAC>;
type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>;
type changeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>;
type returnNewStateTasktACType = ReturnType<typeof returnNewStateTasktAC>;
type addTaskListACType = ReturnType<typeof addTaskListAC>;

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todolistID, taskID} as const
}

export const addTaskAC = (todolistID: string, title: string) => {
    return {type: 'ADD-TASK', todolistID, title} as const
}

export const changeStatusTaskAC = (todolistID: string, taskID: string, status: boolean) => {
    return {type: 'CHANGE-STATUS-TASK', todolistID, taskID, status} as const
}

export const changeTitleTaskAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {type: 'CHANGE-TITLE-TASK', todolistID, taskID, newTitle} as const
}

export const returnNewStateTasktAC = (state: ObjTasksType) => {
    return {type: 'RETURN-NEW-STATE-TASK', state} as const
}

export const addTaskListAC = (id: string) => {
    return {type: 'ADD-TASK-LIST', id} as const
}