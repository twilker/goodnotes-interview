/* eslint-disable @typescript-eslint/prefer-for-of */
export async function someAsyncFunction(): Promise<string> {
    // Simulate async operation, e.g., fetching data
    return new Promise(resolve => setTimeout(() => resolve('Async Operation Results'), 10));
}

export class RandomGenerator {
    private readonly letterMap: Map<string, string[]> = new Map();
    private readonly firstCharacters: string[] = [];

    constructor(private readonly words: string[]) {
        this.processInput(words);
    }

    private processInput(words: string[]) {
        words.forEach(word => {
            const characters = word.split('');
            for (let index = 0; index < characters.length; index++) {
                const character = characters[index];
                if (index === 0) {
                    this.firstCharacters.push(character);
                }
                if (!this.letterMap.has(character)) {
                    this.letterMap.set(character, []);
                }
                const nextCharacter = index == characters.length - 1 ? 'END' : characters[index + 1];
                this.letterMap.get(character)?.push(nextCharacter);
            }
        });
        console.log(`first: ${this.firstCharacters}`);
        this.letterMap.forEach((value, key) => {
            console.log(`map entry: ${key}: ${value}`);
        });
    }

    public generate(): string {
        let currentCharacter = this.firstCharacters[Math.floor(Math.random() * this.firstCharacters.length)];
        const output: string[] = [];
        while (currentCharacter !== 'END') {
            output.push(currentCharacter);
            const options = this.letterMap.get(currentCharacter);
            if (!options) {
                break;
            }
            currentCharacter = options[Math.floor(Math.random() * options.length)];
        }
        return output.join('');
    }
}

export type NameChecker = {
    check: (input: string) => boolean;
};

export type LabelUpdater = {
    update: (input: string) => void;
};

export class DeplayedInput {
    private timerId: NodeJS.Timeout | undefined = undefined;
    constructor(
        private readonly checker: NameChecker,
        private readonly windowSize: number,
        private readonly updater: LabelUpdater,
    ) {}

    public postInput(input: string) {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(() => {
            this.timerId = undefined;
            if (this.checker.check(input)) {
                this.updater.update(input);
            }
        }, this.windowSize);
    }
}
