import React, { Component } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import shuffle from 'shuffle-array';
import './App.css';


const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
}

class App extends Component {
  constructor(props) {
    super(props);

    let cards = [
      { id: 0, cardState: CardState.HIDING, backgroundColor: 'red' },
      { id: 1, cardState: CardState.HIDING, backgroundColor: 'red' },
      { id: 2, cardState: CardState.HIDING, backgroundColor: 'navy' },
      { id: 3, cardState: CardState.HIDING, backgroundColor: 'navy' },
      { id: 4, cardState: CardState.HIDING, backgroundColor: 'green' },
      { id: 5, cardState: CardState.HIDING, backgroundColor: 'green' },
      { id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow' },
      { id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow' },
      { id: 8, cardState: CardState.HIDING, backgroundColor: 'black' },
      { id: 9, cardState: CardState.HIDING, backgroundColor: 'black' },
      { id: 10, cardState: CardState.HIDING, backgroundColor: 'purple' },
      { id: 11, cardState: CardState.HIDING, backgroundColor: 'purple' },
      { id: 12, cardState: CardState.HIDING, backgroundColor: 'pink' },
      { id: 13, cardState: CardState.HIDING, backgroundColor: 'pink' },
      { id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue' },
      { id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue' }
    ];
    cards = shuffle(cards);
    this.state = { cards, noClick: false }

    this.handleClick = this.handleClick.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);

  }
  handleClick(id) {
    const mapCardState = (cards, idToChange, newCardState) => {
      return cards.map(c => {
        if (idToChange.includes(c.id)) {
          return {
            ...c,
            cardState: newCardState
          }
        }
        return c;
      })
    }
    const foundCard = this.state.cards.find(c => c.id === id)
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    let noClick = false;

    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

    const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING)

    const ids = showingCards.map(c => c.id)

    if (showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
      cards = mapCardState(cards, ids, CardState.MATCHING)
    } else if (showingCards.length === 2) {
      let hidingCards = mapCardState(cards, ids, CardState.HIDING)
      noClick = true;
      this.setState({ cards, noClick }, () => {
        setTimeout(() => {
          this.setState({ cards: hidingCards, noClick: false })
        }, 2000)
      })
      return;
    }
    console.log(cards)
    this.setState({ cards, noClick })
  }

  handleNewGame() {
    let cards = this.state.cards.map(c => ({
      ...c,
      cardState: CardState.HIDING
    }))
    cards = shuffle(cards)
    this.setState({ cards })
  }


  render() {
    const cards = this.state.cards.map(d => {
      return (
        <Card
          key={d.id}
          showing={d.cardState !== CardState.HIDING}
          backgroundColor={d.backgroundColor}
          onClick={() => this.handleClick(d.id)} />
      )
    })
    return (
      <div className="App">
        <Navbar onNewGame={this.handleNewGame} />
        {cards}
      </div>
    );
  }
}

export default App;