export default class RegistrationData {
    constructor(name: String, lastName: String, phone: String, email: String, password: String, role: String){
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    
    readonly name: String;
    readonly lastName: String;
    readonly phone: String;
    readonly email: String;
    readonly password: String;
    readonly role: String
  };