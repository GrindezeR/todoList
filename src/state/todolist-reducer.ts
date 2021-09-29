import {filterValuesType, todolistsType} from "../App";

export const todolistReducer = (state: todolistsType[], action: actionTypes): todolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state].filter(tl => tl.id !== action.todolistID);
        case 'ADD-TODOLIST':
            return [...state, {id: action.id, title: action.title, filter: "all"}];
        case "CHANGE-TITLE-TODOLIST":
            return [...state].map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case "CHANGE-FILTER-TODOLIST":
            return [...state].map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case "RETURN-NEW-STATE-TODOLIST":
            return [...action.state];
        default:
            return state;
    }
}

type actionTypes = deleteTodolistACType
    | addTodolistACType
    | changeTodolistACType
    | changeFilterTodolistACType
    | returnNewStateACType

type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>;
type addTodolistACType = ReturnType<typeof addTodolistAC>;
type changeTodolistACType = ReturnType<typeof changeTitleTodolistAC>;
type changeFilterTodolistACType = ReturnType<typeof changeFilterTodolistAC>;
type returnNewStateACType = ReturnType<typeof returnNewStateTodolistAC>;

export const deleteTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', todolistID} as const
}

export const addTodolistAC = (title: string, id: string) => {
    return {type: 'ADD-TODOLIST', title, id} as const
}

export const changeTitleTodolistAC = (title: string, id: string) => {
    return {type: 'CHANGE-TITLE-TODOLIST', title, id} as const
}

export const changeFilterTodolistAC = (filter: filterValuesType, id: string) => {
    return {type: 'CHANGE-FILTER-TODOLIST', filter, id} as const
}

export const returnNewStateTodolistAC = (state: todolistsType[]) => {
    return {type: 'RETURN-NEW-STATE-TODOLIST', state} as const
}

