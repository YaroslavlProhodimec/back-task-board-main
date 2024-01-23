import {WithId} from "mongodb";
import {TodolistType, OutputTodolistType} from "./output";
import {OutputTaskType, TaskType} from "../task/output";

export const todolistMapper = (todo:WithId<TodolistType>):any => {
    return {
        id:todo._id.toString(),
        addedDate:todo.addedDate,
        title: todo.title,
    }
}