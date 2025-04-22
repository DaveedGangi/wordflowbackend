const express = require("express");
const Comment = require("../models/Comment");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/comments", auth, async (req, res) => {
  const { content, postId } = req.body;
  const comment = new Comment({ content, post: postId, author: req.user.userId });
  await comment.save();
  res.status(201).json(comment);
});

router.get("/comments/:postId", async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate("author", "username").sort({created_at:-1});
  res.json(comments);
});

router.put("/comments/:commentId",auth,async(req,res)=>{

  try{
  const {content}=req.body;
  const {commentId}=req.params;


  const comment = await Comment.findById(commentId);
  if(!comment) return res.status(404).json({error:"Comment not found"});
  
  if(comment.author.toString()!==req.user.userId)return  res.status(403).json({error:"Unauthorized"});
  
  comment.content=content;
  await comment.save();
  res.json({message:"Comment updated successfully",comment})

  }
  catch(err){
    res.status(500).json({error:"Update failed"})
  }


  
})


router.delete("/comments/:commentId",auth,async(req,res)=>{

  try{
  const{commentId}=req.params 

  const  comment=await Comment.findById(commentId);
  if(!comment) return res.status(404).json({error:"Comment not found"});


  if(comment.author.toString()!==req.user.userId) return res.status(403).json({error:"Unauthorized"})
  
    await comment.deleteOne();
    res.json({message:"Comment deleted successfully"});
}
catch(err){
  res.status(500).json({error:"Delete failed"});
}
  
})




module.exports = router;
