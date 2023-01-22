import React from 'react';
import buttonStyles from './Button.module.css';

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
            className={buttonStyles['general-btn']}
            style={styles}
            onClick={props.onClick}
            disabled={props.isDisabled}
        >
            {props.caption}
        </button>
    );
}
