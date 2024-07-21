import { Router } from "express";
import * as serviceController from "../controllers/service.controller.mjs";
import { protect } from "../middlewares/protect.middleware.mjs";

const serviceRouter = Router();

serviceRouter.use(protect);

serviceRouter.get("/", serviceController.getAllService);

export default serviceRouter;
