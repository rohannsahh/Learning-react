import mongoose from "mongoose";

const URL = 'mongodb+srv://admin1234:admin1234@cluster0.kvkoa7t.mongodb.net/?retryWrites=true&w=majority';

const dbConnect = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database error:", error);
  }
};

// Call the dbConnect function to establish the database connection
export default dbConnect;
