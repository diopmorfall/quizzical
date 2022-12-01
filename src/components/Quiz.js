import React from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader';

import { QuestionModel } from '../QuestionModel';
import Question from './Question';
import Answer from './Answer';
import GameOver from './GameOver';

export default function Quiz(props) {
    const [questions, setQuestions] = React.useState([]);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [isQuizEnded, setIsQuizEnded] = React.useState(false);

    React.useEffect(() => {
        axios.get(
            'https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple'
        )
            .then(data => 
                setQuestions(() =>
                    data.data.results.map(question => new QuestionModel(question))
                )
            );
    }, []);

function selectAnswer(query, selectedAnswer) {
    setQuestions((prevQuestions) => {
        return prevQuestions.map(question => {
            if (question.query === query) {
                let newAnswers = question.answers.map((answer) => ({
                    ...answer,
                    isSelected: false,
                }));
                newAnswers = newAnswers.map(answer => {
                    if (answer.value === selectedAnswer) {
                        answer = { ...answer, isSelected: true };
                    }
                    return answer;
                });
                question.answers = newAnswers;
            }
            return question;
        });
    });
}

function checkAnswers() {
    const answerElements = document.getElementsByClassName('answer');
    questions.forEach((question) =>
        question.answers.forEach((answer) => {
            if (answer.isSelected) {
                if (answer.isRight) {
                    setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
                }
            }
        })
    );
    setIsQuizEnded(true);
    setTimeout(() => {
        document.getElementById("game-over").scrollIntoView(true)
    }, 500);
}

    const questionElements = questions.map(question => (
        <Question
            key={nanoid()}
            query={question.query}
        >
            {question.answers.map(answer => (
                <Answer
                    key={nanoid()}
                    value={answer.value}
                    isRight={answer.isRight}
                    isSelected={answer.isSelected}
                    onSelect={() => selectAnswer(question.query, answer.value)}
                />
            ))}
        </Question>
    ));
        
    return (
        <section className="quiz">
        {questionElements.length ? (
            <>
                {questionElements}
                
                    <button className="general-btn" onClick={checkAnswers}>Check answers</button>
                
                {isQuizEnded ? (
                    <GameOver
                        correctAnswers={correctAnswers}
                        startNewGame={props.restartGame}
                    />
                    ) : (
                        ''
                    )}
            </>
        ) : (
            <BarLoader className='loader' color='#4d5b9e' height='20px' width='50%' />
        )}
        </section>
    );
}
