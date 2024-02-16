import mongoose from "mongoose";

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Connected to MongoDB"));
  } catch (err) {
    console.log(err);
  }
};

export default connectToDB;
