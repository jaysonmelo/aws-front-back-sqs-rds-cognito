import React, { Component } from 'react';
import ProductDataService from "../services/ProductDataService";

class AddProducts extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.saveProduct = this.saveProduct.bind(this);

        this.state = {
            id: null,
            productName: '',
            description: '',
            price: '',
            totalItem: '',
            updatedBy: localStorage.getItem("username")
        };
      }

      onChangeName(e) {
        this.setState({
          productName: e.target.value
        });
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
      }

      onChangePrice(e) {
        this.setState({
          price: e.target.value
        });
      }

      onChangeAmount(e) {
        this.setState({
          totalItem: e.target.value
        });
      }

      componentDidMount() {
        
      }

      saveProduct() {
        ProductDataService.create(this.state)
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
            
        return (
          <div>
            <div>
              <label>Add Products</label>
            </div>
            <br/>
            <div>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Product name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
            </div>
            <br/>
            <div>
                    <input
                    type="text"
                    className="form-control input"
                    placeholder="Description product"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
            </div>
            <br/>
            <div>
                    <input
                    type="text"
                    className="form-control input"
                    placeholder="Price product"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    />
            </div>
            <br/>
            <div>
                    <input
                    type="text"
                    className="form-control input"
                    placeholder="Amount product"
                    value={this.state.totalItem}
                    onChange={this.onChangeAmount}
                    />
            </div>
            <br/>
            <div>
                <input
                    className={'btn btn-primary'}
                    type="button"
                    onClick={this.saveProduct}
                    value={'Save'}
                />
            </div>   
            
        </div>
        );
      }
}

export default AddProducts;