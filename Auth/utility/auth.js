
import jwt from "jsonwebtoken"

const ensureAuthenticated = (req,res,next)=>{
   if(!req.headers['authorization']){
    return res.status(403).json({message:"token is required"});

   }

   try{
     const decoded = jwt.verify(req.headers['authorization',process.env.SECRET]);
     next();
   }

   catch(err){
    return res.status(403).json({message:"token is not valid or it's expired"});
   }
}


export default ensureAuthenticated;
