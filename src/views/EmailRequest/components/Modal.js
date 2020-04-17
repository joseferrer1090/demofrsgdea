import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { decode } from "jsonwebtoken";
import { INFO_EMAIL } from "./../../../services/EndPoints";
import IMGEMAILREQUEST from "./../../../assets/img/request.svg";
import moment from "moment";

class Modalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      dataInfo: {},
      auth: this.props.authorization,
      id: this.props.id,
      t: this.props.t,
      spinner: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
  }

  toggle = (id) => {
    this.setState({
      modal: !this.state.modal,
      id: id,
      spinner: true,
    });
    this.getInfoEmailRequest(id);
    setTimeout(() => {
      if (this.state.spinner !== false) {
        this.setState({
          spinner: false,
        });
      }
    }, 2000);
  };
  getInfoEmailRequest = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${INFO_EMAIL}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataInfo: data.filingEmail,
          spinner: false,
        });
        // console.log(this.state.dataTemplate);
      })
      .catch((Error) => {
        console.log(Error);
        this.setState({
          spinner: false,
        });
      });
  };
  FechaCreacionEmailRequest(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  FechaModificacionEmailRequest(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const { dataInfo } = this.state;
    const { t } = this.state;
    const statusAnswer = (data) => {
      const { t } = this.props;
      let status;
      if (data === true) {
        status = (
          <b className="text-success">
            {" "}
            {t("app_emailRequest_modal_ver_estado_completa")}{" "}
          </b>
        );
      } else if (data === false) {
        status = (
          <b className="text-danger">
            {" "}
            {t("app_emailRequest_modal_ver_estado_pendiente")}{" "}
          </b>
        );
      }
      return status;
    };
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>{t("app_emailRequest_modal_ver_titulo")}</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGEMAILREQUEST} className="img-thumbnail" />
              </Col>
              {this.state.spinner !== false ? (
                <center>
                  <br />
                  <Spinner
                    style={{ width: "3rem", height: "3rem" }}
                    type="grow"
                    color="primary"
                  />
                </center>
              ) : (
                <Col sm="9">
                  <div className="">
                    {" "}
                    <h5
                      className=""
                      style={{ borderBottom: "1px solid black" }}
                    >
                      {" "}
                      {t("app_emailRequest_modal_ver_datos")}
                    </h5>{" "}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_emailRequest_modal_ver_remitente")}</dt>
                          <dd>{dataInfo.sender}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_emailRequest_modal_ver_asunto")}</dt>
                          <dd>{dataInfo.subject}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_emailRequest_modal_ver_mensaje")}</dt>
                          <dd>{dataInfo.body}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>{t("app_emailRequest_modal_ver_respuesta")}</dt>
                          <dd>{statusAnswer(dataInfo.answer)}</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_emailRequest_modal_ver_fecha_creacion")}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaCreacionEmailRequest(
                              dataInfo.createdAt
                            )}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <dl className="param">
                          <dt>
                            {t("app_emailRequest_modal_ver_fecha_modificacion")}
                          </dt>
                          <dd>
                            {" "}
                            {this.FechaModificacionEmailRequest(
                              dataInfo.updatedAt
                            )}{" "}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({ modal: false });
              }}
            >
              <i className="fa fa-times" />{" "}
              {t("app_emailRequest_modal_ver_btn_cerrar")}
            </button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
Modalc.propTypes = {
  modal: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired,
  //   id: PropTypes.string.isRequired
};
export default Modalc;
