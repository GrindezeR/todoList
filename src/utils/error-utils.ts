import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>;

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(data.messages[0] ?? 'Unknown error'));
    dispatch(setAppStatusAC('failed'));
}

export const handleServerNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(message));
    dispatch(setAppStatusAC('failed'));
}