require('dotenv').config(); //always put this first
require('./lib/utils/connect.js')();
const app = require('./lib/app.js');


const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
