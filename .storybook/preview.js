export const parameters = {
    docs: {
        inlineStories: false,
        iframeHeight: "700px",
    }, //Добавил для исправления бага material UI
    // layout: "centered", //Отображать компоненты по центру
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}