import React, { useReducer } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader';
import moduleStyles from './Quiz.module.css';

import { QuestionModel } from '../../QuestionModel';
import Button from '../Button/Button';
import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import GameOver from '../GameOver/GameOver';

export default function Quiz({ categoryId, difficulty, questionsAmount }) {
    const defaultState = {
        questions: [],
        correctAnswers: 0,
        isQuizEnded: false,
        isButtonDisabled: false,
    };
    
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_QUESTIONS':
                return { ...state, questions: action.payload };
            case 'INCREMENT_CORRECT_ANSWERS':
                return { ...state, correctAnswers: state.correctAnswers + 1 };
            case 'QUIZ_ENDED':
                return { ...state, isQuizEnded: true };
            case 'BUTTON_DISABLED':
                return { ...state, isButtonDisabled: true };
            case 'SELECT_ANSWER':
                return {
                    ...state,
                    questions: state.questions.map(question => {
                        if (action.payload.query === question.query) {
                            let newAnswers = question.answers.map(answer => ({
                                ...answer,
                                isSelected: false,
                            }));
                            newAnswers = newAnswers.map(answer => {
                                if (action.payload.selectedAnswer === answer.value) {
                                    answer = { ...answer, isSelected: true };
                                }
                                return answer;
                            });
                            question.answers = newAnswers;
                        }
                        return question;
                    }),
                };
            default:
                return state;
        }
    };
    
    const [state, dispatch] = useReducer(reducer, defaultState);

    React.useEffect(() => {
        axios.get(
            `https://opentdb.com/api.php?amount=${questionsAmount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`
        )
        .then(res => 
            dispatch({
                type: 'SET_QUESTIONS',
                payload: res.data.results.map((question) => new QuestionModel(question)),
            })
        );
    }, []); //todo: the right dependency to not make the call twice ?

    function selectAnswer(query, selectedAnswer) {
        dispatch({
            type: 'SELECT_ANSWER',
            payload: { query, selectedAnswer },
        });
    }

    function checkAnswers() {
        dispatch({ type: 'BUTTON_DISABLED' });
        dispatch({ type: 'QUIZ_ENDED' });

        state.questions.forEach(question =>
            question.answers.forEach(answer => {
                if (answer.isSelected) {
                    if (answer.isRight) {
                        dispatch({ type: 'INCREMENT_CORRECT_ANSWERS' });
                    }
                }
            })
        );
        setTimeout(() => {
            document.getElementById("game-over").scrollIntoView(true)
        }, 500);
    }

    const questionElements = state.questions.map(question => (
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
                    isQuizEnded={state.isQuizEnded}
                    onSelect={() => selectAnswer(question.query, answer.value)}
                />
            ))}
        </Question>
    ));
        
    return (
        <section className={moduleStyles['quiz']}>
            {questionElements.length ? (
                <>
                    {questionElements}
                    <Button
                        caption="Check answers"
                        onClick={checkAnswers}
                        isDisabled={state.isButtonDisabled}
                    />
                    {state.isQuizEnded ? (
                        <GameOver
                            correctAnswers={state.correctAnswers}
                            questionsNumber={state.questions.length}
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
