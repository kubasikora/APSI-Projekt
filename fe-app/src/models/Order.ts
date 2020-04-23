import Product from './Product';
import Coordinates from './Coordinates'

export default class Order {
    constructor(products: Array<Product>, coordinates: Coordinates){
        this.products = products;
        this.coordinates = coordinates;
    }
  
    readonly products: Array<Product>;
    readonly coordinates: Coordinates;
  };