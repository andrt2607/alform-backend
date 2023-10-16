const questionRequiredButEmpty = async (form, answers) => {
    //filter untuk mencari question yang wajib dijawab saja (required true)
    const found = form.questions.filter((question) => {
        if(question.required === true){
            //mencari answer di document ,yang id nya sesuai dengan di question di form
            const answer = answers.find((answer) => answer.questionId = question.id)
            //dianggap memang tidak mengisi data
            if(answer === undefined || answer.value == undefined || answer.value == ''){
                return true
            }
        }
    })
    console.log('questionRequiredButEmpty : ', found)
    //jika lebih dari 0 maka bermasalah
    return found.length > 0 ? true : false
}

module.exports = {questionRequiredButEmpty}