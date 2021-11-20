import { positionEnum } from './position.enum';

export interface CardInterface {
    index: number;
    value: number;
    position: positionEnum;
    isRemoved: boolean;
}