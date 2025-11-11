

function errorHandler(err, req, res, next) {
    const { statusCode, message, detail } = err

    res.status(statusCode ?? 500).json({
        valid: false,
        error: message,
        detail,
    })
    
}


module.exports = { errorHandler }