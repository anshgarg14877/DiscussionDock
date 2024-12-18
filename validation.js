const z = require('zod');

const signupSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

const postSchema = z.object({
    content: z.string().optional(),
    title: z.string().optional(),
    community: z.string().optional(),
    imageurl: z.string().url().optional()
});

module.exports = {
    signupSchema,
    loginSchema,
    postSchema
}