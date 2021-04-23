const dotenv = require('dotenv');
const server = require('./server.js');

const PORT = process.env.PORT || 4040;

require('./services/database.js').startDB();

if (process.env.NODE_ENV === 'test') {
  dotenv.config();
}

server.listen(PORT, () => {
  console.log('Started server at', PORT);
});
