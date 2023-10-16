const answerDuplicate = async (answers) => {
    let seen = new Set()
    // Mengecek apakah setidaknya satu elemen memiliki questionId yang sama
    const result = answers.some((answer) => {
        if(seen.has(answer.questionId)){
            return true
        }
        seen.add(answer.questionId)
    })

    console.log(result)
    return result
}

module.exports = {answerDuplicate}