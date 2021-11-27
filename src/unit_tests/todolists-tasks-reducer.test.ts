import {addTodolistAC, deleteTodolistAC, setTodolistsAC, todolistReducer} from "../features/TodolistsList/todolist_reducer";
import {TaskDomainType, taskReducer} from "../features/TodolistsList/task_reducer";
import {TodolistDomainType} from "../features/TodolistsList/todolist_reducer";
import {TasksStatuses} from "../api/todolist-api";


test('ids should be equals', () => {
    const startTasksState: TaskDomainType = {};
    const startTodolistsState: TodolistDomainType[] = [];
    const newTodolist = {id: "todolistId3", title: 'new todolist', order: 1, addedDate: ''}

    const action = addTodolistAC(newTodolist);

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

test('property with todolistId should be deleted', () => {
    const startState: TaskDomainType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TasksStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1',
                entityStatus:'idle',
            },
            {
                id: "2",
                title: "JS",
                status: TasksStatuses.Completed,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1',
                entityStatus:'idle',
            },
            {
                id: "3",
                title: "React",
                status: TasksStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1',
                entityStatus:'idle',
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TasksStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1',
                entityStatus:'idle',
            },
            {
                id: "2",
                title: "milk",
                status: TasksStatuses.Completed,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1',
                entityStatus:'idle',
            },
            {
                id: "3", title: "tea",
                status: TasksStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1',
                entityStatus:'idle',
            }
        ]
    };

    const action = deleteTodolistAC("todolistId2");
    const endState = taskReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty tasks arrays should be created after set todolists', () => {
    const action = setTodolistsAC([
        {id: "1", title: 'What to buy', order: 1, addedDate: ''},
        {id: "2", title: 'What to Play', order: 0, addedDate: ''},
    ]);
    const endState = taskReducer({}, action);
    const keys = Object.keys(endState)

    expect(endState).toEqual({
        "1": [],
        "2": [],
    });
    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
    expect(endState["1"]).toBeDefined();
    expect(endState["2"]).toBeDefined();
})