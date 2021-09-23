import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import {v1} from 'uuid';
import {Button} from "./components/Button";

export type FilterValuesType = "all" | "active" | "completed";
type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type ObjTasksType = { [key: string]: TaskType[] }

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();
useEffect(() => {setTasks(tasks)}, )
    const [todolist, setTodolist] = useState<todolistsType[]>([
        {id: todolistID1, title: 'What to Learn', filter: 'all'},
        {id: todolistID2, title: 'What to Buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<ObjTasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    });

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
    }
    function addTask(todolistID: string, title: string) {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]});
    }
    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }
    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolist(todolist.map(t => t.id === todolistID ? {...t, filter: value} : t))
    }
    const changeTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }
    const changeTitleTodolist = (todolistID: string, newTitle: string) => {
        setTodolist(todolist.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl))
    }
    const deleteTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(t => t.id !== todolistID))
    }
    const addTodolist = () => {
        const newTodolistTitle = prompt('Todolist Name');
        if (newTodolistTitle) {
            const newTodolistID = v1();
            setTasks({...tasks, [newTodolistID]: []})
            setTodolist([...todolist, {id: newTodolistID, title: newTodolistTitle, filter: 'all'}])
        } else {
            alert('Error! Name required!');
        }
    }

    return (
        <div className="App">
            {todolist.map(tl => {
                let tasksForTodolist = tasks[tl.id];
                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                }

                return (
                    <TodoList title={tl.title}
                              key={tl.id}
                              todolistID={tl.id}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              changeTaskTitle={changeTaskTitle}
                              filter={tl.filter}
                              deleteTodolist={deleteTodolist}
                              changeTitleTodolist={changeTitleTodolist}
                    />
                );
            })}

            <Button title={'Add new list'}
                    className={'addButton'}
                    callback={addTodolist}/>
        </div>
    );
}

export default App;