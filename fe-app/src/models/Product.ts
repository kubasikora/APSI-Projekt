export default class Product {
    constructor(description: String = "", category: String = ""){
        this._description = description;
        this._category = category
    }
    get description(): String {
        return this._description
    }
    get category(): String {
        return this._category
    }
    set description(newDescription: String) {
        this._description = newDescription
    }
    set category(newCategory: String) {
        this._category = newCategory
    }
  
    private _description: String;
    private _category: String
  };