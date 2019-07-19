import React from "react";
import UploadForm from "./Forms/UploadForm";

const data = {
  separador: "",
  cabeza_titulos: "",
  archivo: []
};

const FormUploadFile = () => {
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

  // const data = this.state.data.toString();
  // console.log(data);
  return (
    <div className="animated fadeIn">
      <UploadForm cargo={data} />
    </div>
  );
};

export default FormUploadFile;
