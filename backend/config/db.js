import { Db } from "mongodb";
import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((host) => console.log("DB Connected on port", host.connection.host));
};

// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.
