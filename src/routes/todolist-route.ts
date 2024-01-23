import {Router, Request, Response} from "express";
import {TodolistRepository} from "../repositories/todolist-repository";
import {todolistValidation, idParamsValidation} from "../validators/blogs-validator";
import {BlogParams, SortDataType} from "../types/blog/input";
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


todolistRoute.get('/:id/tasks',
    // idParamsValidation,
    async (req: Request, res: Response) => {

        const id = req.params.id

        const sortData = {
            sortBy: req.query.sortBy,
            sortDirection: req.query.sortDirection,
            pageNumber: req.query.pageNumber,
            pageSize: req.query.pageSize,
        }


        const posts = await TodolistRepository.getPostsByBlogId(id, sortData);

        res.status(HTTP_STATUSES.OK_200).send(posts)
    })
todolistRoute.delete('/:id/tasks/:taskId',
    async (req: Request, res: Response) => {
        let idDeleted = await TasksRepository.deletePost(req.params.taskId)
        if (idDeleted) res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })
todolistRoute.post('/',
    todolistValidation(),
    async (req: Request, res: Response) => {
        console.log(req, 'req')
        const blogID = await TodolistRepository.createBlog(req.body.title)
        const newBlog = await TodolistRepository.getTodolistById(blogID)

        if (newBlog) {
            res.status(HTTP_STATUSES.CREATED_201).json(newBlog)
            return;
        }
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    })

todolistRoute.post('/:id/tasks',
    todolistValidation(),
    async (req: RequestWithBodyAndParams<BlogParams, { title: string }>, res: Response) => {

        const id = req.params.id
        const {title} = req.body

        const todolist = await TodolistRepository.getTodolistById(id)

        if (!todolist) {
            res.send(404)
            return;
        }

        const createdPostId = await TodolistRepository.createPostToBlog(id, {title})
        if (!todolist) {
            res.sendStatus(404)
        }

        const post = await TasksRepository.getPostById(createdPostId)

        if (!post) {
            res.sendStatus(404)
            return;

        }
        res.status(HTTP_STATUSES.CREATED_201
        ).send(post)
    })

todolistRoute.delete('/:id', idParamsValidation, async (req: Request<BlogParams>, res: Response) => {
    const isDeleted = await TodolistRepository.deleteBlog(req.params.id)
    if (isDeleted) res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

})
//
todolistRoute.put('/:id', todolistValidation(), idParamsValidation, async (req: Request<BlogParams>, res: Response) => {
    const updateDate = req.body
    const isUpdated = await TodolistRepository.updateBlog(req.params.id, updateDate)

    if (isUpdated) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

})

todolistRoute.put('/:id/tasks/:taskId',
    todolistValidation(),
    async (req: Request<BlogParams>, res: Response) => {
    const updateDate = req.body
    const isUpdated = await TasksRepository.updatePost(req.params.taskId, updateDate)

    if (isUpdated) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)

})


