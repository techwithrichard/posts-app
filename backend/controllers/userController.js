const bcrypt = require('bcryptjs')
const User = require('../models/User');

// CREATE USER
const createUser = async(req, res)=>{
    const {name, email, mobile, password}=req.body;
    // check if all fields are empty
    if(!name || !email || !mobile || !password){
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all fields'
        })
    }
    // check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({
            status: 'fail',
            message: 'User already exists'
        })
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const newUser = await User.create({
        name,
        email,
        mobile,
        password:  hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({
            status:'success',
            data: {
                newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
    // send response
    
}

// get all users

const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            status:'success',
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

// get single user

const getSingleUser = async(req, res)=>{
    
    try {
        const user = await User.findById(req.params.id);
        // check if user exists 
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        res.status(200).json({
            status:'success',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

// update user

const updateUser = async(req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        // check if user exists 
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        res.status(200).json({
            status:'success',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }

}
// DELETE user
const deleteUser = async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        // check if user exists 
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        res.status(200).json({
            status:'success',
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
    
    
  
}