const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000;
const routes = require('./routes/routes');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

<<<<<<< HEAD
app.use('/', routes);
=======
app.get('/', (req, res) => {
  res.send('Hello CodeGuardian');
});
>>>>>>> 5104cc8 (🚀 feat: adicionar configuração básica do ESLint)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
