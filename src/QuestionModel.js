import { decode } from 'html-entities';

export class QuestionModel {
    constructor(infos) {
        this.query = decode(infos.question);
        this.answers = shuffleAnswers([
            {
                value: decode(infos.correct_answer),
                isRight: true,
                isSelected: false,
            },
            ...infos.incorrect_answers.map(answer => 
                ({
                    value: decode(answer),
                    isRight: false,
                    isSelected: false,
                })
            ),
        ]);
    }
}

function shuffleAnswers(answers) {
    let currentIndex = answers.length;
    while (0 !== currentIndex) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        let tmp = answers[currentIndex];
        answers[currentIndex] = answers[randomIndex];
        answers[randomIndex] = tmp;
    }
    return answers;
}
