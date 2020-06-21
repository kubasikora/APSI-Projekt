export default class Product {
    constructor(name: String = "", productType: String = "", countity: String=''){
        this.name = name;
        this.productType = productType;
        this.countity = countity;
        this.isBought = false;
        this.id = undefined;
    }
   
    public id: String | undefined;
    public isBought: Boolean;
    public name: String;
    public productType: String;
    public countity: String;
    public orderId: String;
  };