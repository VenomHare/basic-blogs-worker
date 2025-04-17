import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signInParams, signUpParams } from "@sarthak00dev/mediumtypes";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { validator } from "hono/validator";

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>().basePath("/user");

userRouter.post("/signup", validator("json", (value, c) => {

    const parsed = signUpParams.safeParse(value);
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
        }).$extends(withAccelerate())


        const { email, name, password } = await c.req.json();

        if (!email || !name || !password) {

        }

        const exist = await prisma.user.findFirst({ where: { email } });

        if (exist) {
            return c.json({
                message: "Email Already Exists"
            }, 403)
        }

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password
            }
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET)

        return c.json({ token });
    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong"
        }, 500);
    }
})

userRouter.post("/signin", validator("json", (value, c) => {

    const parsed = signInParams.safeParse(value);
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
        }).$extends(withAccelerate())

        const { email, password } = await c.req.json();

        if (!email || !password) {
            return c.json({
                message: "Missing Params"
            }, 406)
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
                password
            }
        });
        if (!user) {
            return c.json({
                message: "Invalid email or password"
            }, 403)
        }
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)

        return c.json({ token });
    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Something went wrong"
        }, 500);
    }

})


export default userRouter