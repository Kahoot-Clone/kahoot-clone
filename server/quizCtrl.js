module.exports = {
    getQuizzes: (req, res) => {
        let {id} = req.params;
        const db = req.app.get('db');
        db.get_quizes([id])
        .then(quizzes => res.status(200).send(quizzes))
        .catch(error => res.status(500).send(error))
    }
}