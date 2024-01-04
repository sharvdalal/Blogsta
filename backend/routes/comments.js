const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router()


const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const verifyToken = require('../middleware/verifyToken.js');


//Create
router.post('/create',verifyToken, async(req,res) => {
    
    try {

        const newComment = new Comment(req.body);
        const saveComment = await newComment.save();
        res.status(200).json(saveComment)
        
    } catch (error) {
        res.status(404).json(error)
    }
})

//Update
router.put('/:id',verifyToken, async(req,res)=>{
        try {

            const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
            res.status(200).json(updatedComment)

        } catch (error) {
            console.log(error);
        }
})



//Delete

router.delete('/:id',verifyToken, async(req,res) => {
    try {

        await Comment.findByIdAndDelete(req.params.id)

        res.status(200).json("Comment has been Deleted");

        
    } catch (error) {
        console.log(error);
        
    }
})  









//Get Post Comments

router.get("/post/:postId",async (req,res)=>{
    try{
        const Comments=await Comment.find({postId:req.params.postId})
        res.status(200).json(Comments)
    }
    catch(err){
        res.status(500).json(err)
    }
})





module.exports = router