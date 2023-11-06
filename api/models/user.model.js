import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique : true,
        required : true,
    },
    email:{
        type:String,
        unique : true, 
        required : true,
    },
    password:{
        type:String,
        required : true,
    },
    avatar: {
        type:String,
        default:"https://profileme.app/wp-content/uploads/2021/01/cropped-ProfileMe-06.jpg"
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;