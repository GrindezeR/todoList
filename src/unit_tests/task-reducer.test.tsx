import {
    addTaskAC,
    deleteTaskAC,
    TaskDomainType,
    setTasksAC,
    taskReducer, updateTaskAC, changeTaskEntityStatusAC
} from "../features/TodolistsList/task_reducer";
import {addTodolistAC, deleteTodolistAC} from "../features/TodolistsList/todolist_reducer";
import {TasksPriorities, TasksStatuses} from "../api/todolist-api";
import {v1} from "uuid";
import {RequestStatusType} from "../app/app-reducer";

let startState: TaskDomainType

beforeEach(() => {
    startState = {
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
                entityStatus: "idle",
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
                entityStatus: "idle",
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
                entityStatus: "idle",
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
                todoListId: 'todolistId2',
                entityStatus: "idle",
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
                todoListId: 'todolistId2',
                entityStatus: "idle",
            },
            {
                id: "3",
                title: "tea",
                status: TasksStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId2',
                entityStatus: "idle",
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = deleteTaskAC({todolistId: "todolistId2", taskId: "2"});
    const endState = taskReducer(startState, action);

    expect(endState).toEqual({
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
                entityStatus: "idle",
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
                entityStatus: "idle",
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
                entityStatus: "idle",
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
                todoListId: 'todolistId2',
                entityStatus: "idle",
            },
            {
                id: "3",
                title: "tea",
                status: TasksStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId2',
                entityStatus: "idle",
            }
        ]
    });

});
test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        task: {
            id: '123', title: 'juice', status: TasksStatuses.New, entityStatus: "idle",
            order: 0, todoListId: 'todolistId2', startDate: '', addedDate: '',
            deadline: '', description: '', priority: 0
        }
    });
    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(TasksStatuses.New);
})
test('status of specified task should be changed', () => {
    const action = updateTaskAC({todolistId: "todolistId2", taskId: "2", domainModel: {status: TasksStatuses.New}});
    const endState = taskReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TasksStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TasksStatuses.Completed);
});
test('new array should be added when new todolist is added', () => {
    const newTodolist = {id: "todolistId3", title: 'new todolist', order: 1, addedDate: ''}
    const action = addTodolistAC({todolist: newTodolist});
    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {
    const action = deleteTodolistAC({todolistId: "todolistId2"});
    const endState = taskReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('set tasks, tasks should not be empty array', () => {
    startState['todolistId1'] = [];
    const action = setTasksAC({
        todolistId: 'todolistId1', tasks: [
            {
                id: v1(),
                title: 'One',
                status: TasksStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1',
                entityStatus: "idle",
            },
            {
                id: v1(),
                title: 'Two',
                status: TasksStatuses.Completed,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1',
                entityStatus: "idle",
            }
        ]
    });
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId1'][1].title).toBe('Two');
    expect(endState['todolistId2']).toStrictEqual(startState['todolistId2']);
});

test('entity status of task should be changed', () => {
    const action = changeTaskEntityStatusAC({todolistId: 'todolistId2', taskId: '1', entityStatus: 'loading'});
    const endState = taskReducer(startState, action);

    expect(endState["todolistId2"][0].entityStatus).toBe('loading');
    expect(endState["todolistId1"][0].entityStatus).toBe('idle');
});

