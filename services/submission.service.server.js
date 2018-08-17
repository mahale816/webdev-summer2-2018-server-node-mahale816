module.exports = app => {
    let submissionModel = require('../models/quizzes/submission.model.server');

    submitQuiz = (req, res) => {
        let currentUser = req.session.currentUser;
        // let studentId = currentUser._id;
        submissionModel.createSubmission(req.body, currentUser)
            .then(submission => res.json(submission))
    };

    findAllSubmissionsForQuiz = (req, res) => {
        let quizId = req.params['quizId'];
        submissionModel.findAllSubmissionsForQuiz(quizId)
            .then(submission => res.json(submission))
    };

    findSubmissionById = (req, res) => {
        let submissionId = req.params['submissionId'];
        let currentUser = req.session['currentUser'];
        submissionModel.findSubmissionById(submissionId, currentUser)
            .then(submission => res.json(submission))

    };

    findAllSubmissionsForStudent = (req, res) => {
        let quizId = req.params['quizId'];
        let currentUser = req.session['currentUser'];
        submissionModel.findAllSubmissionsForStudent(quizId, currentUser)
            .then(submission => res.json(submission))
    };

    app.post('/api/quiz/:quizId/submission', submitQuiz);
    app.get('/api/course/:courseId/quiz/:quizId/submission', findAllSubmissionsForQuiz);
    app.get('/api/quiz/:quizId/submission', findAllSubmissionsForStudent);
    app.get('/api/quiz/:quizId/submission/:submissionId', findSubmissionById);
};