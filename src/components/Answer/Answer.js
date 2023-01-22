import React from 'react';
import moduleStyles from './Answer.module.css';

export default function Answer(props) {
    let styles = {};
    if (props.isSelected) {
        styles = {
            backgroundColor: '#D6DBF5',
            border: 'none',
        };
    }

    if (props.isQuizEnded) {
        if (props.isSelected) {
            styles = props.isRight
                ? {
                    backgroundColor: '#94d7a2',
                    border: 'none',
                } : {
                    backgroundColor: '#f8bcbc',
                    border: 'none',
                    opacity: '0.5',
                };
        } else if (!props.isSelected && props.isRight) {
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
            onClick={props.onSelect}
        >
            {props.value}
        </button>
    );
}