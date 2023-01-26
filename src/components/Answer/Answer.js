import React from 'react';
import moduleStyles from './Answer.module.css';

export default function Answer({ isSelected, isQuizEnded, isRight, onSelect, value }) {
    let styles = {};
    if (isSelected) {
        styles = {
            backgroundColor: '#D6DBF5',
            border: 'none',
        };
    }

    if (isQuizEnded) {
        if (isSelected) {
            styles = isRight ?
                {
                    backgroundColor: '#94d7a2',
                    border: 'none',
                } : 
                {
                    backgroundColor: '#f8bcbc',
                    border: 'none',
                    opacity: '0.5',
                };
        } else if (!isSelected && isRight) {
            styles = {
                backgroundColor: '#94d7a2',
                border: 'none',
            };
        } else {
            styles = {
                opacity: '0.5',
            };
        }
    }

    return (
        <button
            className={moduleStyles['answer']}
            style={styles}
            onClick={onSelect}
        >
            {value}
        </button>
    );
}