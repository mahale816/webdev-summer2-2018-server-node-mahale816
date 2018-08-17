const mongoose = require('mongoose');
const schema = require('../quizzes/submission.schema.server');
const model = mongoose.model('SubmissionModel', schema);

createSubmission = (quiz, student) =>{
    let answers = [];

    quiz.questions.forEach(question => {
        switch (question.questionType) {
            case 'ESSAY':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    essayAnswer: question.essayAnswer
                });
                break;
            case 'FILL_BLANKS':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    fillBlanksAnswers: question.fillBlanksAnswers
                });
                break;
            case 'TRUE_FALSE':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    trueFalseAnswer: question.trueFalseAnswer
                });
                break;
            case 'CHOICE':
                answers.push({
                    title: question.title,
                    points: question.points,
                    description: question.description,
                    choices: question.choices,
                    blanks: question.blanks,
                    questionType: question.questionType,
                    multipleChoiceAnswer: question.multipleChoiceAnswer
                });
                break
        }
    });
    let submission = {
        quiz: quiz,
        student: student,
        submissionTime: new Date(),
        answers: answers
    };
    return model.create(submission)
}

// findAllSubmissionsForStudent = (quizId, studentId) =>
//     mongoose.find({quiz:quizId, student: studentId});

findAllSubmissionsForQuiz = quizId =>
    model.find({quiz: quizId});

findSubmissionById = (quizId, studentId) =>
    model.findOne({_id: quizId, student: studentId})
        .populate('quiz')
        .exec();

findAllSubmissionsForStudent = (qID, studentId) =>
    model.find({quiz: qID, student: studentId});

module.exports = {
    createSubmission,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    findSubmissionById
};