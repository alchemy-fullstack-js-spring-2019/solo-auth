require('dotenv').config();
const connect = require('./lib/utils/connect')();
const app = require('./lib/app');

connect('mongodb://localhost:27017/auth');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`LISTENING on ${PORT}`);
});
