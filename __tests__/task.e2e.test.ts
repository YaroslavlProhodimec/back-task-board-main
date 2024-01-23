// // @ts-ignore
// import request from "supertest";
// import {app} from "../src/settings";
// import {StatusCodes} from "http-status-codes";
// import {expect, test} from "@jest/globals";
//
// const correctAuthToken = "YWRtaW46cXdlcnR5";
// const incorrectAuthToken = "YWRtaW46c864XdlcnR5=5";
//
// describe("API for auth", () => {
//     beforeAll(async () => {
//         await request(app).delete("/testing/all-data");
//     });
//     it("create new task", async () => {
//
//         const updateTitle = {
//             title: "updateTitle",
//         };
//         const updateTodo = await request(app)
//             .put(`/todo-lists/${createdTodo.body.id}`)
//             .send(updateTitle)
//             .expect(StatusCodes.NO_CONTENT);
//
//         // console.log(updateTodo,'updateTodo')
//
//         const deleteTodo = await request(app)
//             .delete(`/todo-lists/${createdTodo.body.id}`)
//             .send(updateTitle)
//             .expect(StatusCodes.NO_CONTENT);
//
//     });
//     it("User SHOULDN'T be logged in to the system", async () => {
//         const userCredentials = {
//             login: "alex4",
//             password: "string",
//             email: "yar.muratowww@gmail.com",
//         };
//         const createdUser = await request(app)
//             .post("/users")
//             .set("Authorization", `Basic ${correctAuthToken}`)
//             .send(userCredentials)
//             .expect(StatusCodes.CREATED);
//         expect(createdUser.body).toEqual({
//             id: expect.any(String),
//             login: "alex4",
//             email: "yar.muratowww@gmail.com",
//             createdAt: expect.any(String),
//         });
//
//     });
//
//
//
// });
