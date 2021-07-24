import { Bird, Fish } from './BirdAndFish';

export const flyOrSwimGuare = (o: Bird | Fish): void => {
    if (o instanceof Bird) {
        o.fly();
    } else if (o instanceof Fish) {
        o.swim();
    }
};
