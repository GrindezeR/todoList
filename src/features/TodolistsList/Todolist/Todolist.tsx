import React, {useCallback, useEffect} from "react";
import s from './Todolist.module.css';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Task} from "./Task/Task";
import {TasksStatuses, TaskType} from "../../../api/todolist-api";
import {FiltersValueType, TodolistDomainType} from "../todolist_reducer";
import {useDispatch} from "react-redux";
import {getTasksTC} from "../task_reducer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {DeleteForever} from "@mui/icons-material";

type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    deleteTodolist: (todolistId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FiltersValueType) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TasksStatuses) => void
    deleteTask: (todolistId: string, taskId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {
    const {
        tasks, todolist,
        deleteTask, changeTaskStatus, addTask, changeTaskTitle,
        changeTodolistFilter, deleteTodolist, changeTodolistTitle,
    } = props

    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(getTasksTC(todolist.id));

    }, [dispatch, todolist.id, demo])

    const disableWhileLoading = todolist.entityStatus === 'loading'

    let filteredTasks = tasks;
    if (todolist.filter === 'active') {
        filteredTasks = tasks.filter(t => t.status === TasksStatuses.New);
    }
    if (todolist.filter === "completed") {
        filteredTasks = tasks.filter(t => t.status === TasksStatuses.Completed);
    }

    const tasksList = filteredTasks.map(t => {
        return (
            <Task key={t.id}
                  task={t}
                  todolistId={todolist.id}
                  changeTaskTitle={changeTaskTitle}
                  changeTaskStatus={changeTaskStatus}
                  deleteTask={deleteTask}/>
        );
    })

    //Callbacks
    const allFilterHandler = useCallback(() => {
        changeTodolistFilter(todolist.id, 'all')
    }, [changeTodolistFilter, todolist.id]);

    const activeFilterHandler = useCallback(() => {
        changeTodolistFilter(todolist.id, 'active')
    }, [changeTodolistFilter, todolist.id]);

    const completeFilterHandler = useCallback(() => {
        changeTodolistFilter(todolist.id, 'completed')
    }, [changeTodolistFilter, todolist.id]);

    const deleteTodolistHandler = useCallback(() => {
        deleteTodolist(todolist.id)
    }, [deleteTodolist, todolist.id]);

    const changeTodolistTitleCallback = useCallback((title: string) => {
        changeTodolistTitle(todolist.id, title)
    }, [changeTodolistTitle, todolist.id]);

    const addTaskCallback = useCallback((title: string) => {
        addTask(todolist.id, title)
    }, [addTask, todolist.id]);


    //Styles
    const allStyle = todolist.filter === 'all' ? 'contained' : 'text';
    const activeStyle = todolist.filter === 'active' ? 'contained' : 'text';
    const completeStyle = todolist.filter === 'completed' ? 'contained' : 'text';
    const colorDeleteBtn = disableWhileLoading ? 'inherit' : 'error';

    return (
        <div key={todolist.id} className={s.wrapper}>
            <h3 className={s.title}>
                <EditableSpan title={todolist.title}
                              callback={changeTodolistTitleCallback}
                              disabled={disableWhileLoading}/>
                <IconButton onClick={deleteTodolistHandler}
                            disabled={disableWhileLoading}>
                    <DeleteForever color={colorDeleteBtn}/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTaskCallback} disabled={disableWhileLoading}/>
            <div className={s.tasksWrapper}>{tasksList}</div>
            <div className={s.btnWrapper}>
                <Button title={'All'}
                        className={s.filterBtn}
                        color={"info"}
                        variant={allStyle}
                        onClick={allFilterHandler}>All
                </Button>

                <Button title={'Active'}
                        className={s.filterBtn}
                        color={"warning"}
                        variant={activeStyle}
                        onClick={activeFilterHandler}>Active
                </Button>

                <Button title={'All'}
                        className={s.filterBtn}
                        color={"success"}
                        variant={completeStyle}
                        onClick={completeFilterHandler}>Completed
                </Button>
            </div>
        </div>
    );
});