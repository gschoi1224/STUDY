import { IShape } from './IShape';

export const calcArea = (shape: IShape): number => {
    switch (shape.tag) {
        case 'square':
            return shape.size * shape.size;
        case 'rectangle':
            return shape.width * shape.height;
        case 'circle':
            return shape.radius * Math.PI * shape.radius;
    }
    return 0;
};
