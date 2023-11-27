const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bookSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    available:{
        type:Boolean,
        required:true
    },
    image:{
        type:String,
        required:true,


    },
    buyingTime: {
        type: String,
      },
      returningTime: {
        type: String,
      },
      date: {
        type: Date,
      },
});

module.exports = mongoose.model("Book",bookSchema);