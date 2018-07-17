class LiveQuizes{
    constructor(){
        this.quizes = [];

    }

    addQuiz(quizId,pin){

        let quiz = {
            quizId: quizId,
            title: '',
            info: '',
            pin:()=>{return Math.floor(Math.random()*9000, 10000)},
            hostId: hostId,
            isLive: false,
            currentQuestion:0,
            questions: [],
            players: new Players(pin)
        }

        this.quizes.push(quiz)
    }


    
}

module.export = {LiveQuiz}