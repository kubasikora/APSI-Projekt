import Order from "@/models/Order";
import apiClient from "@/api";
import OrderResponse from "@/models/OrderResponse";
import OrderListResponse from "@/models/OrderListResponse";
import Cookies from "js-cookie";

interface APIOrderBody {
  coord_x: Number;
  coord_y: Number;
  description: String;
}

export default class OrdersService {
  public async addOrder(newOrder: Order): Promise<OrderResponse> {
    try {
      const data: APIOrderBody = {
        coord_x: newOrder.coordinates.x,
        coord_y: newOrder.coordinates.y,
        description: JSON.stringify(newOrder.products)
      };
      apiClient.defaults.headers.post["X-CSRFTOKEN"] = Cookies.get("csrftoken");
      const response = await apiClient.post("/orders/", data);
      return new OrderResponse(true, response.status, response.statusText);
    } catch (err) {
      const response = err.response;
      if (response)
        return new OrderResponse(false, response.status, response.statusText);
      else return new OrderResponse(false, 408, response.statusText);
    }
  }

  public async loadOrders(): Promise<OrderListResponse> {
    try {
      const response = await apiClient.get("/orders");
      console.log(response.data);
      return new OrderListResponse(true, response.status, new Array());
    } catch(err){
      const response = err.response;
      if(response){
        return new OrderListResponse(false, response.status, new Array());
      } else return new OrderListResponse(false, 408, new Array())
    }
  }
}
