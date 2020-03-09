import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import PropTypes from "prop-types";
import ViewComponent from "./ViewComponent";
import { Card, CardHeader, CardBody } from "reactstrap";
import { METADATA_ALL } from "./../../../../../services/EndPoints";
import { decode } from "jsonwebtoken";

const data = [
  {
    createdAt: "2020-03-05T15:07:57.559Z",
    updatedAt: "2020-03-05T15:07:57.559Z",
    id: "fed56cc8-1135-447d-a8de-942283a49660",
    name: "ASDASD",
    description: "asdasd",
    labelText: "asdasd",
    labelClass: "col-sm-2 col-form-label",
    inputId: "asdasd",
    inputType: "text",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "asdasd",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-05T16:26:43.122Z",
    updatedAt: "2020-03-05T16:26:43.122Z",
    id: "d3a10fbe-2b17-40d6-8fbe-fb902be58548",
    name: "SDFSDF",
    description: "sdfsdfsdfsdf",
    labelText: "sdfsdf",
    labelClass: "col-sm-2 col-form-label",
    inputId: "sdfsdf",
    inputType: "date",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-06T13:27:17.242Z",
    updatedAt: "2020-03-06T13:27:17.242Z",
    id: "2e8abcda-9980-4e78-af34-718cded5b5c1",
    name: "ASASDASD",
    description: "",
    labelText: "Title",
    labelClass: "col-sm-2 col-form-label",
    inputId: "asasdasd",
    inputType: "text",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "",
    formula: false,
    status: false
  },
  {
    createdAt: "2020-03-06T13:34:57.040Z",
    updatedAt: "2020-03-06T13:34:57.040Z",
    id: "a91755b0-a1a8-4931-98fb-19c39f83325e",
    name: "DFGCVXCVXC",
    description: "",
    labelText: "Title",
    labelClass: "col-sm-2 col-form-label",
    inputId: "dfgcvxcvxc",
    inputType: "text",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-06T13:39:18.361Z",
    updatedAt: "2020-03-06T13:39:18.361Z",
    id: "b1aa6b01-55fd-48b2-b807-ed363711de0a",
    name: "CDFSDSD",
    description: "asdasd",
    labelText: "Titleasdasd",
    labelClass: "col-sm-2 col-form-label",
    inputId: "cdfsdsd",
    inputType: "text",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "asdasd",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T13:36:01.436Z",
    updatedAt: "2020-03-09T13:36:01.436Z",
    id: "b376cc9e-095f-4f3f-8aa2-460f075315ae",
    name: "JOSECARLOS",
    description: "Nombre de la persona que escribe",
    labelText: "Nombre",
    labelClass: "col-sm-2 col-form-label",
    inputId: "JoseCarlos",
    inputType: "text",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "nombre",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T14:05:44.678Z",
    updatedAt: "2020-03-09T14:05:44.678Z",
    id: "ab72bfa6-e7d1-49ab-aaf2-9ffc4469d8ad",
    name: "PROBANDOSELECT",
    description: "Probando el select",
    labelText: "ProbandoSelect",
    labelClass: "col-sm-2 col-form-label",
    inputId: "ProbandoSelect",
    inputType: "select",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T14:15:30.851Z",
    updatedAt: "2020-03-09T14:15:30.851Z",
    id: "262a34ba-0b17-41f1-9e3f-07cbd83df1fa",
    name: "PROBANDOSELECTMULTIPLE",
    description: "Probando el select multiple",
    labelText: "ProbandoSelectMultiple",
    labelClass: "col-sm-2 col-form-label",
    inputId: "ProbandoSelectMultiple",
    inputType: "select",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T14:23:21.613Z",
    updatedAt: "2020-03-09T14:23:21.613Z",
    id: "8242df74-686f-488b-9f35-e3435fcb86d8",
    name: "PROBANDOSELECT1",
    description: "Probando el select",
    labelText: "ProbandoSelect1",
    labelClass: "col-sm-2 col-form-label",
    inputId: "ProbandoSelect1",
    inputType: "select",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T14:28:48.416Z",
    updatedAt: "2020-03-09T14:28:48.416Z",
    id: "c0f20476-f6bd-4c4f-88f7-0db50a7a86df",
    name: "PROBANDOSELECT2",
    description: "Probando el select2",
    labelText: "ProbandoSelect2",
    labelClass: "col-sm-2 col-form-label",
    inputId: "ProbandoSelect2",
    inputType: "select",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T14:40:42.205Z",
    updatedAt: "2020-03-09T14:40:42.205Z",
    id: "aada2d0a-ab6b-4148-b558-17e8d9db13bb",
    name: "PROBANDOSELECT3",
    description: "Probando el select 3",
    labelText: "ProbandoSelect3",
    labelClass: "col-sm-2 col-form-label",
    inputId: "ProbandoSelect3",
    inputType: "select",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T14:47:08.361Z",
    updatedAt: "2020-03-09T14:47:08.361Z",
    id: "fe1fa7e4-3e05-4648-bd50-0f9bfe5937a6",
    name: "PROBANDOSELECT4",
    description: "probando el select con post",
    labelText: "ProbandoSelect4",
    labelClass: "col-sm-2 col-form-label",
    inputId: "ProbandoSelect4",
    inputType: "select",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "",
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T16:39:48.271Z",
    updatedAt: "2020-03-09T16:39:48.271Z",
    id: "5fd7ee41-a396-4670-b2d9-fb45c93bb786",
    name: "ASAS",
    description: "asas",
    labelText: "asas",
    labelClass: "col-sm-2 col-form-label",
    inputId: "asas",
    inputType: "checkbox",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: null,
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T16:44:19.473Z",
    updatedAt: "2020-03-09T16:44:19.473Z",
    id: "2c38a95d-a7c7-4f71-b2f1-56ec7818f5a4",
    name: "TERMINOSYCONDICIONES",
    description: "Terminos y condiciones",
    labelText: "terminosycondiciones",
    labelClass: "col-sm-2 col-form-label",
    inputId: "terminosycondiciones",
    inputType: "checkbox",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: null,
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T19:28:27.225Z",
    updatedAt: "2020-03-09T19:28:27.225Z",
    id: "02ec4a80-7761-4bc2-a1d8-b1269e53e3e7",
    name: "PROBANDO",
    description: "Probando lo radios",
    labelText: "Probando ",
    labelClass: "col-sm-2 col-form-label",
    inputId: "Probando",
    inputType: "radio",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: null,
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T19:37:02.901Z",
    updatedAt: "2020-03-09T19:37:02.901Z",
    id: "b242f489-d76a-4702-ad69-afba305de315",
    name: "PROBANDORADIO2",
    description: "Probando los radio button",
    labelText: "ProbandoRadio2",
    labelClass: "col-sm-2 col-form-label",
    inputId: "ProbandoRadio2",
    inputType: "radio",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: null,
    formula: false,
    status: true
  },
  {
    createdAt: "2020-03-09T20:45:02.154Z",
    updatedAt: "2020-03-09T20:45:02.154Z",
    id: "0d740791-0c6c-4a03-9a62-88bf14aca0bc",
    name: "PROBANDO2546",
    description: "Probando",
    labelText: "Probando",
    labelClass: "col-sm-2 col-form-label",
    inputId: "Probando2546",
    inputType: "textarea",
    inputClass: "form-control form-control-sm",
    inputPlaceholder: "Probando",
    formula: false,
    status: true
  }
];

class TableContentMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      dataMetada: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization
      });
      this.getDataMetadate();
    }
  }

  getDataMetadate = () => {
    const aux = this.state.auth;
    const user = decode(aux);
    fetch(`${METADATA_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + aux
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          dataMetada: data
        });
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  render() {
    console.log(this.state.dataMetada);
    return (
      <div className="Animated fadeIn">
        <div className="row">
          <div className="col-md-7">
            <Card>
              <CardHeader>
                <i className="fa fa-shopping-bag" /> Bolsa de metadatos
              </CardHeader>
              <CardBody>
                <p>Probando</p>
              </CardBody>
            </Card>
          </div>
          <div className="col-md-5">
            <Card body>
              <div>
                <p>Probando este el componente de informacion</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

TableContentMetadata.propTypes = {};

export default TableContentMetadata;
