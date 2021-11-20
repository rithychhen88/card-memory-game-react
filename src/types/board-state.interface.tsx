import { CardInterface } from './card.interface';
export interface BoardStateInterface {
     // states
     cards: CardInterface[],
     firstSelectedCard: CardInterface | null,
     tryCount: number,
     removedCount: number
}