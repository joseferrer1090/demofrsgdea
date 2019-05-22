import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput
} from "reactstrap";

import IMGEMPRESA from "./../../../assets/img/company.svg";

import Select from "react-select";

const dataConglomeradoExample = [
  { value: "1", label: "Conglomerado 1" },
  { value: "2", label: "Conglomerado 2" },
  { value: "3", label: "Conglomerado 3" }
];

class ModalEditEmpresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modaleditempresa,
      selectedOptionUpdateConglomerado: null
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleChangeSelectedOptionUpdateConglomerado = selectedOptionUpdateConglomerado => {
    this.setState({ selectedOptionUpdateConglomerado });
    console.log(`Option selected:`, selectedOptionUpdateConglomerado);
  };

  render() {
    const { selectedOptionUpdateConglomerado } = this.state;
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader> Actualizar empresa </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGEMPRESA} className="img-thumbnail" />
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

                          Conglomerado <span className="text-danger">*</span>{" "}

                        <dd>
                          {" "}
                          <Select
                            onChange={
                              this.handleChangeSelectedOptionUpdateConglomerado
                            }
                            value={this.selectedOptionUpdateConglomerado}
                            options={dataConglomeradoExample}
                          />
                        </dd>
</dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">

                          Código <span className="text-danger">*</span>{" "}

                        <dd>
                          <input type="text" className="form-control" />
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">

                          Nit <span className="text-danger">*</span>{" "}

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

                          Nombre<span className="text-danger">*</span>{" "}

                        <dd>
                          {" "}
                          <input type="text" className="form-control" />{" "}
                        </dd>
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
                  <CardHeader> Mas informacion </CardHeader>
                  <CardBody>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label> Descripción </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            Cargo responsable{" "}

                          </label>
                          <select className="form-control form-control-md">
                            {" "}
                            <option> Seleccione... </option>{" "}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                        <label>
                        {" "}
                        Estado <span className="text-danger">
                          *
                        </span>{" "}
                      </label>
                      <div className="text-justify">
                        <CustomInput
                          type="checkbox"
                          id="CheckEditEmpresa"
                          label="Si esta opción se encuentra activada,
                          Representa que la empresa es visible en el
                          sistema y se podrán realizar operaciones entre
                          cada uno de los módulos correspondientes de la
                          aplicación. En caso contrario la empresa no se
                          elimina del sistema solo quedará inactiva e
                          invisibles para cada uno de los módulos
                          correspondiente del sistema."
                        />
                        </div>
                      </div>
                    </div>
</div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-outline-success">
              {" "}
              <i className="fa fa-pencil" /> Actualizar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditEmpresa.propTypes = {
  modaleditempresa: PropTypes.bool.isRequired
};

export default ModalEditEmpresa;
