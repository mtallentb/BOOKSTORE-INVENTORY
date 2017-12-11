import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap/lib/';


class Navigation extends Component {

    state = {
        loggedIn: this.props.loggedIn,
        cart: this.props.cart
    }

    render() {
      return <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a>Inventory Manager</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            {this.state.loggedIn ?  
              <NavItem eventKey={1}>
                Cart ({this.state.cart.length})
              </NavItem>
              :
              <NavItem eventKey={2} onClick={this.props.login}>
                Login
              </NavItem>}
            {this.state.loggedIn ? 
              <NavItem eventKey={3} onClick={this.props.logout}>
              Logout
              </NavItem>
              :
              <NavItem eventKey={3} onClick={this.props.createAccount}>
                Create Account
              </NavItem>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>;
    }
};

export default Navigation;
