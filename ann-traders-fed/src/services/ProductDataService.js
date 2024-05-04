import http from "../common/http-common";

class ProductDataService {
  getAll() {
    console.log(process.env.REACT_APP_API_URL);
    return http.get("/products");
  }

  get(id) {
    return http.get("/product?productId=" + id);
  }

  create(data) {
    return http.post("/product", data);
  }

  update(id, data) {
    return http.patch("/product?productId=" + id, data);
  }

  delete(id) {
    return http.delete("/product?productId=" + id);
  }

  findByName(name) {
    return http.get("/products-by-name?productName=" + name);
  }
}

export default new ProductDataService();