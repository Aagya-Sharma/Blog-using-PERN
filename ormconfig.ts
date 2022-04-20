// import { join } from "path";
import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import { User } from "./backend/entities/User";
import { Category } from "./backend/entities/Category";

dotenv.config();


const config = {
  host: "localhost",
  user: "postgres",
  password: "admin123",
  database: "Arbyte_blogs",
};
const connectionsOptions: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  name: "default",
  port: 5432,
  username: "postgres",
  password: "admin123",
  database: "Arbyte_blogs",
  synchronize: true,
  entities:[User,Category],
  dropSchema: false,
};

export = connectionsOptions;