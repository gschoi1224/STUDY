import { Identity } from '../classes/Identity';
type IPerson = { name: string; age: number };
const leonardo = Identity.of(['Leonardo', 55]);

console.log(
    leonardo
        .map(([name, age]) => ({ name, age }))
        .chain(
            (p: IPerson) =>
                Identity.of(p)
                    .map(({ name, age }) => [name, age])
                    .value()[0] == leonardo.value()[0],
        ),
); // true
