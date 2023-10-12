import mongoose from "mongoose";
import bcrypt from "bcrypt";
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default: "user",
    },
    cart:{
        type: Array,
        default: [],
    },
    address:[{ type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    wishlist:[{ type: mongoose.Schema.Types.ObjectId, ref:"product"}]
    
},{
        timestamps:true,
    });


userSchema.pre("save",async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password , salt);
});


userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


//Export the model
const User= mongoose.model('User', userSchema);
export default User;