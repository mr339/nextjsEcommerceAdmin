import mongoose from "mongoose";

export const mongooseConnect = async (): Promise<mongoose.Connection> => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    return mongoose.connect(uri).then(() => mongoose.connection);
  }
};
