import mongoose from "mongoose";
import envConfig from "./envConfig";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(envConfig.databaseUrl as string)
      .then((data: any) =>
        console.log(`Database connected with ${data.connection.host}`)
      );
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};
