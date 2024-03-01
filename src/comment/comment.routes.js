import {Router} from 'express'
import { test, save, update, erase } from './comment.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router();

api.get('/test', test)
api.post('/save', [validateJwt], save)
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], erase)


export default api