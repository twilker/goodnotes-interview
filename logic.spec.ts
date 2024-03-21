import { DeplayedInput as DelayedInput, someAsyncFunction } from './logic';

describe('someAsyncFunction', () => {
    it('returns the expected result', async () => {
        const result = await someAsyncFunction();
        expect(result).toBe('Async Operation Results');
    });
});

describe('DeplayedInput', () => {
    it('post result after timeout', async () => {
        const receivedInputs: string[] = [];
        const testContext = new DelayedInput(
            {
                check: input => {
                    receivedInputs.push(input);
                    return true;
                },
            },
            100,
            {
                update: () => {
                    /**/
                },
            },
        );
        testContext.postInput('foo');
        expect(receivedInputs).toHaveLength(0);
        await new Promise<void>(resolve => setTimeout(() => resolve(), 100));

        expect(receivedInputs).toEqual(['foo']);
    });

    it('post result after timeout', async () => {
        const receivedInputs: string[] = [];
        const testContext = new DelayedInput(
            {
                check: input => {
                    receivedInputs.push(input);
                    return true;
                },
            },
            100,
            {
                update: () => {
                    /**/
                },
            },
        );
        testContext.postInput('foo');
        await new Promise<void>(resolve => setTimeout(() => resolve(), 10));

        expect(receivedInputs).toHaveLength(0);
    });

    it('post result after timeout', async () => {
        const receivedInputs: string[] = [];
        const testContext = new DelayedInput(
            {
                check: input => {
                    receivedInputs.push(input);
                    return true;
                },
            },
            100,
            {
                update: () => {
                    /**/
                },
            },
        );
        testContext.postInput('foo');
        await new Promise<void>(resolve => setTimeout(() => resolve(), 50));
        testContext.postInput('ba');
        await new Promise<void>(resolve => setTimeout(() => resolve(), 80));
        expect(receivedInputs).toHaveLength(0);

        await new Promise<void>(resolve => setTimeout(() => resolve(), 50));

        expect(receivedInputs).toEqual(['ba']);
    });

    it('post result after timeout', async () => {
        const receivedUpdates: string[] = [];
        const testContext = new DelayedInput(
            {
                check: () => {
                    return true;
                },
            },
            100,
            {
                update: input => {
                    receivedUpdates.push(input);
                },
            },
        );
        testContext.postInput('foo');
        expect(receivedUpdates).toHaveLength(0);
        await new Promise<void>(resolve => setTimeout(() => resolve(), 100));

        expect(receivedUpdates).toEqual(['foo']);
    });

    it('post result after timeout', async () => {
        const receivedUpdates: string[] = [];
        const testContext = new DelayedInput(
            {
                check: () => {
                    return false;
                },
            },
            100,
            {
                update: input => {
                    receivedUpdates.push(input);
                },
            },
        );
        testContext.postInput('foo');
        expect(receivedUpdates).toHaveLength(0);
        await new Promise<void>(resolve => setTimeout(() => resolve(), 100));

        expect(receivedUpdates).toHaveLength(0);
    });
});
