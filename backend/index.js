const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();
const cors = require('cors');
const bodyParser = require('body-parser');



const port = process.env.PORT || 4000;
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const userRoutes = require('./routes/userRoutes');

app.get('/', (req, res) => {
  res.send('Hello posts!');
});

// routes
app.use('/api/v001/users', userRoutes)

app.listen(port, () => {
  console.log('Example app listening on port : ' + port);
});