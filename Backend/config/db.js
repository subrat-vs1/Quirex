import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/Quirex";
    const conn = await mongoose.connect(mongoUri);
    if (conn) {
      console.log("DB Connected");
    }
  } catch (error) {
    console.error("DB Connection Error", error?.message || error);
    process.exit(1);
  }
};
