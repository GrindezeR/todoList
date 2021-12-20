import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "../features/TodolistsList/todolist_reducer";
import {taskReducer} from "../features/TodolistsList/task_reducer";
import {v1} from "uuid";
import {TasksStatuses} from "../api/todolist-api";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/auth-reducer";
import {HashRouter} from "react-router-dom";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {
            id: 'todolistId1', title: 'What to buy', order: 1,
            filter: 'all', addedDate: '', entityStatus: 'idle'
        },
        {
            id: 'todolistId2', title: 'What to Play', order: 0,
            filter: 'all', addedDate: '', entityStatus: 'loading'
        },
    ],
    tasks: {
        "todolistId1": [
            {
                id: v1(), title: "React Book", status: TasksStatuses.Completed, order: 0, addedDate: '',
                deadline: '', startDate: '', description: '', priority: 2, todoListId: 'todolistId1',
                entityStatus: 'idle'
            },
            {
                id: v1(), title: "Book", status: TasksStatuses.New, order: 0, addedDate: '',
                deadline: '', startDate: '', description: '', priority: 2, todoListId: 'todolistId1',
                entityStatus: 'idle'
            }
        ],
        "todolistId2": [
            {
                id: v1(), title: "Milk", status: TasksStatuses.Completed,
                order: 0, addedDate: '', deadline: '', startDate: '', description: '',
                priority: 2, todoListId: 'todolistId2', entityStatus: 'idle'
            },
            {
                id: v1(), title: "Eat", status: TasksStatuses.New, order: 0, addedDate: '', deadline: '',
                startDate: '', description: '', priority: 2, todoListId: 'todolistId2',
                entityStatus: 'idle'
            }
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

//Создаем HOC, storyFn это компонента которую будет принимать наш HOC
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <HashRouter>
            <Provider store={storyBookStore}>
                {storyFn()}
            </Provider>
        </HashRouter>
    );
}