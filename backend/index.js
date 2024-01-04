const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv =  require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


//Router
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/users.js');
const postRouter = require('./routes/posts.js');
const commentRouter = require('./routes/comments.js');


//middleware
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use("/api/auth", authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

//Image Upload
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null, "images");
    },
    filename:(req,file,fn)=>{
        fn(null, req.body.img);
    }
})

const upload=multer({storage:storage})
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("Image has been uploaded Successfully")
})


 const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.log(error);
    }
 }





app.listen(process.env.PORT, ()=>{
    connectDb();
    console.log(`Server started on port ${process.env.PORT} `);
});