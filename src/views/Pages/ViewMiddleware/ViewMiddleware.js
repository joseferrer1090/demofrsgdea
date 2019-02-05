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
  Card,
  Col,
  Row
} from "reactstrap";

import "./../../../css/custom_footer.css";
import "./../../../../node_modules/hover.css/css/hover.css";
import MODULOCONFIGURACON from "./../../../assets/img/icon.svg";
import MODULOCORRESPONDENCIA from "./../../../assets/img/close-envelope.svg";
import MODULOARCHIVO from "./../../../assets/img/archive.svg";
import MODULOWORKFLOW from "./../../../assets/img/workflow2.svg";

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

  redirectCorrespondencia = () => {
    window.location = "http://localhost:3001/";
    return null;
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Navbar color="light" light expand="md">
          <NavbarBrand>Lexco S.A SGDEA</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Usuario
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    {" "}
                    <a href="/" onClick={() => {}}>
                      <i className="fa fa-times" /> Cerrar session
                    </a>
                  </DropdownItem>{" "}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center" />

        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <div className="card-deck mb-3 text-center">
            <div className="col-md-3">
              <Link to="/configuracion" className="hvr-grow">
                <div className="card card-middleware">
                  <div className="card-body">
                    <img src={MODULOCONFIGURACON} width="180" />
                    <div className="text-center">
                      <br />
                      <a style={{ fontSize: "20px" }}>
                        Modulo de configuración
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3">
              <a href="http://localhost:3001/" className="hvr-grow">
                <div className="card card-middleware">
                  <div className="card-body">
                    <img src={MODULOCORRESPONDENCIA} width="200" />
                    <div className="text-center">
                      <a style={{ fontSize: "19px" }}>
                        Modulo de correspondencia
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-3">
              <a href="http://localhost:3002/" className="hvr-grow">
                <div className="card card-middleware">
                  <div className="card-body">
                    <img src={MODULOARCHIVO} width="200" />
                    <div className="text-center">
                      <br />
                      <a style={{ fontSize: "20px" }}>Modulo de archivo </a>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-3">
              <a href="http://localhost:3003/" className="hvr-grow">
                <div className="card card-middleware">
                  <div className="card-body">
                    <img src={MODULOWORKFLOW} width="200" />
                    <div className="text-center">
                      <br />
                      <a style={{ fontSize: "20px" }}>
                        {" "}
                        Modulo de workflow{" "}
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewMiddleware.propTypes = {};

export default ViewMiddleware;
