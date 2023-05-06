const router = require('express').Router();

const { 
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController');

router.route('/').get(getUsers).post().put().delete();

module.exports = router;