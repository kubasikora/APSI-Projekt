import Profile from "@/models/Profile";
import ProfileResponse from "@/models/ProfileResponse";
import apiClient from "@/api";

export default class ProfileService {
  public async getPersonalInfo(): Promise<ProfileResponse> {
    try {
      const response = await apiClient.get("/account/me");
      const data = response.data.profile;
      const profile = new Profile("Jan", "Kowalski", data.address, "Warszawa", new Date(data.date_of_birth));
      return new ProfileResponse(true, response.status, profile);
    } catch (err) {
      const response = err.response;
      if (response)
        return new ProfileResponse(false, response.status, null);
      else return new ProfileResponse(false, 408, null);
    }
  }
}
