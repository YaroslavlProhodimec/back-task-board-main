import {Router, Request, Response} from "express";
import {TasksRepository} from "../repositories/tasks-repository";
import {BlogParams} from "../types/blog/input";
import {postValidation} from "../validators/post-validator";
import {accessTokenValidityMiddleware, authMiddleware} from "../middlewares/auth/auth-middleware";
import {HTTP_STATUSES} from "../utils/common";
import {commentsValidation} from "../validators/comments-validator";
import {CommentsRepository} from "../repositories/comments-repository";


export const taskRoute = Router({})
// taskRoute.get('/', async (req: Request, res: Response) => {
//     const sortData = {
//         searchNameTerm: req.query.searchNameTerm,
//         sortBy: req.query.sortBy,
//         sortDirection: req.query.sortDirection,
//         pageNumber: req.query.pageNumber,
//         pageSize: req.query.pageSize,
//     }
//
//     const posts = await PostRepository.getAllPostsQueryParam(sortData)
//     res.status(HTTP_STATUSES.OK_200).json(posts)
// })
// taskRoute.get('/:id', async (req: Request<BlogParams>, res: Response) => {
//
//     const post = await PostRepository.getPostById(req.params.id)
//
//     if (post) {
//         res.status(HTTP_STATUSES.OK_200).json(post)
//         return;
//     } else {
//         res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
//     }
// })
// taskRoute.post('/', authMiddleware, postValidation(), async (req: Request, res: Response) => {
//     const creatData = req.body
//     const postID = await PostRepository.createPost(creatData)
//     if (postID) {
//         const newPost = await PostRepository.getPostById(postID)
//         if (newPost) {
//             res.status(HTTP_STATUSES.CREATED_201).json(newPost)
//             return;
//         }
//     }
//     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
// })

// taskRoute.put('/:id', authMiddleware, postValidation(), async (req: Request<BlogParams>, res: Response) => {
//     const updateData = req.body
//     const isUpdated = await PostRepository.updatePost(req.params.id, updateData)
//     if (isUpdated) {
//         res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
//         return;
//     }
//     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
// })

// taskRoute.delete('/:id', authMiddleware, async (req: Request<BlogParams>, res: Response) => {
//
//     let idDeleted = await PostRepository.deletePost(req.params.id)
//     if (idDeleted) res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
//     else res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
// })


// taskRoute.post('/:todolistId/tasks',
//     async (req: any, res: Response) => {
//         const content = req.body.content
//         const postId  = req.params.postId
//
//         const post = await TasksRepository.getPostById(todolistId)
//         if(!post){
//             res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
//             return;
//         }
//         const newComment = await CommentsRepository.createComments(content, req.userId,postId)
//
//         if (newComment) {
//             res.status(HTTP_STATUSES.CREATED_201).json(newComment)
//             return;
//         }
//
//         res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
//     })

// taskRoute.get('/:postId/comments',
//     // commentsValidation(),
//     // commentsIdValidation(),
//     async (req: any, res: Response) => {
//         const sortData = {
//             searchNameTerm: req.query.searchNameTerm,
//             sortBy: req.query.sortBy,
//             sortDirection: req.query.sortDirection,
//             pageNumber: req.query.pageNumber,
//             pageSize: req.query.pageSize,
//         }
//         const postId  = req.params.postId
//         const post = await PostRepository.getPostById(postId)
//         if(!post){
//             res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
//             return;
//         }
//
//         const comments = await CommentsRepository.getAllCommentsQueryParam(sortData,postId)
//
//         if (comments) {
//             res.status(HTTP_STATUSES.OK_200).json(comments)
//             return;
//         }
//         res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
//     })
//




