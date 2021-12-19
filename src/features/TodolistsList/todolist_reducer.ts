import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {getTasksTC} from "./task_reducer";
import {AppThunk} from "../../state/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodolistDomainType[] = [
    // {id: "todolistId1", title: 'What to buy', order: 1, filter: 'all', addedDate: ''},
    // {id: "todolistId2", title: 'What to Play', order: 0, filter: 'all', addedDate: ''},
]
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, filter: FiltersValueType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].filter = action.payload.filter;
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        deleteTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].title = action.payload.title;
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].entityStatus = action.payload.entityStatus;
        },
        clearTodolistListDataAC(state, action: PayloadAction) {
            return []
        },
    }
});
export const {
    changeTodolistFilterAC,
    addTodolistAC,
    deleteTodolistAC,
    changeTodolistTitleAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC,
    clearTodolistListDataAC
} = slice.actions

export const todolistReducer = slice.reducer;

//Thunks
export const getTodolistsTC = (): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        todolistAPI.getTodolists()
            .then(res => {
                    dispatch(setTodolistsAC({todolists: res.data}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                    return res.data;
                }
            )
            .then(res => {
                res.forEach(tl => dispatch(getTasksTC(tl.id)))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        todolistAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: {...res.data.data.item}}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
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
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'}));
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTodolistAC({todolistId}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'loading'}));
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({todolistId, title}));
                    dispatch(changeTodolistEntityStatusAC({todolistId, entityStatus: 'succeeded'}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
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
export type TodolistActionsType = AddTodolistActionType
    | DeleteTodolistActionType
    | SetTodolistsActionType
    | ClearTodolistListDataActionType

export type ClearTodolistListDataActionType = ReturnType<typeof clearTodolistListDataAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
