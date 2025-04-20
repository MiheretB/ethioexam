"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/register', authController_1.authController.register);
router.post('/login', authController_1.authController.login);
router.get('/verify', auth_1.auth, authController_1.authController.verifyToken);
exports.default = router;
