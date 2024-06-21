const mongoose=require('mongoose');
const {Schema}=mongoose;
const studentSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    regno:{
        type:Number,
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
    course:{
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
        type: mongoose.Types.ObjectId, // Correctly reference mongoose.Types.ObjectId
        ref: "faculty"
    }
    
})
module.exports=mongoose.model("student",studentSchema)