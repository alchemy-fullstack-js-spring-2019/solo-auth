require('dotenv').config();
const app = require('./lib/app'),
  connect = require('./lib/utils/connect');

connect();

const PORT = process.env.PORT || 2309;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}.`);
});
