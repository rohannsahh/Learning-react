import  express  from "express";
import { createUser, loginUserctrl ,getallUser,getaUser,deleteaUser,updatedUser} from "../controller/userController.js";
import { authMiddleware ,isAdmin} from "../middleware/authMiddleware.js";

const userroute= express.Router();

userroute.post("/register",createUser);
userroute.post("/login",loginUserctrl);
userroute.get("/all-users",getallUser);
userroute.get("/:id",authMiddleware,isAdmin,getaUser);
userroute.delete("/:id",deleteaUser);
userroute.put("/edit-user",authMiddleware,updatedUser);







export default userroute;