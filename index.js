require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cockieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();

app.use(express.json());
app.use(cockieParser());
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
      app.listen( PORT, () => console.log(`Servert started on port = ${PORT}`))

   } catch (err) {
      console.log(err);
   }
}

start();