import express from "express";
import dotenv from 'dotenv';
dotenv.config();
const startServer = async () => {
    const app = express();
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log("Mail Service is running on port", port);
    });
};
startServer();
//# sourceMappingURL=index.js.map