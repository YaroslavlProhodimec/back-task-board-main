// @ts-ignore
import request from "supertest";
import {app} from "../src/settings";
import {StatusCodes} from "http-status-codes";
import {expect, test} from "@jest/globals";

describe("API for auth", () => {
    beforeAll(async () => {
        await request(app).delete("/testing/all-data");
    });
    it("create new todolist", async () => {
        const newTodolist = {
            title: "exam",
        };
        const createdTodo = await request(app)
            .post("/todo-lists")
            // .set("Authorization", `Basic ${correctAuthToken}`)
            .send(newTodolist)
            .expect(StatusCodes.CREATED);
        expect(createdTodo.body).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            addedDate: expect.any(String),
        });
        const updateTitle = {
            title: "updateTitle",
        };
        const updateTodo = await request(app)
            .put(`/todo-lists/${createdTodo.body.id}`)
            .send(updateTitle)
            .expect(StatusCodes.NO_CONTENT);


        const deleteTodo = await request(app)
            .delete(`/todo-lists/${createdTodo.body.id}`)
            .send(updateTitle)
            .expect(StatusCodes.NO_CONTENT);


    });
    it("Create todolist and after create task after get and update and delete", async () => {
        const newTodolist = {
            title: "exam",
        };
        const createdTodo = await request(app)
            .post("/todo-lists")
            .send(newTodolist)
            .expect(StatusCodes.CREATED);
        expect(createdTodo.body).toEqual({
            id: expect.any(String),
            title: expect.any(String),
            addedDate: expect.any(String),
        });
        const createTitleTask = {
            title: "createTitleTask",
            status:0
        };
        const createTasks = await request(app)
            .post(`/todo-lists/${createdTodo.body.id}/tasks`)
            .send(createTitleTask)
            .expect(StatusCodes.CREATED);

        const getTasks = await request(app)
            .get(`/todo-lists/${createdTodo.body.id}/tasks`)
            .expect(StatusCodes.OK);

        const updateTitleTask = {
            title: "updateTitleTask",
            status:1
        };
        const putTasks = await request(app)
            .put(`/todo-lists/${createdTodo.body.id}/tasks/${createTasks.body.id}`)
            .send(updateTitleTask)
            .expect(StatusCodes.NO_CONTENT);

        // DELETE METHOD
        // const deleteTasks = await request(app)
        //     .delete(`/todo-lists/${createdTodo.body.id}/tasks/${createTasks.body.id}`)
        //     .expect(StatusCodes.NO_CONTENT);

    });


});
