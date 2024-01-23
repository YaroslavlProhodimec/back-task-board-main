export type  TodolistParams = {
    id:string
    taskId:string
}

export type  CreateTodolistDto = {
    title:string,
    addedDate:string,
}

export type UpdateTodolistDto = {
    title:string
}

export type SortDataType = {
    searchNameTerm?: string,
    sortBy?: string,
    sortDirection?: 'asc' | 'desc',
    pageNumber?: number,
    pageSize?: number,
}