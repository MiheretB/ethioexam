"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const routes_1 = __importDefault(require("./routes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Mount all routes under /api
app.use('/api', routes_1.default);
// Root route for basic server check
app.get('/', (req, res) => {
    res.json({ message: 'EthioExam API is running' });
});
// MongoDB connection
const uri = "mongodb+srv://miheret:<yellowtek>@cluster0.911drx6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
};
mongoose_1.default.connect(uri, clientOptions)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});
// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
