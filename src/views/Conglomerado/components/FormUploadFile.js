import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";
class FormUploadFile extends Component {
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
    const sampleData = `
Model,mpg,cyl,disp,hp,drat,wt,qsec,vs,am,gear,carb
Mazda RX4,21,6,160,110,3.9,2.62,16.46,0,1,4,4
Mazda RX4 Wag,21,6,160,110,3.9,2.875,17.02,0,1,4,4
Datsun 710,22.8,4,108,93,3.85,2.32,18.61,1,1,4,1
Hornet 4 Drive,21.4,6,258,110,3.08,3.215,19.44,1,0,3,1
Hornet Sportabout,18.7,8,360,175,3.15,3.44,17.02,0,0,3,2
Valiant,18.1,6,225,105,2.76,3.46,20.22,1,0,3,1
Duster 360,14.3,8,360,245,3.21,3.57,15.84,0,0,3,4
Merc 240D,24.4,4,146.7,62,3.69,3.19,20,1,0,4,2
Merc 230,22.8,4,140.8,95,3.92,3.15,22.9,1,0,4,2
Merc 280,19.2,6,167.6,123,3.92,3.44,18.3,1,0,4,4
Merc 280C,17.8,6,167.6,123,3.92,3.44,18.9,1,0,4,4
Merc 450SE,16.4,8,275.8,180,3.07,4.07,17.4,0,0,3,3
Merc 450SL,17.3,8,275.8,180,3.07,3.73,17.6,0,0,3,3
Merc 450SLC,15.2,8,275.8,180,3.07,3.78,18,0,0,3,3
Cadillac Fleetwood,10.4,8,472,205,2.93,5.25,17.98,0,0,3,4
Lincoln Continental,10.4,8,460,215,3,5.424,17.82,0,0,3,4
Chrysler Imperial,14.7,8,440,230,3.23,5.345,17.42,0,0,3,4
Fiat 128,32.4,4,78.7,66,4.08,2.2,19.47,1,1,4,1
`;

    const data = this.state.data.toString();
    console.log(data);
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
                        <br />
                        <input
                          type="file"
                          className="form-control"
                          onChange={this.onChange}
                        />
                        {console.log(this.state.data)}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <div className="pull-right">
                  <button className="btn btn-secondary" onClick={this.onClick}>
                    {" "}
                    <i className="fa fa-upload" /> Cargar informacion
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="12">
            <div className="card">
              <div className="card-body">
                <p>{this.state.data}</p>
                <CsvToHtmlTable
                  data={data}
                  csvDelimiter=","
                  tableClassName="table table-striped table-hover"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormUploadFile;
