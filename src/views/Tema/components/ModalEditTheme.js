import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card
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
      <Modal className="modal-xl" isOpen={this.state.modal}>
        <ModalHeader>Editar tema</ModalHeader>
        <ModalBody>
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
            <Col sm="6">
              <div className="form-group">
                <label>
                  Estado <span className="text-danger">*</span>
                </label>
                <select className="form-control form-control-sm">
                  <option>Seleccione</option>
                </select>
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
