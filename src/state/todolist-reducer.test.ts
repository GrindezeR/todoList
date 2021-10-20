import {
    addTodolistAC, changeFilterTodolistAC,
    changeTitleTodolistAC,
    deleteTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";
import {todolistsType} from "../App";

test.skip('Remove todolist test', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: todolistsType[] = [
        {id: todolistID1, title: 'What to Learn', filter: 'all'},
        {id: todolistID2, title: 'What to Buy', filter: 'all'}
    ]
    const endState = todolistReducer(startState, deleteTodolistAC(todolistID1));


    expect(startState).toEqual(startState);
    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('What to Buy');

    console.log('---endState---', endState);
    console.log('---startState---', startState);
});
test.skip('Add todolist test', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: todolistsType[] = [
        {id: todolistID1, title: 'What to Learn', filter: 'all'},
        {id: todolistID2, title: 'What to Buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, addTodolistAC('Character List', v1()));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('Character List');
    expect(endState[2].filter).toBe('all');
    expect(startState.length).toBe(2);

    console.log('---endState---', endState);
    console.log('---startState---', startState);
});
test.skip('Change Todolist Title', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: todolistsType[] = [
        {id: todolistID1, title: 'What to Learn', filter: 'all'},
        {id: todolistID2, title: 'What to Buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, changeTitleTodolistAC('What to play', todolistID2));

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe('What to play');
    expect(startState.length).toBe(2);
    expect(startState[1].title).toBe('What to Buy');

    console.log('---endState---', endState);
    console.log('---startState---', startState);
});
test('Change Todolist Filter', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: todolistsType[] = [
        {id: todolistID1, title: 'What to Learn', filter: 'all'},
        {id: todolistID2, title: 'What to Buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, changeFilterTodolistAC('active', todolistID2));

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('active');
    expect(startState.length).toBe(2);
    expect(startState[1].filter).toBe('all');

    console.log('---endState---', endState);
    console.log('---startState---', startState);
});
