import express from "express";
import {
  addLapangan,
  adminDashboard,
  allLapangan,
  bookingAdmin,
  bookingCancel,
  bookingComplete,
  changeAvailability,
  deletelapangan,
  loginAdmin,
  registerAdmin,
  updateLapangan,
} from "../controllers/adminController.js";
import authAdmin from "../middlewares/authAdmin.js";
import upload from "../middlewares/multer.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/regist", registerAdmin);
adminRouter.post(
  "/add-lapangan",
  authAdmin,
  upload.single("image"),
  addLapangan
);
adminRouter.get("/booking", authAdmin, bookingAdmin);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.post("/cancel-booking", authAdmin, bookingCancel);
adminRouter.post("/complete-booking", authAdmin, bookingComplete);
adminRouter.post("/delete-lapangan", authAdmin, deletelapangan);
adminRouter.get("/all-lapangan", authAdmin, allLapangan);
adminRouter.post(
  "/update-lapangan/:lapanganId",
  upload.single("image"),
  updateLapangan
);

adminRouter.post("/change-availability", authAdmin, changeAvailability);

export default adminRouter;
