import API_ROUTES from "../endpoints";
import axios from "axios";

export const LoginUser = async (data) => {
    const request = await axios.post(API_ROUTES.LOGIN_USER, data);
    return request.data;
}

