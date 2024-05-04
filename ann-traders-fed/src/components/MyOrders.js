import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import OrderDataService from "../services/OrderDataService";
import ProductDataService from "../services/ProductDataService";

class MyOrders extends Component {

    constructor(props) {
        super(props);
        this.retrieveOrders = this.retrieveOrders.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.getProductFromOrders = this.getProductFromOrders.bind(this);

        this.state = {
            orders: [],
            currentOrder: null,
            currentIndex: -1
        };
      }

      componentDidMount() {
        this.retrieveOrders();

      }
    
      retrieveOrders() {
        OrderDataService.getAll(localStorage.getItem("username"))
          .then(response => {
            if (response.data instanceof Array) {
                this.setState({
                    orders: response.data
                });
            }
            this.getProductFromOrders(this.state.orders);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      getProductFromOrders(ordersList) {
        let newOrders = [];
        for( let order of ordersList) {
            ProductDataService.get(order.productId)
                .then(response => {
                    let newOrder = order;
                    newOrder.product = response.data;
                    newOrders.push(newOrder);
                    console.log(response.data);
                    this.setState({
                        orders: newOrders
                    })
                })
                .catch(e => {
                    console.log(e);
                });
        }
      }
    
      refreshList() {
        this.retrieveTutorials();
        this.setState({
          currentOrder: null,
          currentIndex: -1
        });
      }
    
      setActiveProduct(order, index) {
        this.setState({
          currentOrder: order,
          currentIndex: index
        });
      }
    
    render() {
        const { orders, currentOrder, currentIndex } = this.state;
    
        return (
          <div>
            <div className="list row">    
                <div className="col-md-12">
                <label>My Orders</label>
        
                <ul className="list-group">
                    {orders &&
                    orders.map((order, index) => (
                        <li
                        className={
                            "list-group-item " +
                            (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveProduct(order, index)}
                        key={index}
                        >
                        <h6>ID: {order.id}  </h6>
                        <h6>PRODUTO: { order.product ? order.product.productName : "" } </h6>
                        <h6>AMOUNT: {order.amount} </h6>
                        <h6>DATE: {order.orderDate}</h6>
                        </li>
                    ))}
                </ul>
        
                </div>
                <div className="col-md-6">
                {currentOrder ? (
                    <div>
                    <label>Order</label>
                    <div>
                        <label>
                        <strong>Order Id:</strong>
                        </label>{" "}
                        <label>{currentOrder.id}</label>
                    </div>
                    <div>
                        <label>
                        <strong>Product Name:</strong>
                        </label>{" "}
                        <label>{currentOrder.product.productName}</label>
                    </div>
                    <div>
                        <label>
                        <strong>Date:</strong>
                        </label>{" "}
                        <label>{currentOrder.orderDate}</label>
                    </div>
                    <div>
                        <label>
                        <strong>Amount:</strong>
                        </label>{" "}
                        <label>{currentOrder.amount}</label>
                    </div>
                    <div>
                        <label>
                        <strong>Total Price:</strong>
                        </label>{" "}
                        <label>$ {currentOrder.price * currentOrder.amount}</label>
                    </div>

                    </div>
                ) : (
                    <div>
                    </div>
                )}
                </div>
            </div>
        </div>
        );
      }
}

export default MyOrders;