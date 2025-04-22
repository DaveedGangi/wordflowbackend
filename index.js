
const express=require("express"); // express is a nodejs web framework
const mongoose=require("mongoose"); // ODM object data modelling library for mongodb 
// helps in connecting with mongodb

const cors=require("cors"); // cross orgin resource sharing 
require("dotenv").config(); //handling sensitive data ,loads the envinormental variable from .env file


const authRoutes=require("./routes/auth");
const postRoutes=require("./routes/posts");
const commentRoutes=require("./routes/comments");

const app=express();
app.use(cors());
app.use(express.json()); // applies middleware to parse incoming JSON bodies

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.log("MongoDB connection error:",err);
});

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments",commentRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
