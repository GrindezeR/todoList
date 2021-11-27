import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TodolistDomainType[] = [
    // {id: "todolistId1", title: 'What to buy', order: 1, filter: 'all', addedDate: ''},
    // {id: "todolistId2", title: 'What to Play', order: 0, filter: 'all', addedDate: ''},
]

export const todolistReducer =
    (state = initialState, action: ActionsType): TodolistDomainType[] => {
        switch (action.type) {
            case "CHANGE-TODOLIST-FILTER":
                return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
            case "ADD-TODOLIST":
                return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
            case "DELETE-TODOLIST":
                return state.filter(tl => tl.id !== action.todolistId);
            case "CHANGE-TODOLIST-TITLE":
                return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
            case "SET-TODOLISTS":
                return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
            case "CHANGE-TODOLIST-ENTITY-STATUS":
                return state.map(tl => tl.id === action.todolistId ?
                    {...tl, entityStatus: action.entityStatus} : tl)
            default:
                return state;
        }
    }

//Action Creators
export const changeTodolistFilterAC = (todolistId: string, filter: FiltersValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const deleteTodolistAC = (todolistId: string) => {
    return {type: 'DELETE-TODOLIST', todolistId} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const changeTodolistEntityStatusAC =
    (todolistId: string, entityStatus: RequestStatusType) => {
        return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', todolistId, entityStatus} as const
    }
//Thunks
export const getTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.getTodolists()
            .then(res => {
                    dispatch(setTodolistsAC(res.data));
                    dispatch(setAppStatusAC('succeeded'));
                }
            )
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({...res.data.data.item, title: title}));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
    }
}
export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'));
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTodolistAC(todolistId));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
            .finally(() => {
                    dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'));
                }
            )
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'));
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(todolistId, title));
                    dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
    }
}

//Types
export type TodolistDomainType = TodolistType & {
    filter: FiltersValueType,
    entityStatus: RequestStatusType,
}
export type FiltersValueType = 'all' | 'active' | 'completed'
type ActionsType = AddTodolistActionType
    | DeleteTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
