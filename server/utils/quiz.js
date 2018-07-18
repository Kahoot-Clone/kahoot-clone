class Quiz{
    constructor(quiz, app){
        this.quizId = quiz.id
        this.name = quiz.quiz_name
        this.info = quiz.info
        this.pin =  Math.floor(Math.random()*9000, 10000)
        this.hostId = ''
        this.isLive = false
        this.currentQuestion = 0
        this.questions = []
        this.players = []
        this.getQuestions(app)
    }

    // getQuiz (req,res){
    //     req.app.get('db')
    //     .get_quizes([quiz.id)
    //     .then(()=>{
    //         this.name = res.quiz_name;
    //         this.info = res.info;
    //         this.hostId = res.user_id
    //     })
    // }

   getQuestions(app){
        app.get('db')
        .get_questions(this.quizId).then((res)=>{
            this.questions = res
        })
    }


    
}

module.exports = {Quiz}