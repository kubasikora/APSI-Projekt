import Profile from "@/models/Profile";

export default class ProfileResponse {
    constructor(state: Boolean, responseCode: Number, profile: Profile | null){
        this.state = state;
        this.responseCode = responseCode;
        if(profile) 
            this.profile = profile;
    }
  
    readonly state: Boolean;
    readonly responseCode: Number;
    readonly profile: Profile;
  };