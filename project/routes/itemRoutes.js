import express from "express";

import {
  getItems,
  createItem,
  updateItem,
  deleteItem
} from "../controllers/itemController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { adminOnly } from "../controllers/authController.js";

const router = express.Router();

router.get("/", authMiddleware, getItems);

router.post("/", authMiddleware, createItem);

router.put("/:id", authMiddleware, updateItem);

router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  deleteItem
);

export default router;