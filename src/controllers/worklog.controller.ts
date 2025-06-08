import * as workLogService from '../services/worklog.service'
import { Context } from 'elysia'
import { WorkLog } from '@prisma/client'

export const getWorkLog = async ({set}:Context)=> {
    try {
        const WorkLog = await workLogService.getWork()
        return {
            message: "Fetch WorkLog Success",
            date : WorkLog }
    } catch (error) {
        set.status = 400
        console.log(error)
        return { message : 'Fetch Worklog Error', error}
    }
}

export const getWorkLogById = async ({set}:Context, params: {id : string }) => {
    try {
        const { id } = params
        const WorkLog = await workLogService.getWork()
        if(!WorkLog) {
            return {
                message : "Worklog Not Found",
                data : null
            }
        }
        return {
            message: "Fetch WorkLog Success",
            date : WorkLog 
        }
    } catch (error) {
        set.status = 400
        console.log(error)
        return { message : 'Fetch Worklog Error', error}
    }
}

export const createWorkLog = async ({ body, set, params }: Context<{ params: { taskId: string } }>) => {
    try {
        const { taskId } = params
        const { action } = body as Partial<WorkLog>
        if(!action){
            set.status = 400
            return { message: "action is required" }
        }

        const timestamp = new Date()
        const newWorkLog = await workLogService.createWork({
            action,
            taskId,
            timestamp
        })
        return {
            message: "Worklog created successfully",
            data : newWorkLog
        }
    } catch (error) {
        set.status = 400
        console.log(error)
        return { message: "Failed to create NewWorkLog"}
    }
}