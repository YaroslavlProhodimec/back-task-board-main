import {Router,Request,Response} from "express";
import {todolistCollection, taskCollection} from "./db";
export const testingRouter = Router({})


testingRouter.delete('/all-data',async (req:Request,res:Response)=>{
    await todolistCollection.deleteMany({})
    await taskCollection.deleteMany({})
    res.sendStatus(204)
})