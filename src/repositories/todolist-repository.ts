import {TodolistType, OutputBlogType} from "../types/blog/output";
import {ObjectId, WithId} from "mongodb";
import {CreateBlogDto, SortDataType} from "../types/blog/input";
import {todolistMapper} from "../types/blog/mapper";
import {taskCollection, todolistCollection} from "../db";
import {taskMapper} from "../types/post/mapper";


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

        const todolists: WithId<TodolistType>[] = await todolistCollection.find(
            // {
            filter
            // }
        )
            .sort(sortBy, sortDirection)
            .skip((+pageNumber - 1) * +pageSize)
            .limit(+pageSize)
            .toArray()

        const totalCount = await todolistCollection
            .countDocuments(filter)

        const pageCount = Math.ceil(totalCount / +pageSize)

        return {
            items: todolists.map(todolistMapper)
        }


    }


    static async getPostsByBlogId(todolistId: string, sortData: any) {

        const tasks = await taskCollection.find({todolistId: todolistId}).toArray()

        if (!tasks) {
            return null
        }
        console.log(tasks,'tasks')
        return {
           items: tasks.map(taskMapper)
        }



    }

    static async createPostToBlog(todolistId: string, taskData: any) {
        const todolist = await this.getTodolistById(todolistId)

        const task: any = {
            title: taskData.title,
            todolistId: todolistId,
            status:0,
            addedDate: new Date(),
        }
        const res = await taskCollection.insertOne(task)

        return res.insertedId
    }

    static async getTodolistById(id: string): Promise<OutputBlogType | null> {
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

    // static async getBlogById(id: string,sortData:any): Promise<any | null> {
    //     const sortDirection = sortData.sortDirection ?? 'desc'
    //     const sortBy = sortData.sortBy ?? 'createdAt'
    //     const searchNameTerm = sortData.searchNameTerm ?? null
    //     const pageSize = sortData.pageSize ?? 10
    //     const pageNumber = sortData.pageNumber ?? 1
    //
    //     let filter = {}
    //
    //     if (searchNameTerm) {
    //         filter = {
    //             name: {
    //                 $regex: searchNameTerm,
    //                 $options: 'i'
    //             }
    //         }
    //     }
    //
    //     const blogs: WithId<BlogType>[] = await blogCollection.find({filter})
    //         .sort(sortBy, sortDirection)
    //         .skip((+pageNumber - 1) * +pageSize)
    //         .limit(+pageSize)
    //         .toArray()
    //
    //     const totalCount = await blogCollection
    //         .countDocuments(filter)
    //
    //     const pageCount = Math.ceil(totalCount / +pageSize)
    //
    //     return {
    //         pagesCount:pageCount,
    //         pageNumber:pageNumber,
    //         pageSize:+pageSize,
    //         totalCount:+totalCount,
    //         items:blogs.map(blogMapper)
    //     }
    //         try {
    //             const blog: any = await blogCollection.findOne({_id: new ObjectId(id)})
    //             if (!blog) {
    //
    //                 return null
    //             }
    //             return blogMapper(blog)
    //         } catch (err) {
    //             return null
    //         }
    //
    // }
//
    static async createBlog(title: any) {

        const createdAt = new Date()
        const newTodolist: any = {
            title,
            addedDate: createdAt.toISOString(),

        }

        const result = await todolistCollection.insertOne(newTodolist)
        return result.insertedId.toString()

    }

// }


    static async updateBlog(id: string, data: any) {


        let result = await todolistCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: data.title,
                // description: data.description,
                // websiteUrl: data.websiteUrl,
            }
        })
        return result.matchedCount === 1
    }

    static async deleteBlog(id: string) {
        try {
            const result = await todolistCollection.deleteOne({_id: new ObjectId(id)})
            return result.deletedCount === 1
        } catch (e) {
            return false
        }

    }

//     static async deleteAllBlogs() {
//
//         const result = await todolistCollection.deleteMany({})
//
//         return !!result.deletedCount
//     }

}

//
// export function generateUniqueId(): string {
//     const fullUUID = uuidv4();
//     return fullUUID.slice(0, 28);
// }
//
