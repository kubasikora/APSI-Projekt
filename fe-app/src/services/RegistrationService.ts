import RegistrationData from "@/models/RegistrationData";
import RegistrationServiceResponse from "@/models/RegistrationServiceResponse";

export default class RegistrationService {
    public async register(userData: RegistrationData): Promise<RegistrationServiceResponse> {
        alert(`Imie: ${userData.name}, Nazwisko: ${userData.lastName}`);
        if(userData.name && userData.lastName)
            return new RegistrationServiceResponse(true, 201, "Created");
        else 
        return new RegistrationServiceResponse(false, 400, "Bad request");
    }
};