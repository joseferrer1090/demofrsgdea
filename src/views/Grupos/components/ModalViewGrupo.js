import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Collapse,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import IMGGROUPOS from "./../../../assets/img/multiple-users-silhouette.svg";
import moment from "moment";
import Select from "react-select";

class ModalViewPais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      collapse: false,
      id: this.props.id,
      username: "jferrer",
      dataGroup: {}
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    this.getDataGroupById(id);
  };

  getDataGroupById = id => {
    fetch(
      `http://192.168.10.180:7000/api/sgdea/groupuser/${id}?username=${this.state.username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa("sgdea:123456")
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataGroup: data
        });
      })
      .catch(err => console.log("Error", err));
  };

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  FechaCreacionGrupo = data => {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("YYYY-MM-DD, h:mm:ss a");
  };
  FechaModificacionGrupo = data => {
    let updatedAt;
    updatedAt = new Date(data);
    // moment.locale(es);
    return moment(updatedAt).format("YYYY-MM-DD, h:mm:ss a");
  };

  render() {
    const statusGrupo = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success">Activo</b>;
      } else if (data === 0) {
        status = <b className="text-danger">Inactivo</b>;
      }
      return status;
    };

    const data = this.state.dataGroup.users;

    console.log(data);

    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            {" "}
            Ver grupo de usuarios {this.state.dataGroup.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGGROUPOS} className="img-thumbnail" width="170" />
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
                        <dd> {this.state.dataGroup.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Nombre </dt>
                        <dd> {this.state.dataGroup.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Descripción </dt>
                        <dd> {this.state.dataGroup.description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Estado </dt>
                        <dd> {statusGrupo(this.state.dataGroup.status)} </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
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
                      Más informacion{" "}
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de creaciónn </dt>
                              <dd>
                                {this.FechaCreacionGrupo(
                                  this.state.dataGroup.createdAt
                                )}{" "}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Fecha de modificación </dt>
                              <dd>
                                {this.FechaModificacionGrupo(
                                  this.state.dataGroup.updatedAt
                                )}{" "}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <dl className="param">
                              <dt> Usuarios asigandos: </dt>
                              <dd>
                                {""}
                                <Select
                                  options={data.map((aux, id) => {
                                    return { label: aux.name, value: aux.id };
                                  })}
                                />
                              </dd>
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
              className="btn btn-secondary btn-sm"
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

ModalViewPais.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewPais;
