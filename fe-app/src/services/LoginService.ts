import LoginCredentials from "@/models/LoginCredentials";
import LoginResponse from "@/models/LoginResponse";
import LogoutResponse from "@/models/LogoutResponse"
import apiClient from "@/api";

interface APILoginCredentials {
    username: String;
    password: String;
}

export default class LoginService {
    public async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            const data: APILoginCredentials = {
                username: credentials.email,
                password: credentials.password
            };
            const response = await apiClient.post("/account/login", data);
            return new LoginResponse(true, response.status, response.statusText);
        } catch(err) {
            const response = err.response;
            return new LoginResponse(false, response.status, response.statusText);
        }
    }

    public async logout(): Promise<LogoutResponse> {
        try {
            const response = await apiClient.get("/account/logout");
            console.log(response);
            return new LogoutResponse(true, 200, "Logged out");
        } catch(err) {
            console.log(err.response.data);
            return new LoginResponse(false, 403, "Logging out failed");
        }
    }
};