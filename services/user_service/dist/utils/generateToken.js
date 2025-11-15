import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = async (user) => {
    const token = jwt.sign({ user }, JWT_SECRET, {
        expiresIn: '15d'
    });
    return token;
};
//# sourceMappingURL=generateToken.js.map