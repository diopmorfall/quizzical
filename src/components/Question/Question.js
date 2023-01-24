import React from 'react';
import moduleStyles from './Question.module.css';

export default function Question({ query, children }) {
    return (
        <div className={moduleStyles['question-container']}>
            <h2>{query}</h2>
            <div className={moduleStyles['answers']}>{children}</div>
        </div>
    );
}
