export default class Profile {
    constructor(id: String, firstName: String, lastName: String, address: String, city: String, dateOfBirth: Date){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.dateOfBirth = dateOfBirth;
    }
  
    readonly id: String;
    readonly firstName: String;
    readonly lastName: String;
    readonly address: String;
    readonly city: String;
    readonly dateOfBirth: Date;
    public rating: Number;
  };