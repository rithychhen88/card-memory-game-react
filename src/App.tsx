import React, { Component, ReactNode } from 'react';
import './App.scss';
import { BoardComponent } from './components/board/board.component';

export default class App extends Component {

  render(): ReactNode {
    return (
      <div className="my-game-wrapper container container-fluid d-flex flex-column">
        <BoardComponent/>
      </div>
    );
  }
}
