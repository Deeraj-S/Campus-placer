const mongoose=require('mongoose');
const {Schema}=mongoose;
const facultySchema = new Schema({
    name:{
        type:String,
        require:true
    },
    fid:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    designation:{
        type:String,
        require:true
    },
    dob:{
        type:Date,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    fid:{
        type:mongoose.Schema.ObjectId,
        ref:"faculty"

    }
})
module.exports=mongoose.model("faculty",facultySchema)