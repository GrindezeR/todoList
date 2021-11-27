import {
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    DeleteTodolistActionType,
    SetTodolistsActionType
} from "./todolist_reducer";
import {TasksPriorities, TasksStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TaskDomainType = {
    // ["todolistId1"]: [
    //     {id: v1(), title: "React", status: TaskAPIStatuses.Completed, order: 0,
    //         addedDate: '', deadline: '', startDate: '', description: '',
    //         priority: 4, todoListId: 'todolistId1',},
    //     {id: v1(), title: "JavaScript", status: TaskAPIStatuses.New, order: 0,
    //         addedDate: '', deadline: '', startDate: '', description: '',
    //         priority: 2, todoListId: 'todolistId1',},
    // ],
    // ["todolistId2"]: [
    //     {id: v1(), title: "Milk", status: TaskAPIStatuses.Completed, order: 0,
    //         addedDate: '', deadline: '', startDate: '', description: '',
    //         priority: 4, todoListId: 'todolistId2',},
    //     {id: v1(), title: "React Book", status: TaskAPIStatuses.New, order: 0,
    //         addedDate: '', deadline: '', startDate: '', description: '',
    //         priority: 2, todoListId: 'todolistId2',},
    // ],
}

export const taskReducer =
    (state = initialState, action: ActionsType): TaskDomainType => {
        switch (action.type) {
            case "DELETE-TASK":
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
                }
            case "ADD-TASK":
                return {
                    ...state,
                    [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
                }
            case "UPDATE-TASK":
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId]
                        .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
                }
            case "SET-TASKS":
                return {...state, [action.todolistId]: action.tasks}
            case "CHANGE-TASK-ENTITY-STATUS":
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                        ...t,
                        entityStatus: action.entityStatus
                    } : t)
                }
            case "ADD-TODOLIST":
                return {[action.todolist.id]: [], ...state}
            case "DELETE-TODOLIST": {
                let copyState = {...state};
                delete copyState[action.todolistId];
                return copyState;
            }
            case "SET-TODOLISTS": {
                let copyState = {...state};
                action.todolists.forEach(tl => {
                    copyState[tl.id] = [];
                })
                return copyState;
            }
            default:
                return state;
        }
    }

//Action Creators
export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'DELETE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, domainModel} as const
}
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, taskId, entityStatus} as const
}

//Thunks
export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(todolistId, res.data.items));
                dispatch(setAppStatusAC('succeeded'));
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'));
        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTaskAC(todolistId, taskId));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
            .finally(() => {
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'));
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({
                        ...res.data.data.item,
                        todoListId: todolistId,
                        title: title
                    }));
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
export const updateTaskTC =
    (todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType) => {
        return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
            let task = getState().tasks[todolistId].find(t => t.id === taskId)

            if (task) {
                dispatch(setAppStatusAC('loading'));
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'));
                todolistAPI.updateTask(todolistId, taskId, {
                    title: task.title,
                    status: task.status,
                    deadline: task.deadline,
                    description: task.description,
                    priority: task.priority,
                    startDate: task.startDate,
                    ...domainModel
                })
                    .then((res) => {
                        if (res.data.resultCode === 0) {
                            dispatch(updateTaskAC(todolistId, taskId, domainModel));
                            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'succeeded'));
                            dispatch(setAppStatusAC('succeeded'));
                        } else {
                            handleServerAppError(res.data, dispatch);
                        }
                    })
                    .catch((err: AxiosError) => {
                        handleServerNetworkError(err.message, dispatch);
                    })
                    .finally(() => {
                        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'));
                    })
            }
        }
    }

//Types
type ActionsType = ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | DeleteTodolistActionType
    | SetTodolistsActionType
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof changeTaskEntityStatusAC>

type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TasksStatuses
    priority?: TasksPriorities
    startDate?: string
    deadline?: string
}
export type TaskDomainType = {
    [key: string]: TaskType[],
}