const allowedCors = [
  'http://front-szh-dpl.students.nomorepartiesxyz.ru',
  'https://front-szh-dpl.students.nomorepartiesxyz.ru',
  'http://www.front-szh-dpl.students.nomorepartiesxyz.ru',
  'https://www.front-szh-dpl.students.nomorepartiesxyz.ru',
  'https://sergzhikhdev.github.io',
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
];
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    return res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
