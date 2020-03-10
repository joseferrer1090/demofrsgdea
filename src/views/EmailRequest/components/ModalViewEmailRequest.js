import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Toast,
  ToastHeader,
  ToastBody
} from "reactstrap";
import { decode } from "jsonwebtoken";
import { INFO_EMAIL } from "./../../../services/EndPoints";
import moment from "moment";
import MyPdfViewer from "./viewpdf";

class ModalViewEmailRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      dataTemplate: {},
      auth: this.props.authorization,
      id: this.props.id,
      t: this.props.t,
      collapase: true,
      idFile: "",
      FilenameFile: "",
      dataFiles: "",
      noFiles: ""
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
      modal: !this.state.modal
      //   id: id
    });
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
          dataFiles: data.details
        });

        // console.log(this.state.dataTemplate);
      })
      .catch(Error => console.log(Error));
  };

  FechaCreacionEmailRequest() {
    return moment(new Date()).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionEmailRequest(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  toggleCollapse = () => {
    this.setState({
      collapase: !this.state.collapase
    });
  };

  render() {
    const { t } = this.state;

    const listFiles = () => {
      const { dataFiles } = this.state;
      return (
        <React.Fragment>
          <ul className="list-group">
            {dataFiles.length !== 0 ? (
              dataFiles.map(listItem => (
                <li
                  key={listItem.id}
                  className="list-group-item list-group-item-action"
                  value={listItem.id}
                  onClick={e => {
                    this.setState({
                      idFile: listItem.id,
                      FilenameFile: listItem.filename,
                      collapase: !this.state.collapase
                    });
                    console.log(
                      `id: ${listItem.id} -filename: ${listItem.filename}`
                    );
                  }}
                >
                  <i className="fa fa-file-text" /> {listItem.filenameOriginal}
                </li>
              ))
            ) : (
              <Toast>
                <ToastHeader icon="danger">
                  {" "}
                  No se encontraron archivos adjuntos.
                </ToastHeader>
                <ToastBody>
                  {" "}
                  La petición vía correo electrónico no contiene archivos
                  adjuntos.
                </ToastBody>
              </Toast>
            )}
          </ul>
        </React.Fragment>
      );
    };

    return (
      <Fragment>
        <Modal className="modal-lg" isOpen={this.state.modal}>
          <ModalHeader>Ver</ModalHeader>
          <ModalBody>
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
                      <b>Archivos adjuntos</b>
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapase}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <dl className="param">
                            {/* <dt>Archivos</dt> */}
                            {listFiles()}
                          </dl>
                        </div>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
              </Col>
            </Row>
            <MyPdfViewer
              id={this.state.idFile}
              filename={this.state.FilenameFile}
            />
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                this.setState({
                  modal: false,
                  idFile: "",
                  FilenameFile: "",
                  collapase: true
                });
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
ModalViewEmailRequest.propTypes = {
  modal: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired
  //   id: PropTypes.string.isRequired
};
export default ModalViewEmailRequest;
