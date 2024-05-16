import app from "./src/app";
import { connectDB } from "./src/config/db";
import envConfig from "./src/config/envConfig";

const startServer = async () => {
  // CONNECT TO DB
  connectDB();

  // START SERVER
  const port = envConfig.port || 3008;
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();
