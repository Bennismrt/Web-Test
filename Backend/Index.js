const express = require ('express');
const dotenv = require ('dotenv');
const connect = require ('./Database/config');
const cookieParser = require ('cookie-parser');
const cors = require ('cors');
const morgan = require ('morgan');
const router = require ('./Routes/routes');

dotenv.config ();
const app = express ();

app.use (express.json ());
app.use (cookieParser ());

//logger
app.use (morgan ('tiny'));

//cors
app.use (cors ({credentials: true, origin: process.env.CORS}));

//router
app.use (router);

//setup mongoose
connect ();

app.listen (process.env.PORT, err => {
  if (err) return;
  console.log (`Server is running on http://localhost:${process.env.PORT}`);
});
