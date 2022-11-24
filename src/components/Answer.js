import React from 'react';

export default function Answer(props) {
    const styles = props.isSelected ? 
    {
        backgroundColor: '#D6DBF5',
        border: 'none',
    } : {};

    return <button style={styles} onClick={props.onSelect}>{props.value}</button>;
}