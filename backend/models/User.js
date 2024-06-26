const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role :{
        type:String,
        required:true,
        enum:['user','admin'],
        default:'user',
    },
    
},{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('User', userSchema);