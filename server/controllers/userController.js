const User= require("../models/userModel");
const bcrypt=require("bcrypt");

module.exports.register=async (req,res,next)=>{
    try{
 const {username,email,password}=req.body;

 const usernameCheck=await User.findOne({username});
 if(usernameCheck)
 return res.json({msg:"username already in used",status:false});

 const emailcheck=await User.findOne({email});
 if(emailcheck)
 return res.json({msg:"email already in used",status:false});

 const hashedPassword=await bcrypt.hash(password,10);
 const user=await User.create({
     email,username,password:hashedPassword,
 });
 delete user.password;
 return res.json({status:true,user});
} 
catch(ex){
    next(ex);
}
}



module.exports.login=async (req,res,next)=>{
    try{
 const {username,password}=req.body;

 const user=await User.findOne({username});
 if(!user)
 return res.json({msg:"username not found",status:false});

 const isPasswordCorrect=await bcrypt.compare(password,user.password);
 if(!isPasswordCorrect){
    return res.json({msg:"incorrect password",status:false}); 
 }
 delete user.password;
 return res.json({status:true,user});
} 
catch(ex){
    next(ex);
}
}


module.exports.setAvatar=async (req,res,next)=>{
    try{
 const userId=req.params.id;
 const avatarImage=req.body.image;
 const userData=await User.findByIdAndUpdate(userId,{
     isAvatarImageSet:true,
     avatarImage,
 });
 return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage});
} 
catch(ex){
    next(ex);
}
}


module.exports.getAllUsers=async (req,res,next)=>{
try {
    const users=await User.find({_id: {$ne:req.params.id}}).select( [
            "email",
            "username",
            "avatarImage",
            "id",
        ] )
        //console.log(users)
        return res.json(users);
} catch (error) {
    next(ex);
}
}
