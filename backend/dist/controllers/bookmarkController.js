"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkController = void 0;
const User_1 = require("../models/User");
exports.bookmarkController = {
    // Add bookmark
    addBookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { questionId } = req.params;
            const userId = req.user.id;
            yield User_1.User.findByIdAndUpdate(userId, {
                $addToSet: { bookmarks: questionId }
            });
            res.status(200).json({
                status: 'success',
                message: 'Question bookmarked successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }),
    // Remove bookmark
    removeBookmark: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { questionId } = req.params;
            const userId = req.user.id;
            yield User_1.User.findByIdAndUpdate(userId, {
                $pull: { bookmarks: questionId }
            });
            res.status(200).json({
                status: 'success',
                message: 'Bookmark removed successfully'
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }),
    // Get bookmarked questions
    getBookmarks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.id;
            const user = yield User_1.User.findById(userId).populate('bookmarks');
            res.status(200).json({
                status: 'success',
                data: { bookmarks: (user === null || user === void 0 ? void 0 : user.bookmarks) || [] }
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    })
};
