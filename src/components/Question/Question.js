import React from 'react';
import styles from './Question.module.css';

export default function Question(props) {
    return (
        <div className={styles['question-container']}>
            <h2>{props.query}</h2>
            <div className={styles['answers']}>{props.children}</div>
        </div>
    );
}
