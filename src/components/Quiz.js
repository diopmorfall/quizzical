import React from 'react';
import { nanoid } from 'nanoid';

import { QuestionModel } from '../QuestionModel';
import Question from './Question';
import Answer from './Answer';

export default function Quiz() {
    const [questions, setQuestions] = React.useState([]);
    React.useEffect(() => {
        fetch(
        'https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple'
        )
        .then(res => res.json())
        .then(data =>
            setQuestions(() =>
                data.results.map(question => new QuestionModel(question))
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

function checkAnswers(){

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
            </>
        ) : (
            'spinner...'
        )}
        </section>
    );
}
