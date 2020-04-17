import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Card,
  CardHeader,
  Collapse,
  CardBody
} from "reactstrap";
import IMGPLANTILLA from "./../../../assets/img/puzzle-pieces.svg";
import { TEMPLATE_SHOW } from "./../../../services/EndPoints";
import { decode } from "jsonwebtoken";
import moment from "moment";

class ModalViewPlantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      id: this.props.idPlantilla,
      auth: this.props.authorization,
      dataTemplate: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
        id: props.idPlantilla
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.idPlantilla
      });
    }
  }

  getDataTemplate = (id, auth) => {
    const username = decode(auth);
    fetch(`${TEMPLATE_SHOW}/${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          dataTemplate: data
        });
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
    // console.log({ id: id, auth: this.state.auth });
  };

  toggle = id => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    this.getDataTemplate(id, this.state.auth);
  };

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  render() {
    const data = this.state.dataTemplate;
    const statusPlantilla = data => {
      let status;
      if (data === 1) {
        status = <p className="text-success">Plantilla activada</p>;
      } else if (data === 0) {
        status = <p className="text-danger"> Plantilla inactiva</p>;
      }
      return status;
    };
    const fecha = data => {
      let date;
      date = new Date(data);
      return moment(date).format("DD-MM-YYYY, h:mm:ss a");
    };
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Ver plantilla {data.name} </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGPLANTILLA} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Datos plantilla{" "}
                  </h5>{" "}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Código </dt>
                        <dd> {data.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd>{data.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Descripción </dt>
                        <dd>{data.description}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Unidad de correspondencia </dt>
                        <dd> unidad de correspondencia </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Conglomerado </dt>
                        <dd> conglomerado</dd>
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
                </div>
              </Col>
              <br />
              <Col sm="12">
                <Card>
                  <CardHeader>
                    {" "}
                    <a
                      onClick={() => {
                        this.toggleCollapse();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      Más información{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Sede </dt>
                              <dd>sede </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Dependencias asociadas </dt>
                              <dd> dependencias asociadas </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>platilla </dt>
                              <dd> plantilla </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>índices de la plantialla </dt>
                              <dd> índices de la plantilla </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Estado </dt>
                              <dd> {statusPlantilla(data.status)} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Fecha de creación </dt>
                              <dd> {fecha(data.createdAt)} </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt>Fecha de modificación </dt>
                              <dd>{fecha(data.updatedAt)}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
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
      </div>
    );
  }
}

ModalViewPlantilla.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewPlantilla;
