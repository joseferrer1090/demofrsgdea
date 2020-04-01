import React, { Component } from "react";
import { Card, CardBody, CardFooter, Row, Col, Alert } from "reactstrap";
import { withTranslation } from "react-i18next";
import { decode } from "jsonwebtoken";
import {
  SEARCH_BY_USERNAME,
  UPDATE_PROFILE
} from "./../../../../services/EndPoints";
class FormUpdateData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.authorization,
      dataPut: {
        id: "",
        name: "",
        birthday: "",
        phone: "",
        direccion: "",
        email: "",
        usuario: ""
      },
      alertError500: false,
      alertError400: false,
      alertSuccess: false
    };
  }
  static getDerivedStaticFromProps(props, state) {
    if (props.auhorization !== state.auth) {
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
      setTimeout(() => {
        this.getProfileByID();
      }, 1000);
    }
    // console.log(decode(this.state.auth));
  }
  // componentDidMount() {
  //   // this.getProfileByID();
  // }

  getProfileByID = () => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${SEARCH_BY_USERNAME}/?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          // data: data,
          idProfile: data.id,
          dataPut: {
            id: data.identification,
            name: data.name,
            birthday: data.birthDate,
            phone: data.phone,
            direccion: data.address,
            email: data.email,
            usuario: data.username
          }
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  sendData = () => {
    const auth = this.state.auth;
    const username = decode(auth);
    const { dataPut } = this.state;
    fetch(`${UPDATE_PROFILE}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      },
      body: JSON.stringify({
        id: this.state.idProfile,
        name: dataPut.name,
        birthDate: dataPut.birthday,
        phone: dataPut.phone,
        address: dataPut.direccion,
        email: dataPut.email,
        userName: dataPut.usuario
      })
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            alertSuccess: true
          });
          setTimeout(() => {
            this.setState(
              {
                alertSuccess: false,
                modal: false
              },
              this.props.updateTable()
            );
          }, 3000);
        } else if (response.status === 400) {
          this.setState({
            alertError400: true
          });
          setTimeout(() => {
            this.setState({
              alertError400: false
            });
          }, 3000);
        } else if (response.status === 500) {
          this.setState({
            alertError500: true
          });
          setTimeout(() => {
            this.setState({
              alertError500: false,
              modal: !this.state.modal
            });
          }, 3000);
        }
      })
      .catch(error => console.log("", error));
  };
  render() {
    const { t } = this.props;
    const { dataPut } = this.state;
    // console.log(dataPut);
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <div className="container">
              <Alert
                className={"text-center"}
                color="danger"
                isOpen={this.state.alertError500}
              >
                Error al actualizar el perfil. Intente nuevamente.
              </Alert>
              <Alert
                className={"text-center"}
                color="danger"
                isOpen={this.state.alertError400}
              >
                Error al actualizar el perfil. Intente nuevamente.
              </Alert>
              <Alert
                className={"text-center"}
                color="success"
                isOpen={this.state.alertSuccess}
              >
                Se ha actualizado el perfil con éxito.
              </Alert>
              <Row>
                <Col sm="6">
                  <div className="form-group">
                    <label> {t("user_profile_tab_1_form_update_1_id")} </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      disabled
                      value={dataPut.id}
                    />
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label>{t("user_profile_tab_1_form_update_1_name")} </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={dataPut.name}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <div className="form-group">
                    <p> {t("user_profile_tab_1_from_update_1_date")} </p>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={dataPut.birthday}
                    />
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label> {t("user_profile_tab_1_from_update_1_tel")} </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={dataPut.phone}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <div className="form-group">
                    <label> {t("user_profile_tab_1_from_update_1_dir")} </label>
                    <input
                      type="text"
                      value={dataPut.direccion}
                      className="form-control form-control-sm"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t("user_profile_tab_1_from_update_1_email")}{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      disabled
                      value={dataPut.email}
                    />
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t("user_profile_tab_1_from_update_1_user")}{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      disabled
                      value={dataPut.usuario}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
          <CardFooter>
            <div className="float-right">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={e => {
                  e.preventDefault();
                  this.sendData();
                }}
              >
                <i className="fa fa-refresh" />{" "}
                {t("user_profile_tab_1_from_update_1_update")}{" "}
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default withTranslation("translations")(FormUpdateData);
