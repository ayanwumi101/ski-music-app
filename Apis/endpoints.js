const API_BASE_URL = process.env.API_BASE_URL;

const API_ROUTES = {
  //authentication endpoints
  LOGIN_USER: `${API_BASE_URL}/auth/login`,
  GOOGLE_SIGNUP: `${API_BASE_URL}/auth/google`,
  SENT_OTP: `${API_BASE_URL}/auth/otp/send/email`,
  VERIFY_OTP: `${API_BASE_URL}/auth/otp/email/verify`,
  CONFIRM_EMAIL: `${API_BASE_URL}/auth/email/confirm`,
};

export default API_ROUTES;
