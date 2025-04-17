import { Hono } from "hono";
import userRouter from "./user";
import blogRouter from "./blog";
import Auth from "../../middleware/auth";

const v1Router = new Hono().basePath("/api/v1");
v1Router.use("/blog/*",Auth);
v1Router.route("/",userRouter);
v1Router.route("/",blogRouter);

export default v1Router