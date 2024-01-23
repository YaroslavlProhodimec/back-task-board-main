import {ObjectId, WithId} from "mongodb";
import {OutputTaskType, TaskType} from "../types/task/output";
import {taskMapper} from "../types/task/mapper";
import { UpdatePostDto} from "../types/task/input";
import {taskCollection} from "../db";

export class TasksRepository {

    static async getTaskById(id: ObjectId): Promise<OutputTaskType | null> {
        try {
            const task:WithId<TaskType> | null  = await taskCollection.findOne({_id: new ObjectId(id)})

            if (!task) {
                return null
            }
            return taskMapper(task)
        } catch (e) {
            return null
        }

    }


    static async deleteTask(id: string) {
        try {
            const result = await taskCollection.deleteOne({_id: new ObjectId(id)})
            return result.deletedCount === 1
        } catch (e) {
            return false
        }
    }

    static async updateTask(id: string, data: UpdatePostDto) {

        let result = await taskCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: data.title,
                status:data.status
            }
        })
        return result.matchedCount === 1
    }


}

