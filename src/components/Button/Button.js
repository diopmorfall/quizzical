import React from 'react';
import moduleStyles from './Button.module.css';

export default function Button({ caption, onClick, isDisabled }) {
    let styles;
    if (caption !== 'Start quiz') {
        styles = { 
            width: '120px',
            height: '35px',
            margin: '20px'
        };
    
        if (window.matchMedia('(min-width: 768px)').matches) {
            styles = {
                width: '150px',
                height: '45px',
                margin: '30px'
            };
        }
    
        if (window.matchMedia('(min-width: 1000px)').matches) {
            styles = {
                width: '185px',
                height: '55px',
                margin: '50px'
            };
        }
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
