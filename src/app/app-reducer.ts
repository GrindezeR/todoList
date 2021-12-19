import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: '' as string | null,
    isInitialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/IS-INITIALIZED":
            return {...state, isInitialized: true}
        default:
            return state
    }
}


// Action Creators
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const setIsInitializedAC = () => ({type: 'APP/IS-INITIALIZED'} as const);

// Thunks
export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true));
                } else {
                    // handleServerAppError(res.data, dispatch); //Появляется даже кода не залогинен на странице логина
                }
                dispatch(setIsInitializedAC());
            })
            .catch((err: AxiosError) => handleServerNetworkError(err.message, dispatch));
    }
}

// Types
export type AppActionsType = SetAppStatusActionType
    | SetAppErrorActionType | ReturnType<typeof setIsInitializedAC>

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;