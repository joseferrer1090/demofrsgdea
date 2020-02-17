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
import {} from "./../../../services/EndPoints";
import IMGEMAILREQUEST from "./../../../assets/img/request.svg";
import moment from "moment";

class Modalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      dataTemplate: {},
      auth: this.props.authorization,
      id: this.props.id,
      t: this.props.t
    };
  }

  //   static getDerivedStateFromProps(props, state) {
  //     if (props.authorization !== state.auth) {
  //       return {
  //         auth: props.authorization
  //       };
  //     }
  //   }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.props.authorization !== prevProps.authorization) {
  //       this.setState({
  //         auth: this.props.authorization
  //       });
  //     }
  //   }

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

  render() {
    const { dataTemplate } = this.state;
    const { t } = this.state;
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
                        <dt>Dato 1</dt>
                        <dd>Dato 1</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Dato 2 </dt>
                        <dd> Dato 2 </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Dato 3 </dt>
                        <dd> Dato 3 </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Dato 4</dt>
                        <dd> Dato 4</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <dl className="param">
                        <dt>Fecha de recepción</dt>
                        <dd> {this.FechaCreacionEmailRequest()} </dd>
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
