import {combineReducers, createStore} from "redux";
import {taskReducer} from "../state/task_reducer";
import {todolistReducer} from "../state/todolist_reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// store.subscribe(() => {
//     console.log('TASKS', store.getState().tasks);
//     console.log('TODOLISTS', store.getState().todolists);
// });

//@ts-ignore
window.store = store;