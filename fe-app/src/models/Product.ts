export default class Product {
    constructor(name: String = "", productType: String = "", countity: String=''){
        this.name = name;
        this.productType = productType
        this.countity = countity
    }
   
  
    public name: String;
    public productType: String
    public countity: String
  };