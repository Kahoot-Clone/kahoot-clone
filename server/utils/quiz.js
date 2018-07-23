class Quiz{
    constructor(quiz, app){
        this.quizId = quiz.id;
        this.name = quiz.quiz_name;
        this.info = quiz.info;
        this.timer = 30;
        this.isLive = false;
        this.currentQuestion = 0;
        this.questions = [];

        // SAMPLE PLAYERS ARR [{id: 0, name: 'will', score: [1,4,60], qAnswered: false}, 
        //                     {id: 1, name: 'bill', score: [1,3,40], qAnswered: true}]
        this.players = [];
        this.playerCounter = 0;

        this.getQuestions(app);
      }
/////Will reset eveything and start the counter
    nextQuestion(){
        this.timer = 30;
        ++this.currentQuestion;
        this.players.forEach(player=>{player.qAnswered = false})
        timeCheck = timeCheck.bind(this)

        let timeKeeper = setInterval(()=>{timeCheck()}, 1000);
         function timeCheck(){
            let checkAnswers = ()=>{
                this.players.forEach(player => {
                    player.qAnswered
                        ? player.score.push(this.timer*10 +1000)
                        : null
                });
                this.timer-=1
            }
            return this.timer > 0 
                ? checkAnswers()
                : clearInterval(timeKeeper)
        }
    }

    addPlayer (name){
        let player = {
            id: this.playerCounter,
            name: name,
            score: [],
            qAnswered: false
        }
        this.players.push(player)
        return this.playerCounter++
    }
    submitAnswer(playerId, answer){
        this.questions.correctanswer[this.currentQuestion-1] === answer
            ? this.players[playerId].qAnswered = true
            : null
    }
    totalScore(playerId){
        return this.players[playerId].reduce((a,b)=>a+b);
    }
    currentQuestionScore(playerId){
        return this.players[playerId].score[this.score.length-1]
    }
    
    
    getQuestions(app){
        app.get('db')
        .get_questions(this.quizId).then((res)=>{
            this.questions = res
        })
    }
    
    
}
module.exports = {Quiz}