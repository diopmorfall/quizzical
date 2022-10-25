import React from 'react';
import './index.css';
import Quiz from './components/Quiz';

export default function App() {
    const [isQuizStarted, setIsQuizStarted] = React.useState(false);

    function startQuiz() {
        setIsQuizStarted((prevIsQuizStarted) => !prevIsQuizStarted);
    }

    return (
        <main>
            {isQuizStarted ? (
                <Quiz />
            ) : (
                <section className="home">
                    <h1>Quizzical</h1>
                    <p>Test your knowledge</p>
                    <button className="general-btn" onClick={startQuiz}>
                        Start quiz
                    </button>
                </section>
            )}
        </main>
    );
}