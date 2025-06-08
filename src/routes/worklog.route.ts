import { Elysia } from 'elysia'
import { 
    getWorkLog,
    getWorkLogById,
    createWorkLog,
} from '../controllers/worklog.controller'

export const workLogRoute = new Elysia({prefix:'/api/v1'})
    .get('/worklogs',getWorkLog)
    .get('/worklog/:id',getWorkLogById)
    .post('/worklog/:taskId',createWorkLog)