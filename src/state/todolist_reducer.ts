import {todolistAPI, TodolistAPIType} from "../API/todolist-api";
import {Dispatch} from "redux";

export type FiltersValueType = 'all' | 'active' | 'completed'

export type InitialTodolistStateType = TodolistAPIType & {
    filter: FiltersValueType
}

const initialState: InitialTodolistStateType[] = [
    // {id: "todolistId1", title: 'What to buy', order: 1, filter: 'all', addedDate: ''},
    // {id: "todolistId2", title: 'What to Play', order: 0, filter: 'all', addedDate: ''},
]

export const todolistReducer = (state = initialState, action: ActionsType): InitialTodolistStateType[] => {
    switch (action.type) {
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all"}, ...state]
        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        default:
            return state;
    }
}

type ActionsType = filterTodolistActionType | addTodolistActionType | deleteTodolistActionType
    | changeTodolistTitleActionType | setTodolistsActionType

export type filterTodolistActionType = ReturnType<typeof changeTodolistFilterAC>;
export type addTodolistActionType = ReturnType<typeof addTodolistAC>;
export type deleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>;

//Action Creators
export const changeTodolistFilterAC = (todolistId: string, filter: FiltersValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}
export const addTodolistAC = (todolist: TodolistAPIType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const deleteTodolistAC = (todolistId: string) => {
    return {type: 'DELETE-TODOLIST', todolistId} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}
export const setTodolistsAC = (todolists: TodolistAPIType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

//Thunks
export const getTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC({...res.data.data.item, title: title}));
            })
    }
}

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(deleteTodolistAC(todolistId));
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, title))
            })
    }
}
