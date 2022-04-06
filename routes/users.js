const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const {
  UserProfileSchema,
  UserAvatarSchema,
  UserIdSchema,
} = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', celebrate(UserIdSchema), getUserById);
usersRouter.patch('/me', celebrate(UserProfileSchema), updateUserProfile);
usersRouter.patch('/me/avatar', celebrate(UserAvatarSchema), updateUserAvatar);

module.exports = usersRouter;
