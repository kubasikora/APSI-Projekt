import Product from './Product';
import Coordinates from './Coordinates'

export default class Order {
    constructor(products: Array<Product>= [] , coordinates: Coordinates){
        this._products = products;
        this._coordinates = coordinates;
    }
    get products():  Array<Product> {
        return this._products
    }
    get coordinates(): Coordinates {
        return this._coordinates
    }
    set products(newproducts:  Array<Product>) {
        this._products = newproducts
    }
    set coordinates(newcoordinates: Coordinates) {
        this._coordinates = newcoordinates
    }

    addProduct(newproduct: Product): void{
        this._products.push(newproduct)
    }

  
    private _products: Array<Product>;
    private _coordinates: Coordinates;
  };