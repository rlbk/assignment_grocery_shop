import app from "./src/app";
import envConfig from "./src/config/envConfig";

const startServer = async () => {
  // START SERVER
  const port = envConfig.port || 3008;
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

startServer();
