const jwt=require('jsonwebtoken');
const SECRET_KEY="thisisasecret";


const auth = (req,res,next) => {
    
    try {

       const token=req.headers.authorization.split(" ")[1];
       
       if(token){

          user=jwt.verify(token,SECRET_KEY);
          req.userId=user.id;  
          next();
       }
       else{
        return res.status(401).json({message:"Unauthorized user"});
       }
       

    } catch (error) {
        return res.status(401).json({message:"Unauthorized user"});
    }
}

module.exports=auth;