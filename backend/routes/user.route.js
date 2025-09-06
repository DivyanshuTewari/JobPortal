import express from "express";
const router = express.Router();
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated ,updateProfile);
router.route("/logout").get(logout);

export default router;