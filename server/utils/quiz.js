class Quiz{
    constructor(quizId){
        this.quizId = quizId
        this.name = ''
        this.info = ''
        this.pin = ()=>{return Math.floor(Math.random()*9000, 10000)}
        this.hostId = ''
        this.isLive = false
        this.currentQuestion = 0
        this.questions = []
        this.players = new Players(pin)
        this.getQuiz(quizId)
    }

    getQuiz = (req,res)=>{
        req.app.get('db')
        .get_quizes(quizId)
        .then(()=>{
            this.name = res.quiz_name;
            this.info = res.info;
            this.hostId = res.user_id
        })
    }

    getQuestions = (req,res)=>{
        req.app.get('db')
        .get_questions(quizId).then(()=>{
            this.questions = res
        })
    }


    
}

module.export = {Quiz}