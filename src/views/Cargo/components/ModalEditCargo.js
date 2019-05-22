import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Table,
  CustomInput
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
                       Código <span className="text-danger">*</span>{" "}
                      <dd>
                        {" "}
                        <input type="text" className="form-control form-control-sm" />{" "}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <dl className="param">
                       Nombre <span className="text-danger">*</span>{" "}
                      <dd>
                        <input type="text" className="form-control form-control-sm" />
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <dl className="param">
                       Descripción
                      <dd>
                        {" "}
                        <textarea type="text" className="form-control" />{" "}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <dl className="param">
                    <label>
                    {" "}
                    Estado <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="text-justify">
                    <CustomInput
                      type="checkbox"
                      id="ExampleCheckboxInput"
                      label=" Si esta opción se encuentra activada, representa
                          que el cargo es visible en el sistema y se podrán
                          realizar operaciones entre cada uno de los módulos
                          correspondientes de la aplicación. En caso
                          contrario el cargo no se elimina del sistema solo
                          quedará inactivo e invisibles para cada uno de los
                          módulos correspondiente del sistema."
                    />
</div>
</dl>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm="12">
              <Table size="sm" striped hover>
                <thead>
                  <tr >
                    <th className="text-center"> Asignar responsabilidades</th>
                    <th></th>
                    <th className="text-center"> Responsable </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>Conglomerado</td>
                    <td>
                      <select className="form-control">
                        {" "}
                        <option>Seleccione</option>{" "}
                      </select>{" "}
                    </td>
                    <td>
                      <CustomInput type="checkbox" id="ExampleCheckbox" />
                    </td>
                  </tr>
                  <tr>
                    <td>Empresa</td>
                    <td>
                      <select className="form-control">
                        {" "}
                        <option>Seleccione</option>{" "}
                      </select>{" "}
                    </td>
                    <td>
                      <CustomInput type="checkbox" id="ExampleCheckbox2" />
                    </td>
                  </tr>
                  <tr>
                    <td>Sede</td>
                    <td>
                      <select className="form-control">
                        {" "}
                        <option>Seleccione</option>{" "}
                      </select>{" "}
                    </td>
                    <td>
                      <CustomInput type="checkbox" id="ExampleCheckbox3" />
                    </td>
                  </tr>
                  <tr>
                    <td>Dependencia</td>
                    <td>
                      <select className="form-control">
                        {" "}
                        <option>Seleccione</option>{" "}
                      </select>{" "}
                    </td>
                    <td>
                      <CustomInput type="checkbox" id="ExampleCheckbox4" />
                    </td>
                  </tr>
                </tbody>
              </Table>
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
