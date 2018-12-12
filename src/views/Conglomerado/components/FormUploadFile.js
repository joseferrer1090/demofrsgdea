import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { FilePond } from "react-filepond";
import PropTypes from "prop-types";
import "./../../../../node_modules/filepond/dist/filepond.css";
import * as XLSX from "xlsx";
class FormUploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="4">
            <div className="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">1. Paso</h5>
                </div>
                <p className="mb-1">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </p>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">2. Paso</h5>
                </div>
                <p className="mb-1">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </p>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">3. Paso</h5>
                </div>
                <p className="mb-1">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </p>
              </a>
            </div>
          </Col>
          <Col md="8">
            <div className="card">
              <div className="card-body">
                <form className="form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>
                          {" "}
                          Separador{" "}
                          <span>
                            {" "}
                            <b> (Para archivos planos) </b>{" "}
                          </span>{" "}
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Titulos</label>
                        <br />
                        &nbsp;
                        <input type="checkbox" />
                        &nbsp;
                        <b>
                          {" "}
                          (El primer registro contiene los titulos de las
                          columnas){" "}
                        </b>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>
                          {" "}
                          Archivo a importar en extension{" "}
                          <span>
                            {" "}
                            <b>CSV</b> <span className="text-danger"> * </span>
                          </span>{" "}
                        </label>
                        <FilePond
                          maxFiles={1}
                          onupdatefiles={filesItems => {
                            this.setState({
                              files: filesItems.map(fileItem => fileItem.file)
                            });
                            console.log(this.state.files);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="pull-right">
                  <buttom className="btn btn-secondary">
                    {" "}
                    <i className="fa fa-upload" /> Cargar informacion
                  </buttom>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="12">
            {this.state.files.length === 0 ? null : (
              <div className="card">
                <div className="card-body">
                  <p>hay data para mostrar</p>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

FormUploadFile.propTypes = {};

export default FormUploadFile;
