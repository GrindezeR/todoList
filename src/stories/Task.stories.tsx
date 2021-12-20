import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "../features/TodolistsList/Todolist/Task/Task";
import {action} from "@storybook/addon-actions";
import {TasksStatuses} from "../api/todolist-api";

export default {
    title: 'Todolist/Tasks',
    component: Task,
    args: {
        todolistId: 'TodolistId1',
        changeTaskTitle: action('title change'),
        changeTaskStatus: action('status change'),
        deleteTask: action('task delete'),
    }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskStoryDone = Template.bind({});
export const TaskStoryNotDone = Template.bind({});

TaskStoryDone.args = {
    task: {
        id: '1', title: 'HTML', status: TasksStatuses.New, order: 0,
        addedDate: '',
        deadline: '',
        startDate: '',
        description: '',
        priority: 2,
        todoListId: 'todolistId1',
        entityStatus: 'idle'
    },
}

TaskStoryNotDone.args = {
    task: {
        id: '1', title: 'React', status: TasksStatuses.Completed, order: 0,
        addedDate: '',
        deadline: '',
        startDate: '',
        description: '',
        priority: 2,
        todoListId: 'todolistId1',
        entityStatus: 'idle'
    },
}