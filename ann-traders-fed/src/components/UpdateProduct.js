import React, { Component } from 'react';
import { withRouter } from '../common/with-router';
import ProductDataService from "../services/ProductDataService";

class UpdateProduct extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeTotalItem = this.onChangeTotalItem.bind(this);
        this.saveProduct = this.updateProduct.bind(this);

        this.state = {
            currentProduct: {
                id: null,
                productName: '',
                description: '',
                price: '',
                totalItem: '',
                updatedBy: localStorage.getItem("username")
            },
            message: ""
        };
      }

      onChangeName(e) {
        const productName = e.target.value;
        this.setState(function(prevState) {
            return {
                currentProduct: {
                ...prevState.currentProduct,
                productName: productName
              }
            };
        });
      }
    
      onChangeDescription(e) {
        const description = e.target.value;
        this.setState(function(prevState) {
            return {
                currentProduct: {
                ...prevState.currentProduct,
                description: description
              }
            };
        });
      }

      onChangePrice(e) {
        const price = e.target.value;
        this.setState(function(prevState) {
            return {
                currentProduct: {
                ...prevState.currentProduct,
                price: price
              }
            };
        });
      }

      onChangeTotalItem(e) {
        const totalItem = e.target.value;
        this.setState(function(prevState) {
            return {
                currentProduct: {
                ...prevState.currentProduct,
                totalItem: totalItem
              }
            };
        });
      }

      componentDidMount() {
        this.getProduct(this.props.router.params.id);
      }

      getProduct(id) {
        ProductDataService.get(id)
          .then(response => {
            this.setState({
                currentProduct: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      updateProduct() {
        var data = {
            id: this.state.currentProduct.id,
            productName: this.state.currentProduct.productName,
            description: this.state.currentProduct.description,
            price: this.state.currentProduct.price,
            totalItem: this.state.currentProduct.totalItem,
            updatedBy: localStorage.getItem("username")
          };

        ProductDataService.update(this.state.currentProduct.id, data)
        .then(response => {
            console.log(response.data);
            this.setState({
                message: "The product was updated successfully!"
            });
          })
          .catch(e => {
            console.log(e);
          });
    }

    render() {
        const { currentProduct } = this.state;

        return (
          <div>            
            <div>
                <label>Update Products</label>
            </div>
            <br/>
            <div>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Product name"
                    value={currentProduct.productName}
                    onChange={this.onChangeName}
                    />
            </div>
            <br/>
            <div>
                    <input
                    type="text"
                    className="form-control input"
                    placeholder="Description product"
                    value={currentProduct.description}
                    onChange={this.onChangeDescription}
                    />
            </div>
            <br/>
            <div>
                    <input
                    type="text"
                    className="form-control input"
                    placeholder="Price product"
                    value={currentProduct.price}
                    onChange={this.onChangePrice}
                    />
            </div>
            <br/>
            <div>
                    <input
                    type="text"
                    className="form-control input"
                    placeholder="Amount product"
                    value={currentProduct.totalItem}
                    onChange={this.onChangeTotalItem}
                    />
            </div>
            <br/>
            <div>
                <input
                    className={'btn btn-primary'}
                    type="button"
                    onClick={this.saveProduct}
                    value={'Update'}
                />
            </div>   
        </div>
        );
      }
}

export default withRouter(UpdateProduct);