
const mongoose=require("mongoose");

const CommentSchema=new mongoose.Schema({
    content:{type:String,required:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:"Post"},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    created_at:{type:Date,default:Date.now}
});

module.exports=mongoose.model("Comment",CommentSchema);