import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Card,
  CardBody,
  Collapse
} from "reactstrap";
import PropTypes from "prop-types";

class ModalViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      collapse2: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleCollapse = () => {
    this.setState({ collapse: !this.state.collapse, collapse2: false });
  };

  toogleCollapse2 = () => {
    this.setState({ collapse2: !this.state.collapse2, collapse: false });
  };

  render() {
    return (
      <Modal className="modal-lg" isOpen={this.state.modal}>
        <ModalHeader> Ver usuario </ModalHeader>
        <ModalBody role="document">
          <Row>
            <Col sm="3">
              <img
                src={"https://via.placeholder.com/150"}
                className="img-thumbnail"
              />
            </Col>
            <Col sm="9">
              <div className="">
                {" "}
                <h5 className="" style={{ borderBottom: "1px solid black" }}>
                  {" "}
                  Datos personales{" "}
                </h5>{" "}
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Identificación </dt>
                      <dd> 1047425246 </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Nombre </dt>
                      <dd> Jose Carlos Ferrer Bermudez</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>E-mail </dt>
                      <dd> jcfb90@gmail.com </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Teléfono </dt>
                      <dd> 301-7923-466 </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Dirección </dt>
                      <dd> Cra 44c # 22 - 86 int 702</dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                      <dt>Fecha de nacimiento </dt>
                      <dd>10/09/1990</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <div className="col-md-12">
              <div className="card card-secondary">
                <div className="card-header">
                  <a
                    onClick={() => {
                      this.toggleCollapse();
                    }}
                  >
                    {" "}
                    Datos laborales{" "}
                  </a>
                </div>
                <Collapse isOpen={this.state.collapse}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Conglomerado </dt>
                            <dd> conglomerado </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Empresa </dt>
                            <dd> empresa </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Sede </dt>
                            <dd> sede </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Dependencia </dt>
                            <dd> dependencia </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Cargo </dt>
                            <dd> cargo </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </Row>
          <Row>
            <div className="col-md-12">
              <div className="card card-secondary">
                <div className="card-header">
                  <a
                    onClick={() => {
                      this.toogleCollapse2();
                    }}
                  >
                    {" "}
                    Datos de seguridad{" "}
                  </a>
                </div>
                <Collapse isOpen={this.state.collapse2}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Usuario </dt>
                            <dd> usuario </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Roles </dt>
                            <dd> roles </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Estado </dt>
                            <dd> estado </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Fecha de creación </dt>
                            <dd> fecha de creación </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <dl className="param">
                            <dt>Fecha de modificación </dt>
                            <dd> fecha de modificación </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </Row>
        </ModalBody>
        <ModalFooter>
          <div>
            <button
              className="btn btn-secondary"
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

ModalViewUser.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewUser;
