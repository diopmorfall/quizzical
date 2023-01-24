import React from 'react';
import styles from './GameOver.module.css';

export default function GameOver({ correctAnswers, questionsNumber }) {

    return (
        <div className={styles['game-over']} id="game-over">
            <p>
                You got {correctAnswers} correct answers out of {questionsNumber} questions!
            </p>
        </div>
    );
}
