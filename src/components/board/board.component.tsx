
import React, { Component, ReactNode } from 'react';
import { CardComponent } from './../card/card.component';
import { CardInterface } from './../../types/card.interface';
import { positionEnum } from './../../types/position.enum';
import './board.component.scss';
import { BoardStateInterface } from './../../types/board-state.interface';

export class BoardComponent extends Component<{}, BoardStateInterface> {

    constructor(props: any) {
        super(props);
        this.state = { cards: [], firstSelectedCard: null, tryCount: 0, removedCount: 0};
        this.createCards = this.createCards.bind(this);
        this.startGame = this.startGame.bind(this);
        this.cardChange = this.cardChange.bind(this);
    }
    
    cardChange(card: CardInterface) {
        // if previous selected card. compare. 
        if (this.state.firstSelectedCard) {
            // remove card from cards.
            let currentDeck = this.state.cards;
            if (this.state.firstSelectedCard.value === card.value) {
                currentDeck[card.index].position = positionEnum.REMOVE;
                currentDeck[this.state.firstSelectedCard.index].position = positionEnum.REMOVE;
                this.setState({ removedCount: this.state.removedCount + 2 }, () => {
                    if (this.state.removedCount === this.state.cards.length) {
                        alert('You won. Congratutation!!!!! (#try: ' + this.state.tryCount + ')');
                    }
                });
            } else {
                //flip back. 
                currentDeck[card.index].position = positionEnum.DOWN;
                currentDeck[this.state.firstSelectedCard.index].position = positionEnum.DOWN;
                this.setState({ tryCount: this.state.tryCount + 1 });
            }
            this.setState({ cards: currentDeck, firstSelectedCard: null });
        } else {
            // set the current selected to first selection.
            this.setState({ firstSelectedCard: card });
        }
    }

    startGame() {
        this.setState({ cards: [], firstSelectedCard: null, tryCount: 0, removedCount: 0 }, () => {
            this.setState({ cards: this.createCards(12, 1, 100) }, () => {
                console.log(this.state.cards);
            });
        });       
    }

    createCards(count: number, min: number, max: number): CardInterface[] {
        const arr = [];
        // create random number from min-max.
        while (arr.length < count) {
            const randomNUmber = Math.floor(Math.random() * max) + min;
            if (arr.indexOf(randomNUmber) === -1) {
                arr.push(randomNUmber);
            }
        }

        let cards: CardInterface[] = [];

        arr.forEach((numb) => {
            // add pairs.
            cards.push({ value: numb, position: positionEnum.DOWN } as CardInterface);
            cards.push({ value: numb, position: positionEnum.DOWN } as CardInterface);
        });

        // shuffle the cards so the order are random.
        cards = cards.sort((a, b) => 0.5 - Math.random());;
        // set index in the deck position.
        cards.forEach((card: CardInterface, index: number) => card.index = index);

        return cards;
    }

    render(): ReactNode {

        let mainElement = null;
        if (!this.state.cards || this.state.cards.length === 0) {
            mainElement = (<div className="my-game-message">Click on the "Start a new game" button to start playing.</div>);
        } else {
            mainElement = (<div className="my-game-cards d-flex flex-wrap">
                    {
                        this.state.cards.map((card: CardInterface) => {
                            return (<div className="my-game-card d-flex flex align-items-center">
                                <CardComponent card={card} onChange={this.cardChange}/>
                            </div>)
                        })
                    }
                </div>
            )
        }

        return (
            <div className="my-game-cards-table">
                <div className="my-games-header d-flex flex flex-column align-items-center">
                    <button type="button" className="btn btn-primary" onClick={this.startGame}>Start a new game</button>
                </div>
                { mainElement }
            </div>
        )
    }
}