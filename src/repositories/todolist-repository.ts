import {TodolistType, OutputTodolistType} from "../types/todolist/output";
import {ObjectId, WithId} from "mongodb";
import { SortDataType, UpdateTodolistDto} from "../types/todolist/input";
import {todolistMapper} from "../types/todolist/mapper";
import {taskCollection, todolistCollection} from "../db";
import {taskMapper} from "../types/task/mapper";
import {TaskType} from "../types/task/output";


export class TodolistRepository {

    static async getAllTodolist(sortData: SortDataType) {

        const sortDirection = sortData.sortDirection ?? 'desc'
        const sortBy = sortData.sortBy ?? 'createdAt'
        const searchNameTerm = sortData.searchNameTerm ?? null
        const pageSize = sortData.pageSize ?? 10
        const pageNumber = sortData.pageNumber ?? 1

        let filter = {}

        if (searchNameTerm) {
            filter = {
                name: {
                    $regex: searchNameTerm,
                    $options: 'i'
                }
            }
        }

        const todolists: WithId<TodolistType>[] = await todolistCollection.find(filter)
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()


        return {
            items: todolists.map(todolistMapper)
        }


    }


    static async getTaskByTodolistId(todolistId: string) {

        const tasks = await taskCollection.find({todolistId: todolistId}).toArray()

        if (!tasks) {
            return null
        }
        return {
           items: tasks.map(taskMapper)
        }



    }

    static async createTaskToTodolist(todolistId: string, taskData: UpdateTodolistDto) {
        const task: TaskType = {
            title: taskData.title,
            todolistId: todolistId,
            status:0,
            addedDate: new Date(),
        }
        const res = await taskCollection.insertOne(task)
        console.log(res.insertedId.toString(),'result.insertedId.toString()')
        console.log(res.insertedId,'result.insertedId.toString()')

        return res.insertedId
    }

    static async getTodolistById(id: string): Promise<OutputTodolistType | null> {
        try {
            const blog: WithId<TodolistType> | null = await todolistCollection.findOne({_id: new ObjectId(id)})
            if (!blog) {
                return null
            }
            return todolistMapper(blog)
        } catch (err) {
            return null
        }
    }

    static async createTodolist(title: any) {

        const createdAt = new Date()
        const newTodolist: TodolistType = {
            title,
            addedDate: createdAt.toISOString(),

        }

        const result = await todolistCollection.insertOne(newTodolist)
        return result.insertedId.toString()

    }


    static async updateTodolist(id: string, data: UpdateTodolistDto | any) {

        let result:any = await todolistCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: data.title,
            }
        })
        return result.matchedCount === 1
    }

    static async deleteTodolist(id: string) {
        try {
            const result = await todolistCollection.deleteOne({_id: new ObjectId(id)})
            return result.deletedCount === 1
        } catch (e) {
            return false
        }

    }


}

