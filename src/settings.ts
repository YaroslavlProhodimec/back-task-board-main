import cookieParser from "cookie-parser";
import express, {NextFunction, Request, Response} from "express";
import cors from 'cors';
import morgan from "morgan";
import {StatusCodes} from "http-status-codes";
import {todolistRoute} from "./routes/todolist-route";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());
app.use('/todo-lists', todolistRoute)
app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(StatusCodes.NOT_FOUND);
});
