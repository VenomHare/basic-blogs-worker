import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createMiddleware } from "hono/factory"
import { verify } from "hono/jwt";

const Auth = createMiddleware(async (c, next) => {
    try {

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const authorization = c.req.header("Authorization");
        const token = authorization?.split(" ")[1];
        if (!token) {
            return c.json({
                message: "Unauthorized"
            }, 401)
        }
        try {
            const data = await verify(token, c.env.JWT_SECRET);

            const user = await prisma.user.findUnique({ where: { id: data.id as string } });

            if (!user) {
                return c.json({
                    message: "Unauthorized"
                }, 401)
            }
            c.set("userId", user.id);
            await next();

        }
        catch {
            return c.json({
                message: "Unauthorized"
            }, 401)
        }
    }
    catch (err) {
        console.log(err);
        return c.json({
            message: "Unauthorized"
        }, 401);
    }
})
export default Auth