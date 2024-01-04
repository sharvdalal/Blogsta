const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router()


const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const verifyToken = require('../middleware/verifyToken.js');


//Create
router.post('/create', verifyToken , async(req,res) => {
    
    try {

        const newPost = new Post(req.body);
        const savePost = await newPost.save();
        res.status(200).json(savePost)
        
    } catch (error) {
        res.status(404).json(error)
    }
})

//Update
router.put('/:id',verifyToken, async(req,res)=>{
        try {

            const UpdatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
            res.status(200).json(UpdatedPost)

        } catch (error) {
            console.log(error);
        }
})



//Delete

router.delete('/:id',verifyToken, async(req,res) => {
    try {

        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})

        res.status(200).json("Post has been Deleted");

        
    } catch (error) {
        console.log(error);
        
    }
})  


//Get Post Details

router.get('/:id', async(req,res) => {
    try {

        const post = await Post.findById(req.params.id)     
        res.status(200).json(post);

        
    } catch (error) {
        console.log(error);
        
    }
})  



//Get All Posts

router.get('/', async(req,res) => {
    const query = req.query

    try {
        const searchFilter = {
            title:{$regex: query.search, $options: "i"}
        }

        const posts = await Post.find(query.search?searchFilter: null);     
        res.status(200).json(posts);

        
    } catch (error) {
        console.log(error);
        
    }
})  


//Get User All Posts

router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//SEARCH POSTS







module.exports = router