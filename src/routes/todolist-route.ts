import {Router, Request, Response} from "express";
import {TodolistRepository} from "../repositories/todolist-repository";
import {todolistValidation, idParamsValidation} from "../validators/blogs-validator";
import {TodolistParams, SortDataType} from "../types/todolist/input";
import {HTTP_STATUSES} from "../utils/common";
import {RequestWithBodyAndParams, RequestWithQuery} from "../types/common";
import {TasksRepository} from "../repositories/tasks-repository";


export const todolistRoute = Router({})

todolistRoute.get('/', async (req: RequestWithQuery<SortDataType>, res: Response) => {

    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
    }

    const blogs = await TodolistRepository.getAllTodolist(sortData)
    res.status(HTTP_STATUSES.OK_200).send(blogs)

})

todolistRoute.post('/',
    todolistValidation(),
    async (req: Request, res: Response) => {
        const blogID = await TodolistRepository.createTodolist(req.body.title)
        const newTodolist = await TodolistRepository.getTodolistById(blogID)

        if (newTodolist) {
            res.status(HTTP_STATUSES.CREATED_201).json(newTodolist)
            return;
        }
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })
todolistRoute.put('/:id', todolistValidation(), idParamsValidation, async (req: Request<TodolistParams>, res: Response) => {
    const updateTitle = req.body
    const isUpdated = await TodolistRepository.updateTodolist(req.params.id, updateTitle)

    if (isUpdated) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

})
todolistRoute.delete('/:id', idParamsValidation, async (req: Request<TodolistParams>, res: Response) => {
    const isDeleted = await TodolistRepository.deleteTodolist(req.params.id)
    if (isDeleted) res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

})


todolistRoute.get('/:id/tasks',
    async (req: Request, res: Response) => {

        const id = req.params.id


        const tasks = await TodolistRepository.getTaskByTodolistId(id);

        res.status(HTTP_STATUSES.OK_200).send(tasks)
    })

todolistRoute.post('/:id/tasks',
    todolistValidation(),
    async (req: RequestWithBodyAndParams<TodolistParams, { title: string }>, res: Response) => {

        const id = req.params.id
        const {title} = req.body

        const todolist = await TodolistRepository.getTodolistById(id)

        if (!todolist) {
            res.send(404)
            return;
        }

        const createdTaskId = await TodolistRepository.createTaskToTodolist(id, {title})
        if (!todolist) {
            res.sendStatus(404)
        }

        const post = await TasksRepository.getTaskById(createdTaskId)

        if (!post) {
            res.sendStatus(404)
            return;

        }
        res.status(HTTP_STATUSES.CREATED_201
        ).send(post)
    })
todolistRoute.put('/:id/tasks/:taskId',
    todolistValidation(),
    async (req: Request<TodolistParams>, res: Response) => {
        const updateData = req.body
        const isUpdated = await TasksRepository.updateTask(req.params.taskId, updateData)

        if (isUpdated) {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
            return;
        }
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

    })

todolistRoute.delete('/:id/tasks/:taskId',
    async (req: Request, res: Response) => {
        let idDeleted = await TasksRepository.deleteTask(req.params.taskId)
        if (idDeleted) res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })


