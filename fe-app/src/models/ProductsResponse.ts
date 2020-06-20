import Product from "@/models/Product";

export default class ProductsResponse {
    constructor(state: Boolean, responseCode: Number, arr: Array<Product> | null){
        this.state = state;
        this.responseCode = responseCode;
        if(arr) 
            this.products = arr;
    }
  
    readonly state: Boolean;
    readonly responseCode: Number;
    readonly products: Array<Product>;
  };