import {Router,Request,Response} from "express";
import {todolistCollection, commentsCollection, taskCollection, usersCollection} from "./db";
export const testingRouter = Router({})


testingRouter.delete('/all-data',async (req:Request,res:Response)=>{
    await todolistCollection.deleteMany({})
    await taskCollection.deleteMany({})
    await usersCollection.deleteMany({})
    await commentsCollection.deleteMany({})
    // await dbBlogs.dropDatabase()
    res.sendStatus(204)
})