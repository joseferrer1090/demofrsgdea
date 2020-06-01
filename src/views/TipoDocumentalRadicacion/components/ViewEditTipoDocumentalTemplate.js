import React, { Component } from "react";
import { TYPEDOCUMENTARY_SHOW } from "./../../../services/EndPoints";
import PropType from "prop-types";
import { decode } from "jsonwebtoken";

class ViewEditTipoDocumentalTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datatypedocumentary: {},
      id: this.props.match.params.id,
      auth: this.props.authorization,
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
        });
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  };

  render() {
    const { datatypedocumentary } = this.state;
    console.log(datatypedocumentary);
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                {" "}
                <i className="fa fa-book" /> Informacion del tipo documental -{" "}
                {datatypedocumentary.name}
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Codigo</label>
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
                        <label>Nombre</label>
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
                        <label>Tipo de correspondencia</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={datatypedocumentary.typeCorrespondence}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                          className="form-control form-contorl-sm"
                          value={datatypedocumentary.description}
                          disabled
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Estado</label>
                        <p>{datatypedocumentary.status}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Asunto</label>
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
                        <label>Fecha de creacion</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={datatypedocumentary.createdAt}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Fecha de modificacion</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={datatypedocumentary.updatedAt}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <i className="fa fa-users" /> Usuarios asociados al tipo
                documental
              </div>
              <div className="card-body">
                <p>Probnado</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                {" "}
                <i className="fa fa-wpforms" /> Valores de la plantilla asociada
              </div>
              <div className="card-body">
                <p>Probnado apenas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewEditTipoDocumentalTemplate.propTypes = {};

export default ViewEditTipoDocumentalTemplate;
