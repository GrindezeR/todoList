import AddItemForm from "./AddItemForm";
import {ComponentStory, ComponentMeta} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        callback: {
            description: 'Button clicked description'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    title: 'Add List',
    callback: action('Button inside form clicked'),
};

export const AddItemFormDisableStory = Template.bind({});

AddItemFormDisableStory.args = {
    title: 'Add List',
    disabled: true,
    callback: action('Button inside form clicked'),
};