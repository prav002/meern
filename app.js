const express = require('express');
const mongoose = require('mongoose');

const router=require("./routes/book_routes");
const userRoutes = require('./routes/user_routes'); 
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use("/books",router);
app.use('/users', userRoutes); 


mongoose
  .connect(
    "mongodb+srv://admin:abmywzktAtiNSYmL@cluster0.ml9skog.mongodb.net/online?retryWrites=true&w=majority"
  )
  .then(()=>console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);

}).catch((err)=>console.log(err));
