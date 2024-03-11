const express = require('express');
const routes = require('./routes');
const process = require('process');
const cors = require('cors');

const bodyParser = require('body-parser');
//const { loading } = require('./ml');

(async () => {
  const app = express();
  const port = process.env.PORT || 8000;

  app.use(cors({ origin: ['*'] }));
  app.use(bodyParser.json());
  app.use(routes);

  app.listen(port, () => {
    console.log(process.env.PORT);
    console.log(`Server running on port http://localhost:${port}`);
  });
})();
