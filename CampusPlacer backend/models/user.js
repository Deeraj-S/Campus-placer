const mongoose =  require('mongoose');
const {Schema}=mongoose;
const userschema=new Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true

    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("user",userschema)