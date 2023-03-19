const express = require("express");
const app = express();
const product = require("./routes/product");
const auth = require("./routes/auth"); 
const errorMiddleware=require('./middlewars/error');
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", product);

app.use("/api/v1", auth);


app.use(errorMiddleware)

module.exports = { app };
