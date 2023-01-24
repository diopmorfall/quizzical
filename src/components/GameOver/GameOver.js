import React from 'react';
import moduleStyles from './GameOver.module.css';

export default function GameOver({ correctAnswers, questionsNumber }) {

    return (
        <div className={moduleStyles['game-over']} id="game-over">
            <p>
                You got {correctAnswers} correct answers out of {questionsNumber} questions!
            </p>
        </div>
    );
}
