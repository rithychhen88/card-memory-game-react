
import React, { Component, ReactNode } from 'react';
import { CardInterface } from '../../types/card.interface';
import { positionEnum,  } from '../../types/position.enum';
import './card.component.scss';

export class CardComponent extends Component<{ card: CardInterface, onChange: Function }, {card: CardInterface}> {
    constructor(props: any) {
        super(props);
        this.state = { card: this.props.card };
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard(card: CardInterface) {
        // ignore the click if the card is flag as removed.
        if (card.position === positionEnum.REMOVE) {
            return;
        }

        card.position =  (card.position === positionEnum.DOWN) ? positionEnum.UP : positionEnum.DOWN;
        this.setState({ card }, () => {
            // allow time for revealing the card.
            setTimeout(() => {
                this.props.onChange(this.state.card);
            }, 500);
        });
    }

    render(): ReactNode {
        let cardContentElement = null;
        if (this.state.card.position === positionEnum.UP) {
            cardContentElement = (<div className="card-front">
                <div className="card-value d-flex align-self-center">{this.props.card.value}</div>
            </div>);
        } else if (this.state.card.position === positionEnum.DOWN) {
            cardContentElement = (<div className="card-back"></div>);
        }
        
        return (
            <div className="card" onClick={() => this.flipCard(this.state.card)}>
                <div className="card-inner">
                    { cardContentElement }
                </div>
            </div>
        )
    }
}