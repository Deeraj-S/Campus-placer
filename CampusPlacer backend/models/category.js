const mongoose= require('mongoose')
const {Schema} = mongoose
const categorySchema = new Schema({
    ctitle:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now

    },
    status:{
        type:String,

    }
})

module.exports=mongoose.model("category",categorySchema)