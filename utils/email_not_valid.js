const emailNotValid = async  (form, answers) => {
    // const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // return !regexEmail.test(email)
    const found = form.questions.filter((question) => {
        if(question.type == 'email'){
            console.log('sudah masuk check email not valid');
            const answer = answers.find((answer) => answer.questionId == question.id)

            if(question.required === false){
                if(answer === undefined || answer.value === undefined || answer.value === null || answer.value === ''){
                    return false
                }
            }

            if(answer){
                const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                console.log('answer value : ', answer.value);
                if(regexEmail.test(answer.value) === false){
                    console.log('masuk false test');
                    return true
                }
            }
        }
    })
    console.log('ini isi found : ', found )
    return found.length > 0 ? true : false
}

module.exports = {emailNotValid}