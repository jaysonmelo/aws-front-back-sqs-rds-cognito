import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import ProductDataService from "../services/ProductDataService";
import { Link } from "react-router-dom";
import OrderDataService from '../services/OrderDataService';

class ProductsList extends Component {

    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,
            searchName: ''
        };
      }

      componentDidMount() {
        this.retrieveProducts();
      }
    
      onChangeSearchName(e) {
        const searchName = e.target.value;
    
        this.setState({
          searchName: searchName
        });
      }
    
      retrieveProducts() {
        ProductDataService.getAll()
          .then(response => {
            this.setState({
                products: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      refreshList() {
        this.retrieveTutorials();
        this.setState({
          currentProduct: null,
          currentIndex: -1
        });
      }

      createOrder(currentProduct) {
        let order = {
          productId: currentProduct.id,
          createdBy: localStorage.getItem("username"),
          amount: 1,
          orderDate: new Date()
        }
        OrderDataService.create(order)
          .then(response => {
              console.log(response.data);
              })
              .catch(e => {
                  console.log(e);
              });
      }
    
      setActiveProduct(product, index) {
        this.setState({
          currentProduct: product,
          currentIndex: index
        });
      }
    
    searchName() {
        this.setState({
            currentProduct: null,
            currentIndex: -1
        });

        ProductDataService.findByName(this.state.searchName)
            .then(response => {
            this.setState({
                products: response.data
            });
            console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchName, products, currentProduct, currentIndex } = this.state;
    
        return (
          <div>
            <div>
              <label>Search Products</label>
            </div>
            <div>
                    <input
                    type="text"
                    className="form-control input"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={this.onChangeSearchName}
                    />
            </div>
            <br/>
            <div>
                <input
                    className={'btn btn-primary'}
                    type="button"
                    onClick={this.searchName}
                    value={'Search'}
                />
            </div>   
            <br/>
            <div className="list row">    
                <div className="col-md-12">
                <label>Products List</label>
        
                <ul className="list-group">
                    {products &&
                    products.map((product, index) => (
                        <li
                        className={
                            "list-group-item " +
                            (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveProduct(product, index)}
                        key={index}
                        >
                        <h6>{product.productName}</h6>
                        </li>
                    ))}
                </ul>
        
                </div>
                <div className="col-md-6">
                {currentProduct ? (
                    <div>
                    <label>Product</label>
                    <div>
                        <label>
                        <strong>Name:</strong>
                        </label>{" "}
                        <label>{currentProduct.productName}</label>
                    </div>
                    <div>
                        <label>
                        <strong>Description:</strong>
                        </label>{" "}
                        <label>{currentProduct.description}</label>
                    </div>
                    <div>
                        <label>
                        <strong>Price:</strong>
                        </label>{" "}
                        <label>$ {currentProduct.price}</label>
                    </div>
                    <div>
                        <label>
                        <strong>Amount:</strong>
                        </label>{" "}
                        <label>{currentProduct.totalItem}</label>
                    </div>
                    <div>
                        <label>
                        <strong>Updated By:</strong>
                        </label>{" "}
                        <label>{currentProduct.updatedBy}</label>
                    </div>
        
                    <Link
                        to={"/product/" + currentProduct.id}
                        className="btn btn-primary"
                    >
                        Edit
                    </Link>
                    <Button 
                        onClick={() => this.createOrder(currentProduct)}
                        className="btn btn-primary"
                    >
                        Create Order
                    </Button>
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

export default ProductsList;