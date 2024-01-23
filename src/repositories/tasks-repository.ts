import {ObjectId} from "mongodb";
import {OutputPostType} from "../types/post/output";
import {taskMapper} from "../types/post/mapper";
import { UpdatePostDto} from "../types/post/input";
import {taskCollection} from "../db";

export class TasksRepository {

    static async getPostById(id: string): Promise<OutputPostType | null> {
        try {
            const task: any = await taskCollection.findOne({_id: new ObjectId(id)})

            if (!task) {
                return null
            }
            return taskMapper(task)
        } catch (e) {
            return null
        }

    }


    static async deletePost(id: string) {
        try {
            const result = await taskCollection.deleteOne({_id: new ObjectId(id)})
            return result.deletedCount === 1
        } catch (e) {
            return false
        }
    }

    static async updatePost(id: string, data: UpdatePostDto) {

        let result = await taskCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: data.title,
                status:data.status
            }
        })
        return result.matchedCount === 1
    }


}

