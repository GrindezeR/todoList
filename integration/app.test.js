    describe('addItemForm', () => {
        it('base example, visually looks correct', async () => {
            // APIs from jest-puppeteer
            await page.goto('http://localhost:9009/iframe.html?id=todolist-app--app-story&viewMode=story');
            const image = await page.screenshot();

            // api from jest-image-snapshot
            expect(image).toMatchImageSnapshot();
        });
    });
