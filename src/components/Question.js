import React from 'react';

export default function Question(props) {
    return (
        <div className="question-container">
        <h2>{props.query}</h2>
        <div className="answers">{props.children}</div>
        <div></div>
        </div>
    );
}
