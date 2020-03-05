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
  Collapse
} from "reactstrap";

import { decode } from "jsonwebtoken";
import {} from "./../../../services/EndPoints";
import IMGEMAILREQUEST from "./../../../assets/img/request.svg";
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
      srcPDF: ""
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
    // const auth = this.state.auth;
    // const username = decode(auth);
    // fetch(`${TEMPLATE_EMAIL}${id}?username=${username.user_name}`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + auth,
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //       dataTemplate: data
    //     });
    //     console.log(this.state.dataTemplate);
    //   })
    //   .catch(Error => console.log(Error));
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
    const files = [
      {
        id: 1,
        name: "Archivo para radicación PDF_v_1",
        value: "http://www.africau.edu/images/default/sample.pdf"
      },
      {
        id: 2,
        name: "Archivo para radicación PDF_v_2",
        value:
          "https://edwardsib.org/ourpages/auto/2015/9/28/51403017/Cuentos%20Infantiles.pdf"
      },
      {
        id: 3,
        name: "Archivo para radicación PDF_v_3",
        value:
          "http://files.unicef.org/republicadominicana/Manual_de_Cuentos_y_fabulas.pdf"
      }
    ];

    const listFiles = () => {
      return (
        <React.Fragment>
          <ul className="list-group">
            {files.map(listItem => (
              <li
                key={listItem.id}
                className="list-group-item list-group-item-action"
                value={listItem.value}
                onClick={e => {
                  // this.setState({
                  //   srcPDF: listItem.value
                  // });
                  // console.log();
                  fetch(
                    "http://192.168.10.180:8090/api/sgdea/service/filing/emails/view/file/0c29f416-1ad4-4226-b546-7b1db2da6f71/744d45ff-cded-467d-a999-7a94e06c07a5.pdf",
                    {
                      method: "GET",
                      headers: {
                        Authorization: "Bearer " + this.state.auth,
                        "Content-Type": "application/json"
                      }
                    }
                  ).then(response => {
                    console.log(response.url);
                    this.setState({
                      srcPDF: response.url
                    });
                  });
                }}
              >
                {listItem.name}
              </li>
            ))}
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
                      Peticiones vía correo electrónico
                    </a>{" "}
                  </CardHeader>
                  <Collapse isOpen={this.state.collapase}>
                    <CardBody>
                      <div className="row">
                        <div className="col-md-6">
                          <dl className="param">
                            <dt>Archivos</dt>
                            {listFiles()}
                          </dl>
                        </div>
                      </div>
                    </CardBody>
                  </Collapse>
                </Card>
              </Col>
            </Row>
            <MyPdfViewer />
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
ModalViewEmailRequest.propTypes = {
  modal: PropTypes.bool.isRequired,
  authorization: PropTypes.string.isRequired
  //   id: PropTypes.string.isRequired
};
export default ModalViewEmailRequest;
