import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import IMGCARGO from "./../../../assets/img/employee.svg";

class ModalEditCargo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaledit
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Actualizar cargo </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="3">
              <img src={IMGCARGO} className="img-thumbnail" />
            </Col>
            <Col sm="9">
              <div className="">
                {" "}
                <h5 className="" style={{ borderBottom: "1px solid black" }}>
                  {" "}
                  Datos{" "}
                </h5>{" "}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Código </dt>
                      <dd>
                        {" "}
                        <input type="text" className="form-control" />{" "}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Nombre </dt>
                      <dd>
                        <input type="text" className="form-control" />
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Descripción </dt>
                      <dd>
                        {" "}
                        <input type="text" className="form-control" />{" "}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt> Estado </dt>
                      <dd>
                        {" "}
                        <select className="form-control">
                          {" "}
                          <option> Seleccione... </option>{" "}
                        </select>{" "}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-success">
            {" "}
            <i className="fa fa-pencil" /> Actualizar{" "}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              this.setState({ modal: false });
            }}
          >
            {" "}
            <i className="fa fa-times" /> Cerrar{" "}
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalEditCargo.propTypes = {
  modaledit: PropTypes.bool.isRequired
};

export default ModalEditCargo;
