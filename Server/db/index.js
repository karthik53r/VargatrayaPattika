const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  number: Number,
  address: String,
  data: [{
      vargatrayam: String,
      gothram: String,
      name: String,
      rupam:String
  }]
});

const User = new mongoose.model('User', userSchema);
    
module.exports = {User}