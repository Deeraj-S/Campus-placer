const mongoose=require('mongoose');
const {Schema}=mongoose;
const empSchema=new Schema({
    ename:{
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
    designation:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("emp",empSchema)