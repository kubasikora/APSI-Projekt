export default class RegistrationServiceResponse {
    constructor(state: Boolean, responseCode: Number, message: String){
        this.state = state;
        this.responseCode = responseCode;
        this.message = message;
    }
  
    readonly state: Boolean;
    readonly responseCode: Number;
    readonly message: String;
  };