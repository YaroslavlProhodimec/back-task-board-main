import {WithId} from "mongodb";
import {TodolistType, OutputBlogType} from "./output";
import {OutputPostType, PostType} from "../post/output";

export const todolistMapper = (todo:WithId<TodolistType>):any => {
    return {
        id:todo._id.toString(),
        addedDate:todo.addedDate,
        title: todo.title,
    }
}