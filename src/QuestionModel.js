export class QuestionModel {
    constructor(infos) {
        this.query = infos.question;
        this.solution = infos.correct_answer;
        this.wrongAnswers = infos.incorrect_answers;
        this.answers = shuffleAnswers([...this.wrongAnswers, this.solution]);
        //todo: refactoring
        this.answers = this.answers.map((answer) => ({
            value: answer,
            isSelected: false,
        }));
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