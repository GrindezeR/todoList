import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, createStore} from "redux";
import {todolistReducer} from "../state/todolist_reducer";
import {taskReducer} from "../state/task_reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false}
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