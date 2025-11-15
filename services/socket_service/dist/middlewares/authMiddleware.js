import jwt from 'jsonwebtoken';
export const isAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Please login - No auth headers"
            });
            return;
        }
        const token = authHeader.split(" ")[1] || "";
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedValue || !decodedValue.user) {
            res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
            return;
        }
        req.user = decodedValue.user;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "JWT error"
        });
        return;
    }
};
//# sourceMappingURL=authMiddleware.js.map