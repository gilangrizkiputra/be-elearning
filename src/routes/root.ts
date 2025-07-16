import { Application } from "express";
import * as indexController from "../controllers/index";

export default (app: Application) => {
  app.get("/", indexController.ping);
};
