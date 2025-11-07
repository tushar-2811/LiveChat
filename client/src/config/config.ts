

const BASE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL || process.env.USER_SERVICE_URL || "http://localhost:4000";

export const config = {
    USER_SERVICE: {
        URL: BASE_URL,
        // expose full URLs so client-side code posts to the backend instead of the current origin
        SEND_OTP : `${BASE_URL}/api/v1/login`,
        VERIFY_OTP : `${BASE_URL}/api/v1/verify-user`,
    }   
};

