import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import dbConfig from "../ormconfig";

import { router } from "./routes/userRoutes";



const app = express();
const port = 5000;
createConnection(dbConfig as ConnectionOptions).then(async (connection) => {
    const app = express();
  
    app.use(express.json());
  
    const port = process.env.PORT;
  
    app.use(express.urlencoded({ extended: false }));
  
    app.use("/", router);
    

  
    app.listen(port, () => {
      console.log(`Server is listening at port ${port}.`);
    });
  });