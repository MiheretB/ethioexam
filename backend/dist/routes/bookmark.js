"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookmarkController_1 = require("../controllers/bookmarkController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.protect);
router.post('/:questionId', bookmarkController_1.bookmarkController.addBookmark);
router.delete('/:questionId', bookmarkController_1.bookmarkController.removeBookmark);
router.get('/', bookmarkController_1.bookmarkController.getBookmarks);
exports.default = router;
