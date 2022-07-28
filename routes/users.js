const router = require('express').Router();

const {
  getUserInfo,
  updateProfile,
} = require('../controllers/users');

const {
  JoiProfileValidate,
} = require('../middlewares/joy_validators');

//  возвращает информацию о пользователе (email и имя)
router.get('/me', getUserInfo);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', JoiProfileValidate, updateProfile);

module.exports = router;
