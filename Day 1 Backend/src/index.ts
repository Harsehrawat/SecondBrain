import express from "express";
import mongoose  from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { UserModel } from "./db";
import {ContentModel} from "./db";
import { LinkModel } from "./db";
import { random } from "./utils";
import { string, z } from "zod";
import { Request, Response } from "express";
// import { userMiddleware } from "./middleware";
import { JWT_SECRET_KEY } from "./config";
import cors from "cors";
import { userMiddleware } from "./middleware";



const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies.
app.use(cors()); // Middleware to allow cross-origin requests.

// Zod schema for validation
const signUpSchema = z.object({
    username : z.string()
    .min(3)
    .max(20)
    .regex(/^[a-z0-9_.]+$/, "Username can only contain lowercase letters, numbers, and _ , ."),
  
    password : z.string().min(5).max(15).regex(/^[a-zA-Z0-9@_.$]+$/)
});

app.post("/api/signup", async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = signUpSchema.parse(req.body);
  
      // Check if user already exists
      const ifUserExists = await UserModel.findOne({ username });
      if (ifUserExists) {
        return res.status(403).json({
          message: "Username already taken"
        });
      }
  
      // Hash password and create user
      const hashedPass = await bcrypt.hash(password, 5);
      await UserModel.create({
        username,
        password: hashedPass
      });
  
      res.status(200).json({
        message: "Signup successful"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(411).json({
          message: "Invalid input"
        });
      }
      console.log("Server error", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });
  

  app.post("/api/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const verifyUsername = await UserModel.findOne({ username });

        // If user exists
        if (verifyUsername) {
            // Compare the provided password with the stored hashed password
            const verifyPass = await bcrypt.compare(password, verifyUsername.password);

            // If passwords match,generate a JWT token and send it back
            if (verifyPass) { 
                const token = jwt.sign({ id: verifyUsername._id }, JWT_SECRET_KEY);
                res.status(200).json({ token,message : "Login Successfull" });
            } else {
                res.status(403).json({ message: "Incorrect password" });
            }
        } else {
            res.status(403).json({ message: "Username not found" });
        }
    } catch (error) {
        console.log("Server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

    

app.post("/api/content",userMiddleware ,async (req, res)=>{
    const {title , link, type} = req.body;
    try{
      if(title==null || link===null || type===null){
        res.status(400).json({message : "can't submit null entry"});
      }
      else{
        await ContentModel.create({
          title,
          link,
          type,
          userId : req.userId,
          tags : [],
        })
        res.status(200).json({ message : "Content Added!"});
      }
    }catch(e){
      console.log("server error in app.post(/api/content)"+e);
      res.status(500).json({message : "server error"});
    }
    
})


app.get("/api/content",userMiddleware, async (req,res)=>{
    const userId = req.userId;
    // from contentModel return content w/ this userId
    try{
        // fetch username to always display regardless if any content added or not
        const user = await UserModel.findOne({ _id : userId}).select("username");
        console.log(`username received by BE:${user?.username}`);
        const content = await ContentModel.find({ userId : userId}).populate("userId","username");
        if(content.length !=0){
            res.status(200).json({ content ,username : user?.username});
        }
        else{
            res.status(200).json({ message : "you have added nothing yet" , username : user?.username});
        }
    }
    catch(e){
        console.log("server error "+e);
    }
});

app.delete("/api/delete/content", userMiddleware,async (req,res)=>{
    const contentId = req.body.contentId;
    // find and return 
    try{
        await ContentModel.deleteMany({
            contentId,
            userId : req.userId
        })
        res.status(200).json({message : "deleted successfully"});
        
    }
    catch(e){
        console.log("server eror in content delete"+e);
    }
});

app.post("/api/share/content",userMiddleware , async (req,res)=>{
    const share = req.body.share;
    try{
      if(share){
        const existingLink = LinkModel.findOne({ userId : req.userId});
        if(!existingLink){
          // create new and return
          const hash = random(10);
          await LinkModel.create({ userId : req.userId , hash});
          res.status(200).json({ message : `/api/share/${hash}`});
        }else{
          // delete existing link and return new to user and db
          await LinkModel.deleteOne({ userId : req.userId});
          const hash = random(10);
          await LinkModel.create({ userId : req.userId ,hash});
          res.status(200).json({ message : `/api/share/${hash}`});
        }
      }else{
        await LinkModel.deleteOne({ userId : req.userId});
        res.status(200).json({ message : "link deleted"});
      }      
    }catch(e){
      console.log("error in /api/share/content :"+ e);
      res.status(403).json({message : "server error"});
    }
});

app.get("/api/share/:sharableLink", async (req,res)=>{
    const hash = req.params.sharableLink;
    // verify hash is associated w/ LinkModel
    const link = await LinkModel.findOne({ hash });
    if(!link){
      res.status(411).json({ message : "invalid link / no such link exists"});
      return;
    }
    // if such link found , return content and username
    const content = await ContentModel.find({ userId : link.userId});
    if(!content){
      res.status(404).json({message : "empty link / no content added by user associated w/ this link"});
    }
    // if content found , return content and username
    const user = await UserModel.findOne({ userId : link.userId});

    res.status(200).json({ username : user?.username , content});

})


app.listen(3000);