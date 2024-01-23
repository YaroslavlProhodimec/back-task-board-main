

export const taskMapper = (task: any): any => {

    return {
        id: task._id.toString(),
        status:task.status,
        title: task.title,
        addedDate: task.addedDate,
    }
}

