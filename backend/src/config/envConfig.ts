import dotenv from "dotenv";
dotenv.config();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_URI,
  frontendDomain: process.env.FRONTEND_DOMAIN,
};

export default Object.freeze(_config);
