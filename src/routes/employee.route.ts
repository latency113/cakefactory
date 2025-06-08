import { Elysia } from 'elysia';
import { getEmployees 
    , getEmployeeById,
    createEmployee
} from '../controllers/employee.controller';

export const employeeRoute = new Elysia({prefix:'/api/v1'})
  .get('/employees', getEmployees,)
  .get('/employees/:id',getEmployeeById)
  .post('/employees', createEmployee)
