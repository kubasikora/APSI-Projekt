import Product from './Product';
import Coordinates from './Coordinates'
import { runInThisContext } from 'vm';

export default class Order {
    constructor(products: Array<Product>= [] , coordinates: Coordinates, extra: String, payment: String){
        this._products = products;
        this._coordinates = coordinates;
        this._extra = extra
        this._payment = payment
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
    get payment(): String{
        return this._payment
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
    set payment(payment: String){
        this._payment = payment
    }
    

    addProduct(newproduct: Product): void{
        this._products.push(newproduct)
    }

    public volunteer: String;
    public volunteerId: String;
    public status: String;
    public id: String;
    private _products: Array<Product>;
    private _coordinates: Coordinates;
    private _extra: String
    private _payment: String
  };