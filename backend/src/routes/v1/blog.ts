import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogParams, editBlogParams } from "@sarthak00dev/mediumtypes";
import { Hono } from "hono";
import { validator } from "hono/validator";

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>().basePath("/blog");


blogRouter.post("/", validator("json", (value, c) => {

    const parsed = createBlogParams.safeParse(value);
    if (!parsed.success) {
        return c.json({
            message: "Incorrect Params"
        }, 406)
    }
    return parsed.data

}), async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const userId = c.get("userId");
        const { title, content } = await c.req.json();

        if (!title || !content) {
            return c.json({
                message: "Missing Params"
            }, 403)
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: userId
            }
        });

        return c.json({ postId: post.id, message: "New Post Created" });

    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong"
        }, 500);
    }
})

blogRouter.put("/", validator("json", (value, c) => {

    const parsed = editBlogParams.safeParse(value);
    if (!parsed.success) {
        return c.json({
            message: "Incorrect Params"
        }, 406)
    }
    return parsed.data

}), async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const userId = c.get("userId");
        const { postId, title, content, published } = await c.req.json();

        if (!postId) {
            return c.json({
                message: "Missing Params"
            }, 403)
        }

        const post = await prisma.post.update({
            where: {
                id: postId,
                authorId: userId
            },
            data: {
                title,
                content,
                published
            }
        });


        if (!post) {
            return c.json({ message: `Post Not Found` })
        }
        return c.json({ postId: post.id, message: "Post Updated" });

    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong"
        }, 500);
    }
})


blogRouter.get("/bulk", async (c) => {
    try {

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const posts = await prisma.post.findMany({include:{author:true}});

        return c.json(posts);
    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong"
        }, 500)
    }

})


blogRouter.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const userId = c.get("userId");

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: true
            }
        });
        

        if (!post) {
            return c.json({ message: "Post Not Found" }, 404);
        }

        return c.json({ post , isOwned: userId == post.authorId});
    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong"
        }, 500)
    }
})

export default blogRouter 