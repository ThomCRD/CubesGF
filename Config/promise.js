function cancelAwaitAfter(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('TimeOut of ${delay}ms exceeded')
        }, delay)
    })
}
module.exports = {cancelAwaitAfter}