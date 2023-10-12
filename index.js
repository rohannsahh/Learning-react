import express from 'express';
import { config } from 'dotenv';
import userroute from './routes/authRoute.js';

// Load environment variables from a .env file
config();
const app = express();

const PORT = process.env.PORT || 4000;

// Import the dbConnect function from db.js
import dbConnect from './config/dbConnect.js'; // Adjust the path as needed
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Call dbConnect to establish the database connection
dbConnect();



app.use(express.json());
app.use("/api/user",userroute);
app.use(notFound);
app.use(errorHandler);




app.listen(PORT ,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`server connected ${PORT}`);
   }
    
})