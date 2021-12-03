import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {clearTodolistListDataAC, ClearTodolistListDataActionType} from "../TodolistsList/todolist_reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// Action Creators
export const setIsLoggedInAC = (value: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', value} as const)

// Thunks
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch<AuthActionsType>) => {
        dispatch(setAppStatusAC('loading'));
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err: AxiosError) => handleServerNetworkError(err.message, dispatch));
    }
}

export const logoutTC = () => (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false));
                dispatch(clearTodolistListDataAC());
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// Types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType | ClearTodolistListDataActionType