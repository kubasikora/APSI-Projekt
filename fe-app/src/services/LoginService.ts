import LoginCredentials from "@/models/LoginCredentials";
import LoginServiceResponse from "@/models/LoginServiceResponse";
import apiClient from "@/api";

interface APILoginCredentials {
    username: String;
    password: String;
}

export default class LoginService {
    public async login(credentials: LoginCredentials): Promise<LoginServiceResponse> {
        try {
            const data: APILoginCredentials = {
                username: credentials.email,
                password: credentials.password
            };
            await apiClient.post("/account/login", data);
            return new LoginServiceResponse(true, 200, "Authorized");
        } catch(err) {
            console.log(err.response.data);
            return new LoginServiceResponse(false, 403, "Unauthorized");
        }
    }
};