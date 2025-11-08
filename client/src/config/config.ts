

const USER_BASE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL || process.env.USER_SERVICE_URL || "http://localhost:4000";

const CHAT_BASE_URL = process.env.NEXT_PUBLIC_CHAT_SERVICE_URL || process.env.CHAT_SERVICE_URL || "http://localhost:4005";

export const config = {
    USER_SERVICE: {
        URL: USER_BASE_URL,
        SEND_OTP : `${USER_BASE_URL}/api/v1/login`,
        VERIFY_OTP : `${USER_BASE_URL}/api/v1/verify-user`,
        GET_MY_PROFILE : `${USER_BASE_URL}/api/v1/get-profile`,
        GET_ALL_USERS : `${USER_BASE_URL}/api/v1/users/all`
    },
    CHAT_SERVICE : {
        URL : CHAT_BASE_URL,
        GET_ALL_CHATS : `${CHAT_BASE_URL}/api/v1/chat/get-all-chats`,
        CREATE_NEW_CHAT : `${CHAT_BASE_URL}/api/v1/chat/create-new-chat`,
        FETCH_SINGLE_CHAT : `${CHAT_BASE_URL}/api/v1/chat/message`,
        SEND_MESSAGE : `${CHAT_BASE_URL}/api/v1/chat/message`
    }
};

