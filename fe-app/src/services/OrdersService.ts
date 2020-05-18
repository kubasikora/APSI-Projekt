import Order from '@/models/Order';
import apiClient from '@/api';
import OrderResponse from '@/models/OrderResponse';
import Cookies from 'js-cookie';

interface APIOrderBody {
    coord_x: Number,
    coord_y: Number,
    description: String
  }
export default class OrdersService {
    public async addOrder(newOrder: Order): Promise<OrderResponse> {
      try {
        const data: APIOrderBody = {
            coord_x : newOrder.coordinates.x,
            coord_y: newOrder.coordinates.y,
            description: JSON.stringify({products: newOrder.products, extra: newOrder.extra,payment: newOrder.payment})
        };
        console.log(data)
        apiClient.defaults.headers.post["X-CSRFTOKEN"] = Cookies.get("csrftoken");
        const response = await apiClient.post("/orders/", data);
        return new OrderResponse(true, response.status, response.statusText);
      } catch (err) {
        const response = err.response;
        if (response)
          return new OrderResponse(false, response.status,response.statusText );
        else return new OrderResponse(false, 408, response.statusText);
      }
    }
}