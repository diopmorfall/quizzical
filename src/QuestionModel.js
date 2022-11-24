export class QuestionModel {
    constructor(infos) {
        this.query = infos.question;
        this.answers = shuffleAnswers([
            {
                value: infos.correct_answer,
                isRight: true,
                isSelected: false,
            },
            ...infos.incorrect_answers.map(answer => 
                ({
                    value: answer,
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
