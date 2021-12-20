import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    status: 'idle' as RequestStatusType,
    error: '' as string | null,
    isInitialized: false,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction) {
            state.isInitialized = true
        },
    }
})
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions
export const appReducer = slice.reducer;

// Thunks
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const response = await authAPI.me();
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
            console.warn('Not Authorized');
        }
        dispatch(setIsInitializedAC());
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch);
        }
    }
}

// Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionTypes = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsInitializedAC>