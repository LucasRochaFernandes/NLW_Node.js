import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "./database";

const app = express();

import { router } from "./routes";

app.use(express.json());

app.use(router);

app.use(
  (error: Error, req: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      return response.status(400).json({
        error: error.message,
      });
    } else {
      return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }
);

app.listen(8080, () => console.log("Rodando"));
