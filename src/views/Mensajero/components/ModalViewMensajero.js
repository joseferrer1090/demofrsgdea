import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col
} from "reactstrap";
import ImgMensajero from "./../../../assets/img/courier.svg";
import PropTypes from "prop-types";


class ModalViewMensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      id: this.props.id,
      dataMessenger:{}
    };
  }

  toggle = (id) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      id: id
      }));
      fetch(`http://192.168.10.180:7000/api/sgdea/messenger/${id}/ccuartas`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataMessenger: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  render() {
    const statusMessenger = data => {
      let status;
      if (data === 1) {
        status = <p className="text-success"> Activo </p>;
      } else if (data === 0) {
        status = <p className="text-danger"> Inactivo </p>;
      }
      return status;
    };
    const identification = this.state.dataMessenger.identification;
    const name = this.state.dataMessenger.name;
    const description = this.state.dataMessenger.description;
    const status = this.state.dataMessenger.status;
    const createdAt = this.state.dataMessenger.createdAt;
    const updatedAt = this.state.dataMessenger.updatedAt;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Ver Mensajero</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={ImgMensajero} />
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
                        <dt>Identificación </dt>
                        <dd>{identification} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd> {name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Descripción </dt>
                        <dd> {description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Estado </dt>
                        <dd> {statusMessenger(status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de creación </dt>
                        <dd> {createdAt} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de modificación </dt>
                        <dd> {updatedAt} </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
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

ModalViewMensajero.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewMensajero;
