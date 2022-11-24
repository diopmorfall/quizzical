import React from 'react';
import { QuestionModel } from '../QuestionModel';
import Question from './Question';
import Answer from './Answer';

export default function Quiz() {
    const [questions, setQuestions] = React.useState([]);
    React.useEffect(() => {
        fetch(
        'https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple'
        )
        .then((res) => res.json())
        .then((data) =>
            setQuestions(() =>
                data.results.map((question) => new QuestionModel(question))
            )
        );
    }, []);

    const questionElements = questions.map((question) => (
        <Question
            key={question.query}
            query={question.query}
        >
            {question.answers.map((answer) => (
                <Answer
                    key={answer.value}
                    value={answer.value}
                    isRight={answer.isRight}
                    isSelected={answer.isSelected}
                />
            ))}
        </Question>
    ));
        
    return (
        <section className="quiz">
        {questionElements.length ? (
            <>
                {questionElements}
                <button className="general-btn">Check answers</button>
            </>
        ) : (
            'spinner...'
        )}
        </section>
    );
}
