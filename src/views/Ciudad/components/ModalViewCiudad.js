import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from "reactstrap";
import IMGCITY from "./../../../assets/img/skyline.svg";
import {CITIES} from './../../../services/EndPoints';

class ModalViewCiudad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalview,
      idCity: this.props.id,
      dataCity:{},
      dataDepartment:{},
      dataCountry:{}
     };
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      idCity:id,
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/city/${id}/ccuartas`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataCity: data,
          dataDepartment: data.department,
          dataCountry: data.department.country
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  render() {
    const dataCity = this.state.dataCity
    const dataDepartment = this.state.dataDepartment;
    const dataCountry = this.state.dataCountry;
    const statusCity = data => {
      let status;
      if (data === 1) {
        status = <p className="text-success"> Activo </p>;
      } else if (data === 0) {
        status = <p className="text-danger"> Inactivo </p>;
      }
      return status;
    };
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Ver ciudad </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCITY} className="img-thumbnail" />
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
                        <dt>País </dt>
                        <dd> {dataCountry.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Departamento </dt>
                        <dd> {dataDepartment.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-group">
                       <dl className="param">
                          <dt> Código </dt>
                          <dd> {dataCity.code} </dd>
                       </dl>
                     </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Nombre </dt>
                        <dd> {dataCity.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Estado </dt>
                        <dd> {statusCity(dataCity.status)} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Fecha de creación </dt>
                        <dd> {dataCity.createdAt} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Fecha de modificación </dt>
                        <dd> {dataCity.updatedAt} </dd>
                      </dl>
                    </div>
                  </div>

                </div>
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

ModalViewCiudad.propTypes = {
  modalview: PropTypes.bool.isRequired
};

export default ModalViewCiudad;
