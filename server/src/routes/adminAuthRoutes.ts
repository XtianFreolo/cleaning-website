import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin";

import {
    loginAdmin,
    logoutAdmin,
} from "../controllers/adminAuthController";


const router = Router();



router.post(
    "/login",
    loginAdmin
);


router.post(
    "/logout",
    logoutAdmin
);

router.get(
    "/me",
    requireAdmin,
    (req, res) => {
        return res.status(200).json({
            message: "Admin session is valid.",
        });
    }
);


export default router;