import { Bird, Fish } from './BirdAndFish';

export const isSwimmable = (o: Fish | Bird): o is Fish => o instanceof Fish;
