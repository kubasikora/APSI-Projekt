import Order from '@/models/Order';
import apiClient from '@/api';
import OrderResponse from '@/models/OrderResponse';
import Cookies from 'js-cookie';
import Coordinates from '@/models/Coordinates'
import TaskVolunteer from '@/models/TaskVolunteer'
import Product from '@/models/Product';
import TasksVolunteerResponse from '@/models/TasksVolunteerResponse';
import ProductsResponse from "@/models/ProductsResponse";
import BoomerOrders from '@/store/modules/boomerOrders';

interface APIOrderBody {
  coord_x: Number,
  coord_y: Number,
  comment: String,
  paymentMethod: String
}
export default class OrdersService {
  public async addOrder(newOrder: Order): Promise<OrderResponse> {
    try {
      const data: APIOrderBody = {
        coord_x: newOrder.coordinates.x,
        coord_y: newOrder.coordinates.y,
        comment: newOrder.extra,
        paymentMethod: newOrder.payment
      };
      apiClient.defaults.headers.post["X-CSRFTOKEN"] = Cookies.get("csrftoken");
      const response = await apiClient.post("/orders/", data);
      const id = response.data.id
      let productarray: Array<Object> = []
      newOrder.products.forEach(product => {
        productarray.push({
          countity: product.countity,
          productType: product.productType,
          name: product.name,
          order: id
        })
      })
      await apiClient.post("/orders/productList_" + id, productarray)
      return new OrderResponse(true, response.status, response.statusText);
    } catch (err) {
      const response = err.response;
      if (response)
        return new OrderResponse(false, response.status, response.statusText);
      else return new OrderResponse(false, 408, response.statusText);
    }
  }
  public async getOrders(coordinates: Coordinates, distance: Number): Promise<TasksVolunteerResponse> {
    try {
      distance = Number(distance) / 1000
      const response = await apiClient.get('/orders/orderInRadius_' + coordinates.x + '_' + coordinates.y + '_' + distance);

      const data = response.data
      console.log('info', data)
      let tasksArray: Array<TaskVolunteer> = []
      data.forEach((el: { id: Number; coord_x: Number | undefined; coord_y: Number | undefined; boomer: String; paymentMethod: String; comment: String }) => {
        //   const info = JSON.parse(el.description)
        //   console.log(info)
        //   let products : Array<Product> = []
        //   info.products.forEach((prod: { _description: String | undefined; _category: String | undefined; })=>{
        //       products.push(new Product(prod._description, prod._category))
        //   })
        tasksArray.push(new TaskVolunteer(el.id, new Order([], new Coordinates(el.coord_x, el.coord_y), el.comment, el.paymentMethod), el.boomer))

      })
      console.log('tasks', tasksArray)

      return new TasksVolunteerResponse(true, response.status, tasksArray);
    } catch (err) {
      const response = err.response;
      return new TasksVolunteerResponse(false, response.status, null);

    }
  }

  public async myOrders(): Promise<Array<Order>> {
    try {
      const myOrders = await apiClient.get("/orders/createdOrders");
      const orders = myOrders.data.map(async (order: any) => {
        const productList = await apiClient.get(`/orders/productList_${order.id}`);
        const products = productList.data.map((product: any) => new Product(product.name, product.productType, product.countity));
        return new Order(products, new Coordinates(order.coord_x, order.coord_y), order.comment, order.paymentMethod)
      });
      return Promise.all(orders.reverse());
    } catch(err){
      return new Array<Order>();
    }
  }

  public async assignToOrder(order: TaskVolunteer): Promise<void> {
    try {
      apiClient.defaults.headers.get["X-CSRFTOKEN"] = Cookies.get("csrftoken");
      const me = await apiClient.get("/account/me");
      const data = {
        "status": "accepted",
        "volunteer": Number(me.data.profile.id),
        "boomer": order.boomer,
        "coord_x": order.order.coordinates.x,
        "coord_y": order.order.coordinates.y,
        "comment": order.order.extra,
        "paymentMethod": order.order.payment,
      }

      apiClient.defaults.headers.put["X-CSRFTOKEN"] = Cookies.get("csrftoken");
      const response = await apiClient.put("/orders/" + order.id, data);
      console.log('here', response)

    }
    catch (err) {
      const response = err.response
      console.log(response)

    }
  }
  public async  getUsersOrders(): Promise<TasksVolunteerResponse> {
    try {
      const response = await apiClient.get('/orders/assignedOrders');

      const data = response.data;
      const orders = new Array<TaskVolunteer>();
      for (let item of data) {
        orders.push(new TaskVolunteer(item.id, new Order(undefined, new Coordinates(item.coord_x, item.coord_y), item.comment, item.paymentMethod), item.boomer));
      }
      console.log(orders);
      return new TasksVolunteerResponse(true, response.status, orders);
    }
    catch (err) {
      const response = err.response;
      return new TasksVolunteerResponse(false, response.status, null);
    }
  }

  public async getOrderDetails(orderId: String): Promise<ProductsResponse> {
    try {
      if (!orderId)
        throw new Error("No order id");
      const response = await apiClient.get(`/orders/productList_${orderId}`);
      const data = response.data;
      const products = new Array<Product>();
      for (let item of data) {
        products.push(new Product(item.name, item.productType, item.countity));
      }
      return new ProductsResponse(true, 408, products);
    } catch (err) {
      const response = err.response;
      if (response)
        return new ProductsResponse(false, response.status, null);
      else return new ProductsResponse(false, 408, null);

    }
  }
}