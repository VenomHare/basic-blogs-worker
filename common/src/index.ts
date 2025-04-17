import { z } from "zod";

export const signUpParams = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string()
})

export type signUpTypes = z.infer<typeof signUpParams>;

export const signInParams = z.object({
    email: z.string().email(),
    password: z.string()
})

export type signInTypes = z.infer<typeof signInParams>;


export const createBlogParams =  z.object({
    title: z.string(),
    content: z.string(),
})

export type createBlogTypes = z.infer<typeof createBlogParams>

export const editBlogParams = z.object({
    postId: z.string().uuid(),
    title: z.string().optional(),
    content: z.string().optional(),
    published: z.boolean().optional(),
})

export type editBlogTypes = z.infer<typeof editBlogParams>;
