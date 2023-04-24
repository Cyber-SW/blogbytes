const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const adminSchema=new Schema({
    
    fullname:{
        type:String,
        required: [true, 'Full Name is required.']
    },
    username:{
        type:String,
        required: [true, 'Username is required.'],
        unique:true

    },
    password:{
        type:String,
        required: [true, 'Password is required.']
    }

})

const Admin=mongoose.model("Admin",adminSchema)

module.exports=Admin