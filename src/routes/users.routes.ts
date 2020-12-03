/* eslint-disable no-shadow */
import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticatedUser from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticatedUser,
  upload.single('avatar'),
  async (request, response) => {
    response.json({ ok: true });
  },
);
export default usersRouter;
