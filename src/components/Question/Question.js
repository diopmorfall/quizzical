import React from 'react';
import moduleStyles from './Question.module.css';

export default function Question(props) {
    return (
        <div className={moduleStyles['question-container']}>
            <h2>{props.query}</h2>
            <div className={moduleStyles['answers']}>{props.children}</div>
        </div>
    );
}
