const z = require('zod')

const schemaUser = z.object({
    name: z.string().min(3),
    email: z.email(),
    age: z.int().positive().max(100).optional()
})

module.exports = { schemaUser }