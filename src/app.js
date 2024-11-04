const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello CodeGuardian!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
