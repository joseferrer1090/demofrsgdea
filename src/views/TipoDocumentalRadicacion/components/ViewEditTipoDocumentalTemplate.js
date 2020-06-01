import React, { Component } from "react";
import PropType from "prop-types";

class ViewEditTipoDocumentalTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-6" style={{ border: "1px solid red" }}>
            <div className="card">
              <div className="card-header">
                {" "}
                <i className="fa fa-book" /> Informacion del tipo documental
              </div>
              <div className="card-body">
                <p>Probando apenas</p>
              </div>
            </div>
          </div>
          <div className="col-md-6" style={{ border: "1px solid green" }}>
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

export default ViewEditTipoDocumentalTemplate;
