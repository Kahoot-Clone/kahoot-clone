class Quizes{
    constructor(){
        this.quizes = [];
    }
    addQuiz(hostId){
        let quiz = {
            pin:()=>{return Math.floor(Math.random()*9000, 10000)},
            hostId: hostId,
            isLive: false,
            currentQuestion:0,
            questions: [],
            players: []
        }
        this.quizes.push()
    }
    getQuestions(){

    }
    

}

module.export = {LiveQuiz}