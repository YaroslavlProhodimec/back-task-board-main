import { Db, MongoClient } from "mongodb";
import { PostDBType } from "./dto/postsDTO/PostModel";
import * as dotenv from "dotenv";
import { BlogDBType } from "./dto/blogsDTO/BlogModel";
import { UserDBType } from "./dto/usersDTO/usersDTO";
import { CommentDBType } from "./dto/commentsDTO/commentsDTO";
import { RefreshTokensBlacklistDB } from "./dto/authDTO/authDTO";
import {TodolistType} from "./types/blog/output";
import {PostType} from "./types/post/output";
dotenv.config();
export const mongoURI = process.env.MONGO_URL

export const client = new MongoClient(mongoURI as string);

const dbName = "blogs-posts";
export const dbBlogs = client.db('node-blogs')

export const todolistCollection = dbBlogs.collection<TodolistType>('todolists')
export const taskCollection = dbBlogs.collection<PostType>('task')
export const commentsCollection = dbBlogs.collection('comments')
export const usersCollection = dbBlogs.collection<any>('users')
export const refreshTokensBlacklistedCollection =
    dbBlogs.collection<RefreshTokensBlacklistDB>("refresh-tokens-blacklisted");

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
