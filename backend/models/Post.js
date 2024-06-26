const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }, {
        timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
      