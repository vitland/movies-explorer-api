const { PORT = 3000 } = process.env;
let { SECRET, MONGODB } = process.env;

if (process.env.NODE_ENV !== 'production') {
  MONGODB = 'mongodb://127.0.0.1:27017/bitfilmsdb';
  SECRET = 'top-secret';
}

module.exports = { PORT, MONGODB, SECRET };
