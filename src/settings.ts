import cookieParser from "cookie-parser";
import express, {NextFunction, Request, Response} from "express";
import cors from 'cors';
import {httpMethodsCheckMiddleware} from "./middlewares/httpMethodsCheckMiddleware";
import morgan from "morgan";
import {StatusCodes} from "http-status-codes";
import {todolistRoute} from "./routes/todolist-route";
import {taskRoute} from "./routes/task-route";
import {testingRouter} from "./testing-router";
import {usersRouter} from "./routes/users-route";
import {commentsRoute} from "./routes/comments-route";
import {emailRouter} from "./routes/email-router";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(httpMethodsCheckMiddleware);
app.use(cookieParser());
app.use(cors());
app.use('/todo-lists', todolistRoute)
// app.use('/todo-lists', taskRoute)
app.use('/testing', testingRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRoute)
app.use('/', emailRouter)
app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(StatusCodes.NOT_FOUND);
});
