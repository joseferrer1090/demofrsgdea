import React, { Component } from "react";
import PropTypes from "prop-types";
import { decode } from "jsonwebtoken";
import { METADATA_VIEW } from "./../../../../../services/EndPoints";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import PreviewComponent from "./PreviewComponent";

class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      id: this.props.idMetadata,
      data: {},
      details: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.idMetadata !== state.id) {
      return {
        id: props.idMetadata
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idMetadata !== prevProps.idMetadata) {
      this.setState({
        id: this.props.idMetadata,
        auth: this.props.authorization
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
        Authorization: "Bearer " + aux
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          data: data.metadata,
          details: data.details
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    const aux = this.state.data;
    console.log(this.state.data);
    console.log(this.state.details);
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
                          <label> Fecha de creacion</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            defaultValue={aux.createdAt}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Fecha de actualizacion</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            disabled
                            defaultValue={aux.updatedAt}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label> Nombre </label>
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
                          <label>Descripcion</label>
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
                          <label> ¿Formula? </label>
                          {aux.formula ? (
                            <p className="text-success"> Asignado </p>
                          ) : (
                            <p className="text-danger">No asignado</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label> ¿ Activo ? </label>
                        {aux.status ? (
                          <p className="text-success"> Activo </p>
                        ) : (
                          <p className="text-danger"> Inactivo </p>
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
                border: "1px solid grey"
              }}
            >
              Seleccione un metadato
            </p>
          </div>
        )}
        <br />
        <Card>
          <CardHeader>
            <i className="fa fa-eye" /> Vista previea del metadato
          </CardHeader>
          <CardBody>
            <p className="alert alert-warning">
              <i className="fa fa-exclamation-triangle" />{" "}
              <b>Vista previa del metadato.</b> Este solo tendra funcionalidad
              en la plantilla donde sea relacionado, en el modulo de
              correspondencia.
            </p>
            <PreviewComponent
              fromType={aux.inputType}
              labelInput={aux.labelText}
              inputPlaceholder={aux.inputPlaceholder}
              details={this.state.details}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

ViewComponent.propTypes = {
  idMetadata: PropTypes.string.isRequired,
  authorization: PropTypes.string.isRequired
};

export default ViewComponent;
