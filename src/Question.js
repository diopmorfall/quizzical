export class Question {
    constructor(infos) {
        this.question = infos.question;
        this.correctAnswer = infos.correct_answer;
        this.incorrectAnswers = infos.incorrect_answers;
        this.answers = shuffleAnswers([
            ...this.incorrectAnswers,
            this.correctAnswer,
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