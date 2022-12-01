import React from 'react';

export default function GameOver(props) {
    function startNewGame() {
        props.startNewGame();
    }

    return (
        <div className="game-over" id="game-over">
            <p>
                You got {props.correctAnswers}/5 correct answers
            </p>
            <button className="general-btn" onClick={startNewGame}>
                Start a new quiz
            </button>
        </div>
    );
}
