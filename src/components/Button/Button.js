import React from 'react';
import moduleStyles from './Button.module.css';

export default function Button({ caption, onClick, isDisabled }) {
    let styles;
    if (caption !== 'Start quiz') {
        styles = {
            width: '120px',
            height: '35px',
            margin: '20px',
        };
    }

    return (
        <button
            className={moduleStyles['general-btn']}
            style={styles}
            onClick={onClick}
            disabled={isDisabled}
        >
            {caption}
        </button>
    );
}
