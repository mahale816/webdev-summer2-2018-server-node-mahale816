module.exports = app => {

    const quizModel = require('../models/quizzes/quiz.model.server');

    createQuiz = (req, res) => {
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz))
    };

    findAllQuizzes = (req, res) => {
        quizModel.findAllQuizzes()
            .then(quizzes => res.send(quizzes))
    };

    findQuizzesforCourse = (req,res) => {
        quizModel.findQuizzesforCourse(req.params.courseId)
            .then(quizzes => res.send(quizzes))
    }

    findQuizById = (req, res) => {
        quizModel.findQuizById(req.params.qid)
            .then(quiz => res.send(quiz))
    };

    updateQuiz = (req, res) => {
        quizModel.updateQuiz(req.params.qid, req.body)
            .then(status => res.send(status))
    };

    deleteQuiz = (req, res) => {
        quizModel.deleteQuiz(req.params.qid)
            .then(status => res.send(status))
    };

    addQuestion = (req, res) => {
        quizModel
            .addQuestion(req.params.qid, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    };

    app.post('/api/course/:courseId/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.get('/api/course/:courseId/quiz', findQuizzesforCourse)
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
    app.put('/api/quiz/:qid/question/:questionId', addQuestion);

};