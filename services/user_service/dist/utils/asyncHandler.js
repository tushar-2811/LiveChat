export const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        }
        catch (error) {
            console.log("Error", error);
            res.status(500).json({
                success: false,
                message: error.message || "Internal Server Error"
            });
        }
    };
};
//# sourceMappingURL=asyncHandler.js.map