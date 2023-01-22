import React from 'react';
import './index.css';
import Button from './components/Button/Button'
import Quiz from './components/Quiz/Quiz';

export default function App() {
    const [isQuizStarted, setIsQuizStarted] = React.useState(false);

    function startQuiz() {
        setIsQuizStarted((prevIsQuizStarted) => !prevIsQuizStarted);
    }

    return (
        <main>
            {isQuizStarted ? (
                <>
                    <Quiz restartGame={startQuiz} />
                </>
            ) : (
                <section className="home">
                    <h1>Quizzical</h1>
                    <p>Test your knowledge</p>
                    <Button caption="Start quiz" onClick={startQuiz} />
                </section>
            )}
        </main>
    );
}