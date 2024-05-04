import http from "../common/http-common";

class OrderDataService {
  getAll(usuario) {
    console.log(process.env.REACT_APP_API_URL);
    return http.get("/orders?createdBy=" + usuario);
  }

  get(id) {
    return http.get("/order?orderId=" + id);
  }

  create(data) {
    return http.post("/order", data);
  }

}

export default new OrderDataService();