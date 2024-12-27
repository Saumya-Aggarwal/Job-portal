import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to Database")
  } catch (error) {
    console.log("Error in connecting to DB")
  }
};

export default connectDB;
