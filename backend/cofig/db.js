import mongoose from "mongoose";

const dbconnect=async (req,res) => {
  try {
      await mongoose.connect("mongodb://127.0.0.1:27017/Database");
    console.log("Db connect successfuly")
  } catch (error) {
    console.log(error)
  }
}

export default dbconnect