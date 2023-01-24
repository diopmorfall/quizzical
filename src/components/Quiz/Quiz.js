import React from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader';
import styles from './Quiz.module.css';

import { QuestionModel } from '../../QuestionModel';
import Button from '../Button/Button';
import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import GameOver from '../GameOver/GameOver';

export default function Quiz({ categoryId, difficulty, questionsAmount }) {
    const [questions, setQuestions] = React.useState([]);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [isQuizEnded, setIsQuizEnded] = React.useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    React.useEffect(() => {
        axios.get(
            `https://opentdb.com/api.php?amount=${questionsAmount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`
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
        setIsButtonDisabled(true);
        setIsQuizEnded(true);
        
        questions.forEach((question) =>
            question.answers.forEach((answer) => {
                if (answer.isSelected) {
                    if (answer.isRight) {
                        setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
                    }
                }
            })
        );
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
                    isQuizEnded={isQuizEnded}
                    onSelect={() => selectAnswer(question.query, answer.value)}
                />
            ))}
        </Question>
    ));
        
    return (
        <section className={styles['quiz']}>
            {questionElements.length ? (
                <>
                    {questionElements}
                    <Button
                        caption="Check answers"
                        onClick={checkAnswers}
                        isDisabled={isButtonDisabled}
                    />
                    {isQuizEnded ? (
                        <GameOver
                            correctAnswers={correctAnswers}
                            questionsNumber={questions.length}
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
