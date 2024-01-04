const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router()

//Models
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const verifyToken = require('../middleware/verifyToken.js');

//Verification Middleware




//Update
router.put('/:id', verifyToken, async(req,res)=>{
        try {

            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hashSync(req.body.password, salt);

            }
            const UpdatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
            res.status(200).json(UpdatedUser)

        } catch (error) {
            console.log(error);
        }
})



//Delete

router.delete('/:id',verifyToken, async(req,res) => {
    try {

        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId: req.params.id});
        await Comment.deleteMany({userId: req.params.id});

        res.status(200).json("User has been Deleted");

        
    } catch (error) {
        console.log(error);
        
    }
})  


//Get User

router.get('/:id', async(req,res) => {
    try {

        const user = await User.findById(req.params.id)

        const {password, ...info} = user._doc;

        res.status(200).json(info);

        
    } catch (error) {
        console.log(error);
        
    }
})  






module.exports = router