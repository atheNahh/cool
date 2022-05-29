import React from 'react';
import "./main.css";
import { Component } from 'react';
import frame from '../img/frame.jpg';
import head from '../img/head.jpg';
import body from '../img/body.jpg';
import arm1 from '../img/arm1.jpg';
import arm2 from '../img/arm2.jpg';
import leg1 from '../img/leg1.jpg';
import dead from '../img/dead.jpg';

class Game extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [frame, head, body, arm1, arm2, leg1, dead],
  };

  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      noOfWrong: 0,
      guessed: new Set(),
      answer: this.props.randword.word,
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.setState({
      noOfWrong: 0,
      guessed: new Set(),
      answer: this.props.randword.word,
    });
  }

  guessedWord() {
    return this.state.answer.split("").map((letter) => (this.state.guessed.has(letter) ? letter : "_"));
  }

  handleGuess(evt) {
    let letter = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      noOfWrong: st.noOfWrong + (st.answer.includes(letter) ? 0 : 1),
    }));
  }

  generateKeypad() {
    return "abcdefghijklmnopqrstuvwxyz ".split("").map((letter) => (
      <button
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  render() {
    const gameOver = this.state.noOfWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState = this.generateKeypad();
    if (isWinner) gameState = "Congrats, You have won the Game";
    if (gameOver) gameState = "Better Luck Next Time";
    let restart = gameOver || isWinner;
    return (
      <div className="Hangman">
        <h2>Hangman</h2>
        <img src={this.props.images[this.state.noOfWrong]} alt="HangMan" />
        <p>
          Guessed Left: {this.props.maxWrong - this.state.noOfWrong} /{" "}
          {this.props.maxWrong}
        </p>
        <p>Guess the {this.props.cat}</p>
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p className="Hangman-btns">{gameState}</p>
        {restart && (
          <button id="reset" onClick={this.reset}>
            Restart?
          </button>
        )}
      </div>
    );
  }
}

export default Game;