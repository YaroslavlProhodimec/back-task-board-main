import {body, param} from 'express-validator';
import {inputModelValidation} from "../middlewares/input-model-validation/input-model-validation";

export const idParamsValidation = param('id').exists().withMessage('Incorrect id')

export const titleValidation = body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('Incorrect title')



export const todolistValidation = () => [   titleValidation, inputModelValidation]