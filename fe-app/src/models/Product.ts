export default class Product {
    constructor(name: String = "", productType: String = "", countity: Number=0){
        this.name = name;
        this.productType = productType
        this.countity = countity
    }
   
  
    public name: String;
    public productType: String
    public countity: Number
  };