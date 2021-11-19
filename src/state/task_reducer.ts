import {addTodolistActionType, deleteTodolistActionType} from "./todolist_reducer";
import {v1} from "uuid";
import {TaskAPIStatuses, TaskAPIType} from "../API/todolist-api";

export type InitialTaskStateType = {
    [key: string]: TaskAPIType[]
}

const initialState: InitialTaskStateType = {
    ["todolistId1"]: [
        {
            id: v1(),
            title: "HTML&CSS",
            status: TaskAPIStatuses.New,
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            description: 'hehe',
            priority: 1,
            todoListId: 'todolistId1',
        },
        {
            id: v1(),
            title: "JS",
            status: TaskAPIStatuses.New,
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            description: 'hehee',
            priority: 1,
            todoListId: 'todolistId1',
        },
    ],
    ["todolistId2"]: [
        {
            id: v1(),
            title: "Milk",
            status: TaskAPIStatuses.Completed,
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            description: 'hewhe',
            priority: 4,
            todoListId: 'todolistId1',
        },
        {
            id: v1(),
            title: "React Book",
            status: TaskAPIStatuses.New,
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            description: 'heshe',
            priority: 2,
            todoListId: 'todolistId1',
        },
    ]
}

export const taskReducer = (state = initialState, action: ActionsType): InitialTaskStateType => {
    switch (action.type) {
        case "DELETE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: t.status === TaskAPIStatuses.New ? t.status = TaskAPIStatuses.Completed : TaskAPIStatuses.New
                } : t)
            }
        // return {
        //     ...state,
        //     [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
        //         ...t,
        //         isDone: !t.isDone
        //     } : t)
        // }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    {
                        id: v1(),
                        title: action.title,
                        status:TaskAPIStatuses.New,
                        order:0,
                        addedDate: '',
                        deadline: '',
                        startDate: '',
                        description: '',
                        priority: 2,
                        todoListId: v1(),
                    }, ...state[action.todolistId]
                ]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "DELETE-TODOLIST":
            let copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        case "TASKS-LOCALSTORAGE":
            return action.tasks;
        default:
            return state;
    }
}

type ActionsType = deleteTaskActionType | changeTaskStatusActionType | addTodolistActionType
    | addTaskActionType | deleteTodolistActionType | changeTaskTitleActionType
    | setTasksFromLocalStorageActionType

type deleteTaskActionType = ReturnType<typeof deleteTaskAC>;
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type addTaskActionType = ReturnType<typeof addTaskAC>;
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
type setTasksFromLocalStorageActionType = ReturnType<typeof setTasksFromLocalStorageAC>;

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'DELETE-TASK', todolistId, taskId} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskAPIStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status} as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}

export const setTasksFromLocalStorageAC = (tasks: InitialTaskStateType) => {
    return {type: 'TASKS-LOCALSTORAGE', tasks} as const
}