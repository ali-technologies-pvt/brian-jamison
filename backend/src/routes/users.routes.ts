import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';

const router = Router();

router.get('/', UsersController.getAll);
router.post('/create', UsersController.create);
router.patch('/:id/role', UsersController.updateRole);
router.delete('/:id', UsersController.delete);

export default router;
