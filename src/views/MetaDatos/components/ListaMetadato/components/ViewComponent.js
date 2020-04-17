import React, { Component } from "react";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";
import { METADATA_VIEW } from "./../../../../../services/EndPoints";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import PreviewComponent from "./PreviewComponent";
import moment from "moment";

class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      id: this.props.idMetadata,
      data: {},
      details: [],
      t: this.props.t,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
    if (props.idMetadata !== state.id) {
      return {
        id: props.idMetadata,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idMetadata !== prevProps.idMetadata) {
      this.setState({
        id: this.props.idMetadata,
        auth: this.props.authorization,
      });
      this.getDataMetadata(this.state.id, this.state.auth);
    } else if (this.props.idMetadata === null || this.props.idMetadata === "") {
    }
    return;
  }

  getDataMetadata = (id, auth) => {
    const aux = auth;
    const username = decode(auth);
    fetch(`${METADATA_VIEW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + aux,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data.metadata.createdAt);
        // console.log(
        //   moment(data.metadata.createdAt).format("DD-MM-YYYY, h:mm:ss a")
        // );
        // console.log(data.metadata.updatedAt);
        // console.log(
        //   moment(data.metadata.updatedAt).format("DD-MM-YYYY, h:mm:ss a")
        // );
        // console.log(data.metadata);
        // console.log(data.details);
        this.setState({
          data: data.metadata,
          details: data.details,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // componentDidMount() {
  //   this.FechaCreacionMetadato();
  //   this.FechaModificacionMetadato();
  // }
  FechaCreacionMetadato = (data) => {
    return moment(data).format("DD-MM-YYYY, h:mm:ss a");
  };
  FechaModificacionMetadato = (data) => {
    return moment(data).format("DD-MM-YYYY, h:mm:ss a");
  };
  render() {
    const aux = this.state.data;
    const { t } = this.state;
    return (
      <div>
        {this.state.id ? (
          <div className="row">
            <div className="col-md-12">
              <Card>
                <CardHeader>
                  <i className="fa fa-pencil" />
                  {aux.name}
                </CardHeader>
                <CardBody>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            {t(
                              "app_metadatos_lista_metadatos_seccion_info_fecha_creacion"
                            )}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            defaultValue={this.FechaCreacionMetadato(
                              aux.createdAt
                            )}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_metadatos_lista_metadatos_seccion_info_fecha_modificacion"
                            )}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            disabled
                            defaultValue={this.FechaModificacionMetadato(
                              aux.updatedAt
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {" "}
                            {t(
                              "app_metadatos_lista_metadatos_seccion_info_nombre"
                            )}{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            defaultValue={aux.name}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>
                            {t(
                              "app_metadatos_lista_metadatos_seccion_info_descripcion"
                            )}
                          </label>
                          <textarea
                            className="form-control form-control-sm"
                            defaultValue={aux.description}
                            disabled
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>
                            {" "}
                            {t(
                              "app_metadatos_lista_metadatos_seccion_info_formula"
                            )}{" "}
                          </label>
                          {aux.formula ? (
                            <p className="text-success">
                              {" "}
                              <b>
                                {t(
                                  "app_metadatos_lista_metadatos_seccion_info_formula_asigando"
                                )}
                              </b>{" "}
                            </p>
                          ) : (
                            <p className="text-danger">
                              <b>
                                {t(
                                  "app_metadatos_lista_metadatos_seccion_info_formula_noAsignado"
                                )}
                              </b>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label>
                          {" "}
                          {t(
                            "app_metadatos_lista_metadatos_seccion_info_estado"
                          )}{" "}
                        </label>
                        {aux.status ? (
                          <p className="text-success">
                            {" "}
                            <b>{t("app_tablas_estado_activo")}</b>{" "}
                          </p>
                        ) : (
                          <p className="text-danger">
                            {" "}
                            <b>{t("app_tablas_estado_inactivo")}</b>{" "}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>
          </div>
        ) : (
          <div className="">
            <p
              style={{
                textAlign: "center",
                padding: "3.5em",
                fontSize: "12pt",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "rgb(170, 170, 170)",
                backgroundColor: "#c8ced3",
                marginBottom: "0rem",
                border: "1px solid grey",
              }}
            >
              {t("app_metadatos_lista_metadatos_seccion_info_title")}
            </p>
          </div>
        )}
        <br />
        <Card>
          <CardHeader>
            <i className="fa fa-eye" />{" "}
            {t("app_metadatos_lista_metadatos_seccion_preview_title_card")}
          </CardHeader>
          <CardBody>
            <p className="alert alert-warning">
              <i className="fa fa-exclamation-triangle" />{" "}
              <b>
                {t("app_metadatos_lista_metadatos_seccion_preview_alert_title")}
              </b>
              <br />
              {t("app_metadatos_lista_metadatos_seccion_preview_alert_info")}
            </p>
            <PreviewComponent
              fromType={aux.inputType}
              labelInput={aux.labelText}
              inputPlaceholder={aux.inputPlaceholder}
              details={this.state.details}
              t={this.state.t}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

ViewComponent.propTypes = {
  idMetadata: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired,
};

export default ViewComponent;
