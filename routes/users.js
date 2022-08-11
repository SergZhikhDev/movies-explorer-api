const router = require('express').Router();

const {
  getUserInfo,
  updateProfile,
} = require('../controllers/users');

const {
  JoiProfileValidate,
} = require('../middlewares/joy_validators');

router.get('/me', getUserInfo);

router.patch('/me', JoiProfileValidate, updateProfile);

module.exports = router;
