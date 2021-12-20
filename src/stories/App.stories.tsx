import App from "../app/App";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App demo={true}/>

export const AppStory = Template.bind({});