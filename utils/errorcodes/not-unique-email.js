module.exports = class NotUniqueEmailError extends Error {
  constructor(message) {
    super(message);
    this.message = 'Пользователь с таким email уже существует';
    this.statusCode = 409;
  }
};
