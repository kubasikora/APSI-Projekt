import Product from './Product';
import Coordinates from './Coordinates'
import { runInThisContext } from 'vm';

export default class Order {
    constructor(products: Array<Product>= [] , coordinates: Coordinates, extra: String){
        this._products = products;
        this._coordinates = coordinates;
        this._extra = extra
    }
    get products():  Array<Product> {
        return this._products
    }
    get coordinates(): Coordinates {
        return this._coordinates
    }
    get extra(): String {
        return this._extra
    }
    set products(newproducts:  Array<Product>) {
        this._products = newproducts
    }
    set coordinates(newcoordinates: Coordinates) {
        this._coordinates = newcoordinates
    }
    set extra(extra: String){
        this._extra = extra
    }
    

    addProduct(newproduct: Product): void{
        this._products.push(newproduct)
    }

  
    private _products: Array<Product>;
    private _coordinates: Coordinates;
    private _extra: String
  };