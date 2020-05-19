import Product from './Product';
import Coordinates from './Coordinates'
import { runInThisContext } from 'vm';
import Order from './Order';

export default class TaskVolunteer {
    constructor(id: Number, order: Order, boomer: String){
        this.id = id
        this.order = order
        this.boomer = boomer
        
    }
   
  
    public id: Number;
    public order: Order;
    public boomer: String
  };