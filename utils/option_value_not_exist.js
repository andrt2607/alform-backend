//ada code yang salah
const optionValueNotExist = async (form, answers) => {
    const found = form.questions.filter((question) => {
        if (question.type == 'radio' || question.type == 'dropdown') {
            //looping dimulai dari data terakhir
            const answer = answers.find((answer) => answer.questionId == question.id)
            console.log('ini question.id : ', question.id)
            // console.log('ini questionId dr answer : ', answer.questionId )

            console.log('ini answer yg dicari : ', question.id, answer)
            if (answer) {
                const targetOption = question.options.find((option) => option.value == answer.value)
                console.log('ini option : ', targetOption)
                if (targetOption === undefined) {
                    return true
                }
            }
        } else if (question.type == 'checkbox') {
            const answer = answers.find((answer) => answer.questionId == question.id)
            if (answer) {
                return answer.value.some((value) => {
                    const targetOption = question.options.find((option) => option.value == value)
                    if (targetOption == undefined) {
                        return true
                    }
                })
            }
        }
    })
    //  return true
    return found.length > 0 ? found[0].question : false
}

module.exports = { optionValueNotExist }