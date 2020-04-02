import LoginCredentials from "@/models/LoginCredentials";
import LoginServiceResponse from "@/models/LoginServiceResponse";

export default class LoginService {
    public async login(credentials: LoginCredentials): Promise<LoginServiceResponse> {
        alert(`Email: ${credentials.email}, Hasło: ${credentials.password}`);
        if(credentials.email && credentials.password)
            return new LoginServiceResponse(true, 200, "Authorized");
        else 
        return new LoginServiceResponse(false, 403, "Unauthorized");
    }
};