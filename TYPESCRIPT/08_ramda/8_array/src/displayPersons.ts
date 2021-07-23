import * as R from 'ramda';
import { IPerson } from './model/person';

export const displayPersons = (perfix: string) =>
    R.pipe(
        R.map((person: IPerson) => ({ name: person.name, age: person.age })),
        R.tap(o => console.log(perfix, o)),
    ) as any;
