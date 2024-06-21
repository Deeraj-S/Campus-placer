const mongoose= require('mongoose')
const {Schema} = mongoose
const productSchema = new Schema({
    pname:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true

    },
    price:{
        type:Number,
        require:true
    },
    qty:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    date:{
        type:Date
    },
    status:{
        type:String,
        require:true
    },
    cid:{
        type: mongoose.Types.ObjectId, // Correctly reference mongoose.Types.ObjectId
        ref: "product"
    }
})
module.exports=mongoose.model("product",productSchema)