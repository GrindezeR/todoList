import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: data.messages[0] ?? 'Unknown error'}));
    dispatch(setAppStatusAC({status: 'failed'}));
}

export const handleServerNetworkError = (message: string, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: message}));
    dispatch(setAppStatusAC({status: 'failed'}));
}