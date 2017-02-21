module.exports = {
    doneErrorHandler: (error, done, message) => {
        if (error) {
            console.log(message);
            console.log(error);
            done(error);
        }
    }
}