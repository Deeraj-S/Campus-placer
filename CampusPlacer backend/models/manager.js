const mongoose=require('mongoose');
const {Schema}=mongoose;
const managerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number
    },
    password:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        
    }
})

module.exports=mongoose.model("manager",managerSchema)