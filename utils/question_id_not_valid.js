const questionIdNotValid = async (form, answers) => {
    const found = answers.filter((answer) => {
        let question = form.questions.some((question) => question.id == answer.questionId)

        if(question === false){
            return true
        }
    })
    console.log('ini isi found check question id : ', found )
    return found.length > 0 ? found[0].questionid : false
}

module.exports = {questionIdNotValid}