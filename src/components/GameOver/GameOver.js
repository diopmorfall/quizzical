import React from 'react';
import styles from './GameOver.module.css';
import Button from '../Button/Button';

export default function GameOver({ correctAnswers, restartNewGame, questionsNumber }) {
    function startNewGame() {
        restartNewGame(); //todo: fix it with routing
    }

    return (
        <div className={styles['game-over']} id="game-over">
            <p>
                You got {correctAnswers}/{questionsNumber} correct answers
            </p>
            <Button caption="Start a new quiz" onClick={startNewGame} />
        </div>
    );
}
