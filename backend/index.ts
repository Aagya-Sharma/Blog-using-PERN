import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { ConnectionOptions, createConnection } from "typeorm";
import dbConfig from "../ormconfig";

import { router } from "./routes/userRoutes";
import { categoryrouter } from "./routes/categoryRoutes";
import { blogrouter } from "./routes/blogRoutes";
    



const app = express();
const port = 5000;
createConnection(dbConfig as ConnectionOptions).then(async (connection) => {
    const app = express();
  
    app.use(express.json());
  
    const port = process.env.PORT;
  
    app.use(express.urlencoded({ extended: false }));
  
    app.use("/", router);
    app.use("/api/category", categoryrouter);
    app.use("/api/blog", blogrouter);

    

  
    app.listen(port, () => {
      console.log(`Server is listening at port ${port}.`);
    });
  });