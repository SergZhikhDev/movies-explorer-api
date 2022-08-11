const validate = require('mongoose-validator');

module.exports.userEmailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Не верный формат электронной почты',
  }),
];

module.exports.userPasswordValidator = [
  validate({
    validator: 'isLength',
    arguments: [1],
    select: false,
    message: 'Поле "password" должно содержать не менее {ARGS[0]} символов',
  }),
];

module.exports.userNameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 30],
    message: 'Поле "name" должно содержать от {ARGS[0]} до {ARGS[1]} символов',
  }),
];

module.exports.posterLinkValidator = [
  validate({
    validator: 'isURL',
    protocols: true,
    require_valid_protocol: true,
    validate_length: true,
    message: 'Поле "image" должно содержать URL-ссылку',
  }),
];

module.exports.trailerLinkValidator = [
  validate({
    validator: 'isURL',
    protocols: true,
    require_valid_protocol: true,
    validate_length: true,
    message: 'Поле "image" должно содержать URL-ссылку',
  }),
];

module.exports.thumbnailLinkValidator = [
  validate({
    validator: 'isURL',
    protocols: true,
    require_valid_protocol: true,
    validate_length: true,
    message: 'Поле "image" должно содержать URL-ссылку',
  }),
];
