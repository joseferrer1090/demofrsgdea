import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";

class FormImportDepartamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      data: []
    };
  }

  onChange = e => {
    let files = e.target.files;
    // this.setState({ file: e.target.files[0] });
    let reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    // reader.readAsText(files[0]);
    // reader.readAsArrayBuffer(files[0]);
    reader.onload = e => {
      // console.log(e.target.result);
      this.setState({ data: e.target.result });
    };
    this.setState({
      file: e.target.files[0]
    });
  };

  onClick = () => {
    // console.log(this.state.data);
    alert("se Envio la data de manera correcta");
  };

  render() {
    const data = this.state.data.toString();
    console.log(data);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="4">
            <div className="list-group">
              <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">1. Paso</h5>
                </div>
                <p className="mb-1" style={{ textAlign: "justify" }}>
                  1. Descargue la plantilla de formato de importación de datos
                  (Link). Abre el archivo , proceda a rellenar los campos
                  indicados en el formato y guarde los cambios.
                </p>
              </a>
              <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">2. Paso</h5>
                </div>
                <p className="mb-1" style={{ textAlign: "justify" }}>
                  Si desea importar un archivo plano debe indicar el separador
                  de los campos. Si el primer registro del archivo contiene los
                  títulos debe marcar el check “Títulos”.
                </p>
              </a>
              <a className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">3. Paso</h5>
                </div>
                <p className="mb-1" style={{ textAlign: "justify" }}>
                  Haga clic en la opción “Seleccionar archivo” y seleccione el
                  archivo de formato de importación de los datos al cual le
                  agrego los campos requeridos. Haga clic en la opción “Cargar
                  información”.
                </p>
              </a>
            </div>
          </Col>
          <Col md="8">
            <div className="card">
              <div className="card-body">
                <form className="form" encType="multipart/form-data">
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
                        <input
                          type="text"
                          className="form-control form-control-sm"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Títulos</label>
                        <br />
                        &nbsp;
                        <input type="checkbox" />
                        &nbsp;
                        <b>
                          {" "}
                          (El primer registro contiene los títulos de las
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
                          Archivo a importar en extensión{" "}
                          <span>
                            {" "}
                            <b>CSV</b> <span className="text-danger"> * </span>
                          </span>{" "}
                        </label>
                        <br />
                        <input
                          type="file"
                          className="form-control"
                          onChange={this.onChange}
                          accept={".csv"}
                        />
                        {console.log(this.state.data)}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="pull-right">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={this.onClick}
                  >
                    {" "}
                    <i className="fa fa-upload" /> Cargar información
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="12">
            {data ? (
              <div className="card">
                <div className="card-body">
                  <CsvToHtmlTable
                    data={data}
                    csvDelimiter=","
                    tableClassName="table table-striped table-hover table-bordered"
                  />
                </div>
              </div>
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormImportDepartamento;
