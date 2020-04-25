import Profile from "@/models/Profile";
import ProfileResponse from "@/models/ProfileResponse";
import * as Cookies from "js-cookie";
import apiClient from "@/api";

export default class ProfileService {
  public async getPersonalInfo(): Promise<ProfileResponse> {
    try {
      const response = await apiClient.get("/account/me");
      const data = response.data.profile;
      const profile = new Profile(data.id, "Jan", "Kowalski", data.address, "Warszawa", new Date(data.date_of_birth));
      return new ProfileResponse(true, response.status, profile);
    } catch (err) {
      const response = err.response;
      if (response)
        return new ProfileResponse(false, response.status, null);
      else return new ProfileResponse(false, 408, null);
    }
  }

  private padNumber(num: Number): string {
    if(num < 10)
      return "0" + num.toString();
    return num.toString();
  }

  public async saveMyProfile(profile: Profile): Promise<ProfileResponse> {
    try {
      const date = profile.dateOfBirth;
      const profileMessage = {profile: {
        date_of_birth: `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}`,
        address: profile.address
      }}; 
      apiClient.defaults.headers.put["X-CSRFTOKEN"] = Cookies.get("csrftoken");
      const response = await apiClient.put("/account/me", profileMessage);
      const data = response.data.profile;
      const newProfile = new Profile(data.id, "Jan", "Kowalski", data.address, "Warszawa", new Date(data.date_of_birth));
      return new ProfileResponse(true, response.status, newProfile);
    } catch(err) {
      const response = err.response;
      if (response)
        return new ProfileResponse(false, response.status, null);
      else return new ProfileResponse(false, 408, null);
    }
  }

  public async changePassword(password: String): Promise<ProfileResponse> {
    try {
      const message = { password: password, profile: {} };
      apiClient.defaults.headers.put["X-CSRFTOKEN"] = Cookies.get("csrftoken");
      const response = await apiClient.put("/account/me", message);
      return new ProfileResponse(true, response.status, null);
    } catch(err) {
      const response = err.response;
      if (response)
        return new ProfileResponse(false, response.status, null);
      else return new ProfileResponse(false, 408, null);
    }
  }

  public async deleteAccount(): Promise<ProfileResponse> {
    try {
      apiClient.defaults.headers.delete["X-CSRFTOKEN"] = Cookies.get("csrftoken");
      const response = await apiClient.delete("/account/me");
      return new ProfileResponse(true, response.status, null);
    } catch(err) {
      const response = err.response;
      if (response)
        return new ProfileResponse(false, response.status, null);
      else return new ProfileResponse(false, 408, null);
    }
  }
}
