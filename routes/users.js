const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const validation = require('../middlewares/validation');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', validation.validateUserId, getUserById);
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validation.updateUserProfile, updateUserProfile);
usersRouter.patch('/me/avatar', validation.updateUserAvatar, updateUserAvatar);

module.exports = usersRouter;
