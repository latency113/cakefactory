import { Elysia } from 'elysia';
import { getCakes, 
    getCakeById, 
    createCake,
    updateCake
} from '../controllers/caketask.controller';

export const cakeTaskRoute = new Elysia({ prefix: '/api/v1' })
  .get('/cakes', getCakes)
  .get('/cakes/:id', getCakeById)
  .post('/cakes/:employeeId', createCake)
  .put('/cakes/:id', updateCake);