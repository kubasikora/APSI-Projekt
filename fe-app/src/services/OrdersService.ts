import Order from '@/models/Order';

interface APIOrderBody {
    username: String;
    password: String;
  }
export default class OrdersService {
    public async login(newOrder: Order): Promise<OrderResponse> {
      try {
        const data: APIOrderBody = {
          
        };
    //     const response = await apiClient.post("/account/login", data);
    //     return new OrderResponse(true, response.status, response.statusText);
    //   } catch (err) {
    //     const response = err.response;
    //     if (response)
    //       return new OrderResponse(false, response.status, authErrorMessage);
    //     else return new OrderResponse(false, 408, errorMessage);
      }
    }
}