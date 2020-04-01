export default class LoginCredentials {
  constructor(email: String, password: String){
      this.email = email;
      this.password = password;
  }

  readonly email: String;
  readonly password: String;
};