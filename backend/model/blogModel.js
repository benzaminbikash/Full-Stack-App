const mongoose=require('mongoose')

const blogScheme=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, {
    timestamps:true
})

module.exports=mongoose.model('Blog', blogScheme)