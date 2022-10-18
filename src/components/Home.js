import React from 'react';

export default function Home(props) {
    function startQuiz() {
        props.startQuiz((prevIsQuizStarted) => !prevIsQuizStarted);
    }

    return (
        <section className="home">
        <h1>Quizzical</h1>
        <p>Test your knowledge</p>
        <button onClick={startQuiz}>Start quiz</button>
        </section>
    );
}