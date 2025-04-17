import { Hono } from 'hono'
import v1Router from './routes/v1'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
}>()


app.route("/", v1Router);



export default app
