import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../store/store";
import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../state/todolist_reducer";
import {taskReducer} from "../state/task_reducer";
import {v1} from "uuid";
import {TaskAPIStatuses} from "../API/todolist-api";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to buy', order: 1, filter: 'all', addedDate: ''},
        {id: 'todolistId2', title: 'What to Play', order: 0, filter: 'all', addedDate: ''},
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "React Book",
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
                title: "Book",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId1',
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: 'heshe',
                priority: 2,
                todoListId: 'todolistId2',
            },
            {
                id: v1(),
                title: "Eat",
                status: TaskAPIStatuses.New,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                description: '',
                priority: 2,
                todoListId: 'todolistId2',
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

//Создаем HOC, storyFn это компонента которую будет принимать наш HOC
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
}