import React from 'react';

export default function Answer(props) {
    return <button onClick={props.onSelect}>{props.value}</button>;
}