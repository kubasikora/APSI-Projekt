export default class RegistrationServiceResponse {
    constructor(state: Boolean, responseCode: Number, errorMessage: String){
        this.state = state;
        this.responseCode = responseCode;
        this.errorMessage = errorMessage;
    }
  
    readonly state: Boolean;
    readonly responseCode: Number;
    readonly errorMessage: String;
  };