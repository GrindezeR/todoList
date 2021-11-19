import {addTaskAC, changeTaskStatusAC, deleteTaskAC, InitialTaskStateType, taskReducer} from "../state/task_reducer";
import {addTodolistAC, deleteTodolistAC} from "../state/todolist_reducer";
import {TaskAPIStatuses} from "../API/todolist-api";

let startState: InitialTaskStateType

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
    const action = addTaskAC("todolistId2", "juce");
    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskAPIStatuses.New);
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("todolistId2", "2", TaskAPIStatuses.New);
    const endState = taskReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskAPIStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskAPIStatuses.Completed);
});
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC("new todolist");
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

