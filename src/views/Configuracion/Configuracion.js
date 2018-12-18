import React, { Component } from "react";
import { Button, Col, Row, Jumbotron } from "reactstrap";

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
        <Row>
          <Col md="12">
            <Jumbotron className="border border-secondary">
              <h1 className="display-3">Bienvenido, administrador!</h1>
              <p className="lead">
                Esta la interfaz de bienvenida para el usuario donde salta
                información como su nombre y la ultima conexión
              </p>
              <hr className="my-2" />
              <p>
                <strong> Ultima conexión: </strong>{" "}
                <span>
                  {new Date()
                    .toJSON()
                    .slice(0, 10)
                    .replace(/-/g, "/")}
                </span>
              </p>
              <p className="lead">
                <Button
                  color="primary"
                  onClick={() => {
                    alert("Manual de referencia para el administrador");
                  }}
                >
                  Ver manual
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row />
      </div>
    );
  }
}

export default Configuracion;
