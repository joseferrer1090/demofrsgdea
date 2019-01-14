import React, { Component } from "react";
import { Button, Col, Row, Jumbotron, Card } from "reactstrap";
import Img1 from "./../../assets/img/proceso-de-gestion-documental.svg";
import "./../../css/custom_css.css";

class Configuracion extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Cargando...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <section className="showcase">
            <div className="container-fluid p-0">
              <div className="row no-gutters">
                <div
                  className="col-lg-6 order-lg-2 text-white showcase-img"
                  style={{
                    backgroundImage:
                      "url(" + "assets/img/GESTIONDOCUMENTAL.jpg" + ")",
                    height: "480px"
                  }}
                />
                <div className="col-lg-6 order-lg-2 my-auto showcase-text">
                  <div className="container">
                    <h2>Fully Responsive Design</h2>
                    <p className="lead mb-0">
                      When you use a theme created by Start Bootstrap, you know
                      that the theme will look great on any device, whether it's
                      a phone, tablet, or desktop the page will behave
                      responsively!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card card-body" />
          </div>
          <div className="col-md-4">
            <div className="card card-body" />
          </div>
          <div className="col-md-4">
            <div className="card card-body" />
          </div>
        </div>
      </div>
    );
  }
}

export default Configuracion;
