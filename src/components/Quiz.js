import React from 'react';
import { QuestionModel } from '../QuestionModel';

export default function Quiz() {
    const [questions, setQuestions] = React.useState([]);
    React.useEffect(() => {
        fetch(
        'https://opentdb.com/api.php?amount=30&category=22&difficulty=medium&type=multiple'
        )
        .then((res) => res.json())
        .then((data) =>
            setQuestions(() =>
            data.results.map((question) => new QuestionModel(question))
            )
        );
    }, []);

    const questionElements = questions.map((question) => (
        <div className="question-container">
        <h2>{question.question}</h2>
        <div className="answers">{
            question.answers.map(answer => <span>{answer}</span>)
        }</div>
        <hr />
        </div>
    ));

    return (
        <section className="quiz">
        {questionElements.length ? (
            <>
            {questionElements}
            <button>Check answers</button>
            </>
        ) : (
            ''
        )}
        </section>
    );
}
