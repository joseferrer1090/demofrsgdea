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
      t: this.props.t
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
    console.log(this.state.id);
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${INFO_EMAIL}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          dataInfo: data.filingEmail
        });
        // console.log(this.state.dataTemplate);
      })
      .catch(Error => console.log(Error));
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
    const statusAnswer = data => {
      const { t } = this.props;
      let status;
      if (data === true) {
        status = <b className="text-success"> Completa </b>;
      } else if (data === false) {
        status = <b className="text-danger"> Pendiente </b>;
      }
      return status;
    };
    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Ver</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="3">
                <img src={IMGEMAILREQUEST} className="img-thumbnail" />
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
                        <dt>Remitente</dt>
                        <dd>{dataInfo.sender}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Asunto</dt>
                        <dd>{dataInfo.subject}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Mensaje</dt>
                        <dd>{dataInfo.body}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Respuesta</dt>
                        <dd>{statusAnswer(dataInfo.answer)}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de creación</dt>
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
                        <dt>Fecha de modificación</dt>
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
              {t("app_plantilla_email_modal_info_btn_cerrar")}
            </button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
Modalc.propTypes = {
  modal: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired
  //   id: PropTypes.string.isRequired
};
export default Modalc;
