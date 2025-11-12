function validateSchema(schema, source='body') {
    return async (req, res, next) => {

        const isPartial = req.method == 'PUT'

        let schemaParse;
        
        if (isPartial) {
            schemaParse = await schema.partial().safeParseAsync(req[source])
        } else {
            schemaParse = await schema.safeParseAsync(req[source])
        }

        const { success, error, data } = schemaParse
        
        if (!success) {
            const err = new Error('ValidationError')
            err.detail = JSON.parse(error)
            return next(err)
        }

        req[source] = data
        return next()
    }
}



module.exports = { validateSchema }