import React from 'react';
import moduleStyles from './Button.module.css';

export default function Button(props) {
    let styles;
    if (props.caption !== 'Start quiz') {
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
            onClick={props.onClick}
            disabled={props.isDisabled}
        >
            {props.caption}
        </button>
    );
}
