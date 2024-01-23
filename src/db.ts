import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import {TodolistType} from "./types/todolist/output";
import {TaskType} from "./types/task/output";
dotenv.config();
export const mongoURI = process.env.MONGO_URL

export const client = new MongoClient(mongoURI as string);

export const dbBlogs = client.db('node-blogs')

export const todolistCollection = dbBlogs.collection<TodolistType>('todolists')
export const taskCollection = dbBlogs.collection<TaskType>('task')


export const runDB = async () => {
    try {
        await client.connect();
        console.log("Connected successfully to mongo server");
        await dbBlogs.command({ ping: 1 });
        console.log("Client connected");
    } catch (e) {
        console.log("Can't connect to DB: ", e);
        await client.close();
    }
};
