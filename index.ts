import { RandomGenerator } from './logic';

async function main() {
    const generator = new RandomGenerator(['apple', 'banana', 'cabbage']);
    console.log(generator.generate());
    console.log(generator.generate());
    console.log(generator.generate());
}

main().catch(console.error);
