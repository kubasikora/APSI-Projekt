export default class Profile {
    constructor(firstName: String, lastName: String, address: String, city: String, dateOfBirth: Date){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.dateOfBirth = dateOfBirth;
    }
  
    readonly firstName: String;
    readonly lastName: String;
    readonly address: String;
    readonly city: String;
    readonly dateOfBirth: Date;
  };