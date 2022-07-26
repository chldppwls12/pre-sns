import express from "express";
import AppDataSource from "@config/data-source";
import logger from "@config/logger";
import routes from "./routes";
import "dotenv/config";

const app = express();

AppDataSource.initialize()
  .then(async () => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/v1", routes);
    app
      .listen(process.env.PORT, () => {
        logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${process.env.PORT}`);
      })
      .on("error", (err) => {
        console.log(err);
        process.exit(1);
      });
  })
  .catch((err) => console.log(err));
