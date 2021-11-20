import {
    addTaskAC,
    deleteTaskAC,
    TaskDomainStateType,
    setTasksAC,
    taskReducer, updateTaskAC
} from "../state/task_reducer";
import {addTodolistAC, deleteTodolistAC} from "../state/todolist_reducer";
import {TaskAPIStatuses} from "../API/todolist-api";
import {v1} from "uuid";

let startState: TaskDomainStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1'
            },
            {
                id: "2",
                title: "JS",
                status: TaskAPIStatuses.Completed,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1'
            },
            {
                id: "3",
                title: "React",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1'
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId2'
            },
            {
                id: "2",
                title: "milk",
                status: TaskAPIStatuses.Completed,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId2'
            },
            {
                id: "3",
                title: "tea",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId2'
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = deleteTaskAC("todolistId2", "2");
    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1'
            },
            {
                id: "2",
                title: "JS",
                status: TaskAPIStatuses.Completed,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1'
            },
            {
                id: "3",
                title: "React",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1'
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId2'
            },
            {
                id: "3",
                title: "tea",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId2'
            }
        ]
    });

});
test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        id: '123', title: 'juce', status: TaskAPIStatuses.New,
        order: 0, todoListId: 'todolistId2', startDate: '', addedDate: '',
        deadline: '', description: '', priority: 0
    });
    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskAPIStatuses.New);
})
test('status of specified task should be changed', () => {
    const action = updateTaskAC("todolistId2", "2", {status: TaskAPIStatuses.New});
    const endState = taskReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskAPIStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskAPIStatuses.Completed);
});
test('new array should be added when new todolist is added', () => {
    const newTodolist = {id: "todolistId3", title: 'new todolist', order: 1, addedDate: ''}
    const action = addTodolistAC(newTodolist);
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
    const action = deleteTodolistAC("todolistId2");
    const endState = taskReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('set tasks, tasks should not be empty array', () => {
    startState['todolistId1'] = [];
    const action = setTasksAC('todolistId1', [
        {
            id: v1(),
            title: 'One',
            status: TaskAPIStatuses.New,
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            description: '',
            priority: 2,
            todoListId: 'todolistId1',
        },
        {
            id: v1(),
            title: 'Two',
            status: TaskAPIStatuses.Completed,
            order: 0,
            addedDate: '',
            deadline: '',
            startDate: '',
            description: '',
            priority: 2,
            todoListId: 'todolistId1',
        }
    ]);
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId1'][1].title).toBe('Two');
    expect(endState['todolistId2']).toStrictEqual(startState['todolistId2']);
})

