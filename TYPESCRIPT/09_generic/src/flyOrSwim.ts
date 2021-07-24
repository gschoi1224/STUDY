import { Bird, Fish } from './BirdAndFish';

export const flyOrSwim = (o: Bird | Fish): void => {
    if (o instanceof Bird) {
        (o as Bird).fly(); // 혹은 (<Bird>o).fly()
    } else if (o instanceof Fish) {
        (o as Fish).swim();
    }
};
