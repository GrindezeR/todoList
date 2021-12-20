import {TasksPriorities, TasksStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../state/store";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {addTodolistAC, clearTodolistListDataAC, deleteTodolistAC, setTodolistsAC} from "./todolist_reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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
const slice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        deleteTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1);
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks;
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType }>) {
            const task = state[action.payload.todolistId];
            const index = task.findIndex(t => t.id === action.payload.taskId);
            if (index !== -1) {
                task[index] = {...task[index], ...action.payload.domainModel};
            }
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index !== -1) {
                state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = [];
            })
        });
        builder.addCase(clearTodolistListDataAC, (state, action) => {
            return {}
        });
    }
})
export const {deleteTaskAC, addTaskAC, setTasksAC, updateTaskAC, changeTaskEntityStatusAC} = slice.actions;
export const taskReducer = slice.reducer;

//Thunks
export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        todolistAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC({todolistId, tasks: res.data.items}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}));
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(deleteTaskAC({todolistId, taskId}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err.message, dispatch);
            })
            .finally(() => {
                dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'idle'}));
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}));
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task: {...res.data.data.item, todoListId: todolistId, title}}));
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
export const updateTaskTC =
    (todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType) => {
        return (dispatch: Dispatch, getState: () => AppRootStateType) => {
            let task = getState().tasks[todolistId].find(t => t.id === taskId)

            if (task) {
                dispatch(setAppStatusAC({status: 'loading'}));
                dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'loading'}));
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
                            dispatch(updateTaskAC({todolistId, taskId, domainModel}));
                            dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'succeeded'}));
                            dispatch(setAppStatusAC({status: 'succeeded'}));
                        } else {
                            handleServerAppError(res.data, dispatch);
                        }
                    })
                    .catch((err: AxiosError) => {
                        handleServerNetworkError(err.message, dispatch);
                    })
                    .finally(() => {
                        dispatch(changeTaskEntityStatusAC({todolistId, taskId, entityStatus: 'idle'}));
                    })
            }
        }
    }

//Types
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