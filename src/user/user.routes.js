import {Router} from 'express'
import { test, register, login, update } from './user.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

//rutas publicas
api.get('/test', test)
api.post('/register', register)
api.post('/login', login)

//rutas privadas
api.put('/update/:id', [validateJwt], update)

export default api