import Order from "@/models/Order";

export default class OrderListResponse {
    constructor(state: Boolean, responseCode: Number, list: Array<Order>){
        this.state = state;
        this.responseCode = responseCode;
        this.list = list;
    }
  
    readonly state: Boolean;
    readonly responseCode: Number;
    readonly list: Array<Order>;
  };