const UserSchema = require('../models/user');
const  Insert = async (req,res)=>{
    try{
    //console.log("this is insert API")
    const {name,phone}=req.body
    const user= await UserSchema({name,phone})
    await user.save()
    
    //console.log(req.headers)
    res.json({success:true,savedUser:user})

    }catch(err){
        console.log("Error:"+err.message)
        res.send("Internal server error")
    }    
}

const Get= async (req,res)=>{
    try{
        const user = await UserSchema.find({name:"ab"});
        res.json({success:true,user})

    }catch(err){
        console.log("Error:"+err.message)
        res.send("Internal server error")

    }
}
module.exports={Insert,Get}