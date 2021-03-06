import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    FiltersValueType,
    setTodolistsAC,
    TodolistDomainType,
    todolistReducer
} from '../features/TodolistsList/todolist_reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../app/app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: TodolistDomainType[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 1, addedDate: '', entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", order: 1, filter: 'all', addedDate: '', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, deleteTodolistAC({todolistId: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolistTitle = "New Todolist";
    const newTodolist = {id: "todolistId3", title: newTodolistTitle, order: 1, addedDate: ''}
    const endState = todolistReducer(startState, addTodolistAC({todolist: newTodolist}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";
    const action = changeTodolistTitleAC({todolistId: todolistId2, title: newTodolistTitle});
    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FiltersValueType = "completed";
    const action = changeTodolistFilterAC({todolistId: todolistId2, filter: newFilter});
    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {
    const action = setTodolistsAC({todolists: startState});
    const endState = todolistReducer([], action);

    expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";
    const action = changeTodolistEntityStatusAC({todolistId: todolistId2, entityStatus: newStatus});
    const endState = todolistReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});



