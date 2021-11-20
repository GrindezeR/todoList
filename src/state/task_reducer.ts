import {addTodolistActionType, deleteTodolistActionType, setTodolistsActionType} from "./todolist_reducer";
import {TaskAPIPriorities, TaskAPIStatuses, TaskAPIType, todolistAPI} from "../API/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";

export type TaskDomainStateType = {
    [key: string]: TaskAPIType[]
}

const initialState: TaskDomainStateType = {
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

export const taskReducer = (state = initialState, action: ActionsType): TaskDomainStateType => {
    switch (action.type) {
        case "DELETE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [
                    action.task,
                    ...state[action.task.todoListId]
                ]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId]
                        .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
            }
        case "SET-TASKS": {
            const copyState = {...state};
            copyState[action.todolistId] = action.tasks;
            return copyState;
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

type ActionsType = deleteTaskActionType | addTodolistActionType | addTaskActionType
    | deleteTodolistActionType | setTodolistsActionType | setTasksActionType | updateTaskActionType

type deleteTaskActionType = ReturnType<typeof deleteTaskAC>;
type addTaskActionType = ReturnType<typeof addTaskAC>;
type setTasksActionType = ReturnType<typeof setTasksAC>;
type updateTaskActionType = ReturnType<typeof updateTaskAC>;

type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TaskAPIStatuses
    priority?: TaskAPIPriorities
    startDate?: string
    deadline?: string
}


//Action Creators
export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'DELETE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (task: TaskAPIType) => {
    return {type: 'ADD-TASK', task} as const
}
export const setTasksAC = (todolistId: string, tasks: TaskAPIType[]) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, domainModel} as const
}

//Thunks
export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(todolistId, res.data.items))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(deleteTaskAC(todolistId, taskId));
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                let result = res.data.data.item

                dispatch(addTaskAC({...result, todoListId: todolistId, title: title}));
            })
    }
}


export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskDomainModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        let task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                ...domainModel
            })
                .then(res => {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel));
                })
        }
    }
}