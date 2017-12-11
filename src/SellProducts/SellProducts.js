import React, { Component } from 'react';
import Buttons from './Buttons/Buttons';
import { ButtonToolbar } from 'react-bootstrap/lib/';

class SellProducts extends Component {
    state = {
        products: this.props.products,
        cart: []
    }

    loadProducts = () => {
        console.log("Loading...");
        return new Promise((resolve, reject) => {
            return this.props.getProducts();
        })
        .then((products) => {
            console.log(products);
        });
    }

    componentDidMount() {
        console.log("Product Buttons Mounted!");
        // this.props.getProducts();
        this.loadProducts();
        console.log(this.state.products)
    }

    // addToCart = (product) => {
    //     let cart = this.state.cart;
    //     cart.push(product);
    //     console.log(cart);
    //     this.setState({ cart: cart })
    // }

    render() {
        const products = this.state.products.map(product => {
            return <Buttons key={product.id} name={product.product_name} quantity={product.quantity} click={() => this.addToCart(product.product_name)} />
        });

        return (
            <div style={{ margin: 10 }} >
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(0, 4)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(4, 8)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(8, 12)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(12, 16)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(16, 20)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(20, 24)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(24, 28)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(28, 32)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(32, 36)}
                </ButtonToolbar>
                <ButtonToolbar style={{ justifyContent: "center", display: "flex" }}>
                    {products.slice(36, 40)}
                </ButtonToolbar>
            </div>
        );
    }
}

export default SellProducts;