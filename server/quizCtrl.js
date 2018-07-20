module.exports = {
    getQuizzes: (req, res) => {
        let { id } = req.user;
        const db = req.app.get('db');
        db.get_quizes([id])
            .then(quizzes => res.status(200).send(quizzes))
            .catch(error => res.status(500).send(error))
    },
    newQuiz: (req, res) => {
        let { id } = req.user;
        let { name, info } = req.body;
        const db = req.app.get('db');
        db.add_quiz([id, name, info])
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send(err))
    },
    getQuestions: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');
        db.get_questions([id])
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send(err))
    },
    deleteQuiz: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');
        db.delete_quiz([id])
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send(err))
    },
    addQuestion: (req, res) => {
        let { id, question, answer1, answer2, answer3, answer4, correctAnswer } = req.body;
        const db = req.app.get('db');
        db.add_question([id, question, answer1, answer2, answer3, answer4, correctAnswer])
            .then(() => res.status(200).send())
            .catch(err => res.status(500).send(err))
    },
    deleteQuestion: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');
        db.delete_question([id])
            .then(() => res.status(200).send())
            .catch(err => res.status(500).send(err))
    },
    getQuestion: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');
        db.get_question([id])
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send(err))
    },
    updateQuestion: (req, res) => {
        let { id, question, answer1, answer2, answer3, answer4, correctAnswer } = req.body;
        const db = req.app.get('db');
        db.update_question([id, question, answer1, answer2, answer3, answer4, correctAnswer])
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send(err))
    },
    updateQuiz: (req, res) => {
        let { id, newName, newInfo } = req.body;
        const db = req.app.get('db');
        db.update_quiz([id, newName, newInfo])
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send(err))
    },
    getQuiz: (req, res) => {
        let { id } = req.params;
        const db = req.app.get('db');
        db.get_quiz([id])
            .then(result => res.status(200).send(result))
            .catch(err => res.status(500).send(err))
    }
}