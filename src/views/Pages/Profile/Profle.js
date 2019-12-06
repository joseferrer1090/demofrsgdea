import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, CardTitle } from "reactstrap";
import Tabinformaction from "./components/TabProfile";
import { withTranslation } from "react-i18next";

const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";

class Profle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "/assets/img/avatars/user2.jpg"
    };
    this.inputOpenFileRef = React.createRef();
  }

  onChange = e => {
    let files = e.target.files;
    let dataImg = e.target.files[0];
    console.warn("Data file:", files);
    console.log(e.target.files[0].name);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.setState({ image: e.target.result });
      setTimeout(e => {
        alert(`Se modifico con éxito la imagen:
                  name: ${dataImg.name},
                  size: ${dataImg.size},
                  type: ${dataImg.type}`);
      }, 1000);
    };
  };
  render() {
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="3">
            <div className="card">
              {" "}
              <a
                className="text-center"
                onClick={() => {
                  this.inputOpenFileRef.current.click();
                }}
              >
                <img
                  className="img-thumbnail"
                  // className="img-responsive "
                  src={this.state.image}
                  width="150"
                  height="150"
                  style={{ margin: "10px" }}
                />

                <input
                  multiple={false}
                  accept={acceptedFileTypes}
                  type="file"
                  name="file"
                  style={{ display: "none" }}
                  ref={this.inputOpenFileRef}
                  onChange={e => this.onChange(e)}
                />
              </a>
              <CardTitle>
                <p className="text-center">
                  {" "}
                  Nombre del usuario{" "}
                  <small className="form-text"> Administrador </small>{" "}
                </p>
                <address>
                  <div style={{ margin: "10px " }}>
                    {" "}
                    <p className="text-center">
                      <i className="fa fa-phone-square" />
                      {"   "}+(1234) - 5678910
                    </p>
                    <p className="text-center">
                      <i className="fa fa-envelope" /> {"   "} admin@admin.com
                    </p>
                  </div>
                </address>
              </CardTitle>
            </div>
            <div className="card">
              <div className="card-header">
                {" "}
                <i className="icon-lock" /> {t("user_profile_rol_permission")}{" "}
              </div>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {t("user_profile_rol_permission_list_1")}
                  <span className="badge badge-success badge-pill">
                    activado
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {t("user_profile_rol_permission_list_1")}
                  <span className="badge badge-success badge-pill">
                    activado
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  {t("user_profile_rol_permission_list_2")}
                  <span className="badge badge-success badge-pill">
                    activado
                  </span>
                </li>
              </ul>
            </div>
            <br />
          </Col>
          <Col sm="9">
            <div className="" style={{ height: "200px" }}>
              <Tabinformaction />
            </div>
          </Col>
        </Row>
        <Row />
      </div>
    );
  }
}

Profle.propTypes = {};

export default withTranslation("translations")(Profle);
