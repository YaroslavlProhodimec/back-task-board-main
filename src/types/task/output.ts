export type OutputTaskType = {
    id:string
    title: string
    status:string,
    addedDate: string,
}
export type TaskType = {
    title: string,
    todolistId: string,
    status:string | number,
    addedDate: Date,
}