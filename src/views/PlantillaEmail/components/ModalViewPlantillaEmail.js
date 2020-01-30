import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col
} from "reactstrap";
import { decode } from "jsonwebtoken";
import { TEMPLATE_EMAIL } from "./../../../services/EndPoints";
import IMGTEMPLATE from "./../../../assets/img/themeEmail.svg";
import moment from "moment";

class ModalViewInfoTemplateEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      dataTemplate: {},
      auth: this.props.authorization,
      id: this.props.id
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
    }
  }

  toggle = id => {
    this.setState({
      modal: !this.state.modal,
      id: id
    });
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TEMPLATE_EMAIL}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataTemplate: data
        });
        console.log(this.state.dataTemplate);
      })
      .catch(Error => console.log(Error));
  };
  FechaCreacionPlantillaEmail(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionPlantillaEmail(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const { dataTemplate } = this.state;
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>
            Plantilla de correo electrónico {dataTemplate.name}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGTEMPLATE} className="img-thumbnail" />
              </Col>
              <Col sm="9">
                <div className="">
                  {" "}
                  <h5 className="" style={{ borderBottom: "1px solid black" }}>
                    {" "}
                    Datos
                  </h5>{" "}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Nombre </dt>
                        <dd>{dataTemplate.name}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Descripción </dt>
                        <dd> {dataTemplate.description} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Asunto </dt>
                        <dd> {dataTemplate.subject} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>De parte de</dt>
                        <dd> {dataTemplate.from} </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Fecha de creación</dt>
                        <dd>
                          {" "}
                          {this.FechaCreacionPlantillaEmail(
                            dataTemplate.createdAt
                          )}{" "}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt> Fecha de modificación</dt>
                        <dd>
                          {" "}
                          {this.FechaModificacionPlantillaEmail(
                            dataTemplate.updatedAt
                          )}{" "}
                        </dd>
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
              <i className="fa fa-times" /> Cerrar
            </button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
ModalViewInfoTemplateEmail.propTypes = {
  modal: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
export default ModalViewInfoTemplateEmail;
