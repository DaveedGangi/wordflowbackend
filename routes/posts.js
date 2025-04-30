const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");

const uploadToCloud=require("../utils/uploadToCloud");

const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const storage = multer.memoryStorage();
const upload = multer({ storage });


const fileUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]);

const router = express.Router();


//add a post 

router.post("/", auth,fileUpload, async (req, res) => {
  const { title, content,  status } = req.body;



  const imageFile = req.files?.image?.[0];
  const videoFile = req.files?.video?.[0];

  let mediaUrl = null;

  if (imageFile) {
    mediaUrl = await uploadToCloud(imageFile, 'image');
  } else if (videoFile) {
    mediaUrl = await uploadToCloud(videoFile, 'video');
  }

  // Upload to Cloudinary/S3 and get imageURL
  
  const post = new Post({ title, content, media:mediaUrl,mediaType:imageFile?"image":"video", status, author: req.user.userId });
  await post.save();
  res.status(201).json(post);
});


// get all posts 
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.json(posts);
});



//get user posts
router.get("/user",auth,async(req,res)=>{
  const posts=await Post.find({author:req.user.userId}).populate("author","username");
  res.json(posts);
})

// get particular post 
router.get("/:postId",auth,async(req,res)=>{
  const{postId}=req.params
  const post=await Post.findById(postId).populate("author","username");
  res.json(post);
})



// update post 
router.put("/:id", auth, fileUpload, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      if (post.author.toString() !== req.user.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }
  
      const { title, content, status } = req.body;
      if (title) post.title = title;
      if (content) post.content = content;
      if (status) post.status = status;


  const imageFile = req.files?.image?.[0];
  const videoFile = req.files?.video?.[0];

  let mediaUrl = post.media;
  post.mediaType=post.mediaType;

  if (imageFile) {
    mediaUrl = await uploadToCloud(imageFile, 'image');
    post.media=mediaUrl;
    post.mediaType="image";
  } else if (videoFile) {
    mediaUrl = await uploadToCloud(videoFile, 'video');
    post.media=mediaUrl;
    post.mediaType="video";
    
  }

  
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Update failed" });
    }
  });

  

// delete post 

router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user.userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  await post.deleteOne();
  res.json({ message: "Post deleted" });
});

module.exports = router;
