import App from "../app/App";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxRouterDecorator, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, ReduxRouterDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App demo={true}/>

export const AppStory = Template.bind({});