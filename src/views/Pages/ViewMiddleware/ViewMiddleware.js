import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card
} from "reactstrap";

import "./../../../css/custom_footer.css";

class ViewMiddleware extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Pricing</h1>
          <p className="lead">
            Quickly build an effective pricing table for your potential
            customers with this Bootstrap example. It's built with default
            Bootstrap components and utilities with little customization.
          </p>
        </div>

        <div className="container">
          <div className="card-deck mb-3 text-center">
            <div className="card mb-4 box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Free</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                  $0 <small className="text-muted">/ mo</small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>10 users included</li>
                  <li>2 GB of storage</li>
                  <li>Email support</li>
                  <li>Help center access</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-outline-primary"
                >
                  Sign up for free
                </button>
              </div>
            </div>
            <div className="card mb-4 box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Pro</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                  $15 <small className="text-muted">/ mo</small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>20 users included</li>
                  <li>10 GB of storage</li>
                  <li>Priority email support</li>
                  <li>Help center access</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-primary"
                >
                  Get started
                </button>
              </div>
            </div>
            <div className="card mb-4 box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Enterprise</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                  $29 <small className="text-muted">/ mo</small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>30 users included</li>
                  <li>15 GB of storage</li>
                  <li>Phone and email support</li>
                  <li>Help center access</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-primary"
                >
                  Contact us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewMiddleware.propTypes = {};

export default ViewMiddleware;
