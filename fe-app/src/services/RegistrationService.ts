import RegistrationData from "@/models/RegistrationData";
import RegistrationServiceResponse from "@/models/RegistrationServiceResponse";
import apiClient from "@/api";
interface APIRegistrationProfile {
    user_type: String;
}
interface APIRegistrationUser {
    username: String;
    password: String;
    profile: APIRegistrationProfile;
}
export default class RegistrationService {
    public async register(userData: RegistrationData): Promise<RegistrationServiceResponse> {
        
        try {
            const profile: APIRegistrationProfile = {
                user_type: userData.role
            
            }
            const body: APIRegistrationUser = {
                username: userData.email,
                password: userData.password,
                profile: {...profile}
            }
            const response = await apiClient.post("/account/users", body)
            return new RegistrationServiceResponse(true, response.status, response.statusText)
        }catch(err){
            const response = err.response
            return new RegistrationServiceResponse(false, response.status, response.statusText)
        }
        
    }
};