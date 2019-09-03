import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import IMGCONGLOMERADO from "./../../../assets/img/puzzle.svg";
import { Trans } from "react-i18next";

class ModalViewConglomerado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalviewstate,
      id: this.props.id,
      dataConglomerado: {},
      t: this.props.t
    };
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    fetch(`http://192.168.10.180:7000/api/sgdea/conglomerate/${id}/ccuartas`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + window.btoa("sgdea:123456"),
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataConglomerado: data
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  render() {
    const statusConglomerado = data => {
      let status;
      if (data === 1) {
        status = <b className="text-success"> Activo </b>;
      } else if (data === 0) {
        status = <b className="text-danger"> Inactivo </b>;
      }
      return status;
    };
    return (
      <div>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            <Trans>{this.props.t("app_conglomerado_modal_ver_titulo")}</Trans>{" "}
            {this.state.dataConglomerado.name}{" "}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGCONGLOMERADO} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    <Trans>
                      {this.props.t("app_conglomerado_modal_ver_titulo_2")}
                    </Trans>{" "}
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {" "}
                          {this.props.t(
                            "app_conglomerado_modal_ver_codigo"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.code} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {" "}
                          {this.props.t(
                            "app_conglomerado_modal_ver_nombre"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.name} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {" "}
                          {this.props.t(
                            "app_conglomerado_modal_ver_descripcion"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {" "}
                          {this.props.t(
                            "app_conglomerado_modal_ver_estado"
                          )}{" "}
                        </dt>
                        <dd>
                          {" "}
                          {statusConglomerado(
                            this.state.dataConglomerado.status
                          )}{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            "app_conglomerado_modal_ver_fecha_creacion"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.createdAt} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>
                          {this.props.t(
                            "app_conglomerado_modal_ver_fecha_modificacion"
                          )}{" "}
                        </dt>
                        <dd> {this.state.dataConglomerado.updatedAt} </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" />{" "}
              {this.props.t("app_conglomerado_modal_ver_botom")}{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalViewConglomerado.propTypes = {
  modalviewstate: PropTypes.bool.isRequired,
  t: PropTypes.any
};

export default ModalViewConglomerado;
