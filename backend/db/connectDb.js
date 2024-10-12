import mongoose from "mongoose";

export const connectDb = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to Mongodb host : ${conn.connection.host}`);
  }
  catch(error){
    console.log("Error connecting to the database: ", error);
  }
}