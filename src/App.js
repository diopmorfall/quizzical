import React from 'react';
import './index.css';
import Home from './components/Home';
import Quiz from './components/Quiz';

export default function App() {
    const [isQuizStarted, setIsQuizStarted] = React.useState(false);
    return (
        <main>{isQuizStarted ? <Quiz /> : <Home startQuiz={setIsQuizStarted} />}</main>
    );
}