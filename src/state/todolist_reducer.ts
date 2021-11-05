import {FiltersValueType} from "../App";
import {v1} from "uuid";

export type InitialTodolistStateType = {
    id: string
    title: string
    filter: FiltersValueType
}

const initialState: InitialTodolistStateType[] = []

export const todolistReducer = (state = initialState, action: ActionsType): InitialTodolistStateType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
        case "TODOLIST-LOCALSTORAGE":
            return action.todolist.map(tl => ({...tl, filter: 'all'}));
        default:
            return state;
    }
}

type ActionsType = filterTodolistActionType | addTodolistActionType | deleteTodolistActionType
    | changeTodolistTitleActionType | setTodolistFromLocalStorageActionType

type filterTodolistActionType = ReturnType<typeof changeTodolistFilterAC>;
export type addTodolistActionType = ReturnType<typeof addTodolistAC>;
export type deleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type setTodolistFromLocalStorageActionType = ReturnType<typeof setTodolistFromLocalStorageAC>;

export const changeTodolistFilterAC = (todolistId: string, filter: FiltersValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
export const deleteTodolistAC = (todolistId: string) => {
    return {type: 'DELETE-TODOLIST', todolistId} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}

export const setTodolistFromLocalStorageAC = (todolist: InitialTodolistStateType[]) => {
    return {type: 'TODOLIST-LOCALSTORAGE', todolist} as const
}