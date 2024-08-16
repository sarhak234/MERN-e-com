const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/login');
const signupSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] // Reference to Product
});
  

module.exports=mongoose.model('signup',signupSchema)
