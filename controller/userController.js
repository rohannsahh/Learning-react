import { generateToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler'; // Import asyncHandler correctly



// Define your createUser route handler
export const createUser = asyncHandler(async (req, res) => {
   
    const { email } = req.body;

    // Check if a user with the same email already exists
    const findUser = await User.findOne({ email });

    if (!findUser) {
      // Create a new user with the request body data
      const newUser = await User.create(req.body);

      // Respond with the newly created user
      res.status(201).json({
        success: true,
        data: newUser,
      });
    } else {
      // If a user with the same email exists, respond with an error message
      throw new Error("User Already Exist");
    }
   
});

export const loginUserctrl = asyncHandler(async(req,res) =>{
   const { email , password } =req.body;
   // check if user exists or not
   const findUser = await User.findOne({email});
   if ( findUser && (await findUser.isPasswordMatched(password))){
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email:findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
   }else{
    throw new Error ("Invalid Credentials");
   }

});

// get all users

export const getallUser = asyncHandler(async(req,res)=>{
  try {
    const getUsers= await User.find();
    res.json(getUsers);

  } catch (error) {
     throw new Error;
  }
});


// get a user
export const getaUser = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  try {
    const getaUser=await User.findById(id);
    res.json({
      getaUser,
    })
  } catch (error) {
    throw new Error
  }
});

//delete a user
export const deleteaUser = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  try {
    const deleteaUser=await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    })
  } catch (error) {
    throw new Error
  }
});

//update a user
export const updatedUser = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
  try {
    const updatedUser= await User.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json (updatedUser)

  } catch (error) {
      throw new Error;
  }
})



//export default createUser;
