import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CustomInput
} from "reactstrap";
import PropTypes from "prop-types";

class ModalEditTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader>Editar tema</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="4">
              <div className="form-group">
                <label> Código </label>
                <input type="text" className="form-control form-control-sm" />
              </div>
            </Col>
            <Col sm="4">
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control form-control-sm" />
              </div>
            </Col>
            <Col sm="4">
              <div className="form-group">
                <label>Descripción</label>
                <input type="text" className="form-control form-control-sm" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <Card body>
                <h5 className="card-title"> Colores en el header </h5>
                <p>Esto son los posibles datos</p>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <h5 className="card-title"> Colores en el footer </h5>
                <p>Esto son los posibles datos</p>
              </Card>
            </Col>
            <Col sm="12">
              <Card body>
                <h5 className="card-title"> Colores en otro componentes</h5>
                <p>Estos son los posibles datos</p>
              </Card>
            </Col>
            <Col sm="12">
              <div className="form-group">
                <CustomInput
                  type="checkbox"
                  id="ExampleInputCheckbox5"
                  label="Aplicar para todo los usuarios"
                />
              </div>
            </Col>
            <Col sm="12">
              <div className="form-group">
                <CustomInput
                  type="checkbox"
                  id="ExampleInputCheckbox6"
                  label="Si esta opción se encuentra activada, Representa que
                             el tema es visible en el sistema y se podrán
                             realizar operaciones entre cada uno de los módulos
                             correspondientes de la aplicación. En caso contrario
                             el tema no se elimina del sistema solo quedará
                             inactiva e invisibles para cada uno de los módulos
                             correspondiente del sistema."
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div>
            <button className="btn btn-success btn-sm">
              {" "}
              <i className="fa fa-pencil" /> Actualizar{" "}
            </button>
            &nbsp;
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              {" "}
              <i className="fa fa-times" /> Cerrar{" "}
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditTheme.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditTheme;
