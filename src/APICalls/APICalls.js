import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import Login from '../Login/Login';
import CreateAccount from '../CreateAccount/CreateAccount';
import SellProducts from '../SellProducts/SellProducts';
import axios from 'axios';
import { Button, ButtonToolbar } from "react-bootstrap/lib/";

class APICalls extends Component {

    state = {
        token: '',
        products: [],
        cart: [],
        showLogin: false,
        showCreateAccount: false,
        sellProducts: false,
        addToStock: false,
        showInventory: false,
        createProduct: false,
        loggedIn: false
    }

    showLogin = () => {
        this.setState({ 
            showLogin: true,
            showCreateAccount: false,
            sellProducts: false,
            addToStock: false,
            showInventory: false,
            createProduct: false
         })
    }

    showCreateAccount = () => {
        this.setState({
            showLogin: false,
            showCreateAccount: true,
            sellProducts: false,
            addToStock: false,
            showInventory: false,
            createProduct: false
        });
    }

    sellProducts = () => {
        this.setState({
            showLogin: false,
            showCreateAccount: false,
            sellProducts: true,
            addToStock: false,
            showInventory: false,
            createProduct: false
        });
    }

    addToStock = () => {
        this.setState({
            showLogin: false,
            showCreateAccount: false,
            sellProducts: false,
            addToStock: true,
            showInventory: false,
            createProduct: false
        });
    }

    showInventory = () => {
        this.setState({
            showLogin: false,
            showCreateAccount: false,
            sellProducts: false,
            addToStock: false,
            showInventory: true,
            createProduct: false
        });
    }

    createProduct = () => {
        this.setState({
            showLogin: false,
            showCreateAccount: false,
            sellProducts: false,
            addToStock: false,
            showInventory: false,
            createProduct: true
        });
    }

    login = (email, password) => {
        axios
            .post("http://localhost:5000/authenticate", {
                email: email,
                password: password
            })
            .then(function (response) {
                // console.log("Your Auth Token is: " + response.data.auth_token);
                this.setState({
                    token: response.data.auth_token,
                    showLogin: false,
                    loggedIn: true
                });
                console.log("Current State Token: " + this.state.token);
                console.log("Logged In? " + this.state.loggedIn)
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    logout = () => {
        axios({
            method: 'delete',
            url: 'http://localhost:5000/logout/',
            headers: { 'Authorization': this.state.token }
        })
            .then(function (response) {
                console.log(response);
                this.setState({ token: '' });
            }.bind(this));

    }

    createAccount = (first_name, last_name, email, password, password_confirm) => {
        console.log(first_name, last_name, email, password, password_confirm);
        axios
            .post("http://localhost:5000/users", {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                password_confirmation: password_confirm
            })
            .then(function (response) {
                console.log("Your Auth Token is: " + response.data.auth_token);
                this.setState({ 
                    token: response.data.auth_token,
                    showCreateAccount: false
                });
                console.log("Current State Token: " + this.state.token);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    getProducts = () => {
        console.log(this.state.token)
        axios({
            method: 'get',
            url: 'http://localhost:5000/products/',
            headers: { 'Authorization': this.state.token }
        })
            .then(function (response) {
                console.log(response);
                this.setState({
                    products: response.data,
                    showInventory: true
                });
            }.bind(this));
    }

    render() {
        return (
            <div>
            <Navigation loggedIn={this.state.loggedIn} login={this.showLogin} logout={this.logout} createAccount={this.showCreateAccount} cart={this.state.cart} />
            <h1>BGA Roar Store Inventory Manager</h1>
            <br />
            <br />
            <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                <Button bsStyle="primary" bsSize="large" onClick={this.sellProducts}>Sell Products</Button>
                <Button bsStyle="danger" bsSize="large" onClick={this.addToStock}>Add to Stock</Button>
                <Button bsStyle="info" bsSize="large" onClick={this.showInventory}>View Inventory</Button>
                <Button bsStyle="success" bsSize="large" onClick={this.createProduct}>Create New Product</Button>
            </ButtonToolbar>
            <br />
            <br />
            { this.state.sellProducts ? <SellProducts getProducts={this.getProducts} products={this.state.products} /> : null }
            {/* { this.state.addToStock ? <AddStockButtons /> : null } */}
            {/* { this.state.showInventory ? <Inventory /> : null } */}
            {/* { this.state.createProduct ? <CreateProduct /> : null } */}
            { this.state.showCreateAccount ? <CreateAccount create={this.createAccount} /> : null }
            { this.state.showLogin ? <Login login={this.login} /> : null }
        </div>);
    }

}

export default APICalls;