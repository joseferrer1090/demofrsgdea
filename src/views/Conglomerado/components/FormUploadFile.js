import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { CsvToHtmlTable } from "react-csv-to-table";
import UploadForm from "./Forms/UploadForm";

const data = {
  separador: "",
  archivo: [],
  cabeza_titulos: ""
};

const FormUploadFile = props => {
  return (
    <div className="animated fadeIn">
      <UploadForm importarmasivo={data} />
      <br />
    </div>
  );
};

export default FormUploadFile;

{
  /* <Row>
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
        </Row> */
}

// constructor(props) {
//   super(props);
//   this.state = {
//     file: [],
//     data: []
//   };
// }

// onChange = e => {
//   let files = e.target.files;
//   // this.setState({ file: e.target.files[0] });
//   let reader = new FileReader();
//   reader.readAsBinaryString(files[0]);
//   // reader.readAsText(files[0]);
//   // reader.readAsArrayBuffer(files[0]);
//   reader.onload = e => {
//     // console.log(e.target.result);
//     this.setState({ data: e.target.result });
//   };
//   this.setState({
//     file: e.target.files[0]
//   });
// };

// onClick = () => {
//   // console.log(this.state.data);
//   alert("se Envio la data de manera correcta");
// };
