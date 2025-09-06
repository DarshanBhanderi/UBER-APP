const mongoose = require('mongoose'); 
const bcrypt =require('bcrypt');  
const jwt = require('jsonwebtoken');

const userSchema =new mongoose.Schema({
      fullname:{
        firstname:{
        type:String,
        required:true,
        minlength:[3,'first name must be atleast 3 character']

      },
      lastname:{
        type:String,
        minlength:[3,'last name must be atleast 3 character']

      }

    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'first name must be atleast 5 character']
    },
    password:{
        type:String,
        required:true,
       select :false,
    },
    socketId:{
        type:String,
    },

})

userSchema.methods.generateAuthToken= function(){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET)
    return token;
}

userSchema.method.comparePassword= async function(Password){
    return await bcrypt.compare(Password, this.password);
}

userSchema.statics.hashPassword= async function(Password){
    return await bcrypt.hash(Password, 10);
}

const userModel =mongoose.model('user',userSchema);


module.exports = userModel;
