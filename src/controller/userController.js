const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userModel=require("../modles/user");
const SECRET="thisisasecret"

const signup = async function(req,res){
    const {username, password, email}=req.body;
    try{
        const existing = await userModel.findOne({email:email});
        if(existing){
            return res.send(401).json({message:"User already exist"})
        } 
        const hashedPass= await bcrypt.hash(password,10);
        const result= await userModel.create({
           username:username,
           password:hashedPass,
           email:email
        });
        
        const token=jwt.sign({id:result._id,email:result.email},SECRET);
        return res.status(201).json({user:result,token:token});
    }catch(error){
      console.log(error);
      res.status(500).json({message:"Something went wrong"});
    }

    }

const signin = async function(req,res){
    const {password, email}=req.body;
    try{
        const existing=await userModel.findOne({email:email});
        if(!existing){
            return res.status(404).json({message:"User not found"})
        }
        
        const pmatch=await bcrypt.compare(password,existing.password);

        if(!pmatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=jwt.sign({id:existing._id,email:existing.email},SECRET);
        return res.status(201).json({user:existing,token:token});


    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
}

module.exports={signup,signin};