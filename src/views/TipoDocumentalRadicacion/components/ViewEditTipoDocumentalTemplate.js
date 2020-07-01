import React, { Component } from "react";
import { TYPEDOCUMENTARY_SHOW } from "./../../../services/EndPoints";
import TableModal from "./TableModalViewTipoDocumental";
import PropType from "prop-types";
import { decode } from "jsonwebtoken";
import moment from "moment";
import { withTranslation } from "react-i18next";
import EditValues from "./EditTemplateValues";

class ViewEditTipoDocumentalTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datatypedocumentary: {},
      users: [],
      id: this.props.match.params.id,
      auth: this.props.authorization,
      t: this.props.t,
    };
  }

  componentDidMount() {
    this.getDataTypeProcedure(this.state.id);
  }

  getDataTypeProcedure = (id) => {
    const auth = this.state.auth;
    const username = decode(auth);
    fetch(`${TYPEDOCUMENTARY_SHOW}${id}?username=${username.user_name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          datatypedocumentary: data.typeDocumentary,
          users: data.users,
        });
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  };

  FechaCreacionTipoTramite(data) {
    let createdAt;
    createdAt = new Date(data);
    return moment(createdAt).format("DD-MM-YYYY, h:mm:ss a");
  }
  FechaModificacionTipoTramite(data) {
    let updatedAt;
    updatedAt = new Date(data);
    return moment(updatedAt).format("DD-MM-YYYY, h:mm:ss a");
  }

  render() {
    const { datatypedocumentary } = this.state;
    const { users } = this.state;
    const { t } = this.state;
    const TypeCorrespondence = (data) => {
      let type;
      if (data === 1) {
        type = "correspondencia recibida";
      } else if (data === 2) {
        type = "correspondencia despachada";
      } else if (data === 3) {
        type = "correspondencia interna";
      }
      return type;
    };
    const statusTipoDocumentalRadicacion = (data) => {
      let status;
      if (data === 1) {
        status = "Activo";
      } else if (data === 0) {
        status = "Inactivo";
      }
      return status;
    };
    const back = (e) => {
      e.preventDefault();
      let path = `#/configuracion/tipodocumentalradicacion`;
      window.location.replace(path);
    };

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                {" "}
                <i className="fa fa-book" />{" "}
                {t("app_documentalRadicacion_editar_plantilla_titulo_1")} -{" "}
                {datatypedocumentary.name}
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_documentalRadicacion_editar_plantilla_info_codigo"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={datatypedocumentary.code}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_documentalRadicacion_editar_plantilla_info_nombre"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={datatypedocumentary.name}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_documentalRadicacion_editar_plantilla_info_tipo_correspondencia"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={TypeCorrespondence(
                            datatypedocumentary.typeCorrespondence
                          )}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_documentalRadicacion_editar_plantilla_info_descripcion"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-contorl-sm"
                          value={datatypedocumentary.description}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_documentalRadicacion_editar_plantilla_info_estado"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={statusTipoDocumentalRadicacion(
                            datatypedocumentary.status
                          )}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_documentalRadicacion_editar_plantilla_info_asunto"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={datatypedocumentary.issue}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_documentalRadicacion_editar_plantilla_info_fecha_creacion"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.FechaCreacionTipoTramite(
                            datatypedocumentary.createdAt
                          )}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {t(
                            "app_documentalRadicacion_editar_plantilla_info_fecha_modificacion"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.FechaModificacionTipoTramite(
                            datatypedocumentary.updatedAt
                          )}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <EditValues
              t={this.props.t}
              auth={this.state.auth}
              id={this.state.id}
              dataComplete={this.state.datatypedocumentary}
              dataTemplate={this.state.datatypedocumentary.template}
            />
          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-users" />{" "}
                {t("app_documentalRadicacion_editar_plantilla_titulo_2_table")}
              </div>
              <div className="card-body">
                {users ? (
                  <TableModal data={users} t={this.props.t} />
                ) : (
                  <p>No hay usuarios asociados</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="animated fadeIn">
              {" "}
              <div className="card">
                <div className="card-footer">
                  {" "}
                  <div className="float-right">
                    <button
                      style={{ margin: 5 }}
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        back(e);
                      }}
                    >
                      {" "}
                      <i className="fa fa-times" />{" "}
                      {t(
                        "app_documentalRadicacion_editar_plantilla_btn_cerrar"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewEditTipoDocumentalTemplate.propTypes = {};

export default withTranslation("translations")(ViewEditTipoDocumentalTemplate);
