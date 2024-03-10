const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
//const { loading } = require('./ml');

let model;
(async () => {
  const app = express();
  const port = 8000;

  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.use(cors({ origin: ['*'] }));
  app.use(bodyParser.json());
  app.use(routes);

  app.set('layout', 'partials/main-layout');

  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });
})();

module.exports = model;
