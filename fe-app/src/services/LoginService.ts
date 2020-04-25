import LoginCredentials from "@/models/LoginCredentials";
import LoginResponse from "@/models/LoginResponse";
import LogoutResponse from "@/models/LogoutResponse";
import apiClient from "@/api";
import Role from "@/roles";
import * as Cookies from "js-cookie";

interface APILoginCredentials {
  username: String;
  password: String;
}

const errorMessage: String = "Wystąpił niezidentyfikowany problem. Spróbuj ponownie później";
const authErrorMessage: String = "Błędny login lub hasło. Spróbuj ponownie";

export default class LoginService {
  public async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const data: APILoginCredentials = {
        username: credentials.email,
        password: credentials.password
      };
      const response = await apiClient.post("/account/login", data);
      return new LoginResponse(true, response.status, response.statusText);
    } catch (err) {
      const response = err.response;
      if (response)
        return new LoginResponse(false, response.status, authErrorMessage);
      else return new LoginResponse(false, 408, errorMessage);
    }
  }

  public async logout(): Promise<LogoutResponse> {
    try {
      await apiClient.get("/account/logout");
      Cookies.remove("csrftoken");
      Cookies.remove("username");
      Cookies.remove("user_type");
      return new LogoutResponse(true, 200, "Logged out");
    } catch (err) {
      console.log(err.response.data);
      return new LoginResponse(false, 403, "Logging out failed");
    }
  }

  public isLoggedIn(): Boolean {
    const session = Cookies.get("csrftoken");
    return !!session;
  }

  public getUsername(): String {
    const username = Cookies.get("username");
    if(username)
      return username;
    return "";
  }

  public getRole(): Role {
    const role = Cookies.get("user_type");

    if(role == "BOOM")
      return Role.Boomer
    if(role == "vol")
      return Role.Volunteer;

    return Role.Guest; 
  }
}
