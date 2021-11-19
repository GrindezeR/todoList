import {v1} from "uuid";
import {TodolistAPIType} from "../API/todolist-api";

export type FiltersValueType = 'all' | 'active' | 'completed'

export type InitialTodolistStateType = TodolistAPIType & {
    filter: FiltersValueType
}

const initialState: InitialTodolistStateType[] = [
    {id: "todolistId1", title: 'What to buy', order: 1, filter: 'all', addedDate: ''},
    {id: "todolistId2", title: 'What to Play', order: 0, filter: 'all', addedDate: ''},
]

export const todolistReducer = (state = initialState, action: ActionsType): InitialTodolistStateType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}]
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