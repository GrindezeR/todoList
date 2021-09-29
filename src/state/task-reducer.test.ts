import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, taskReducer} from "./task-reducer";
import {v1} from "uuid";

test('Tasks remove test', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const taskID = v1();

    const startState = {
        [todolistID1]: [
            {id: taskID, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ]
    }

    const endState = taskReducer(startState, removeTaskAC(todolistID1, taskID));

    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID1][0].title).toBe('JS');
    expect(startState[todolistID1].length).toBe(5);
});

test('Tasks add test', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const taskID = v1();

    const startState = {
        [todolistID1]: [
            {id: taskID, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ]
    }

    const endState = taskReducer(startState, addTaskAC(todolistID1, 'Diablo'));

    expect(endState[todolistID1].length).toBe(6);
    expect(endState[todolistID1][0].title).toBe('Diablo');
    expect(startState[todolistID1].length).toBe(5);
});

test('Tasks change status test', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const taskID = v1();

    const startState = {
        [todolistID1]: [
            {id: taskID, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ]
    }

    const endState = taskReducer(startState, changeStatusTaskAC(todolistID1, taskID, false));

    expect(endState[todolistID1][0].isDone).toBe(false);
    expect(startState[todolistID1][0].isDone).toBe(true);
});

test('Tasks change title test', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const taskID = v1();

    const startState = {
        [todolistID1]: [
            {id: taskID, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ]
    }

    const endState = taskReducer(startState, changeTitleTaskAC(todolistID1, taskID, 'WORK!'));

    expect(endState[todolistID1][0].title).toBe('WORK!');
    expect(startState[todolistID1][0].title).toBe("HTML&CSS");

    console.log('---endState---',endState);
    console.log('---startState---',startState);
});