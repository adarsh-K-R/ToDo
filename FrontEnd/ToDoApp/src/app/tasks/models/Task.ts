export interface Task {
    id?: string,
    name: string,
    details: string,
    dueDate: string,
    priority: string,
    createdOn?: string,
    isCompleted?: boolean,
    isDeleted?: boolean,
    modifiedOn? : string,
    userId?: string
}