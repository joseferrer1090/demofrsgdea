import React, { Component } from "react";
import PropTypes from "prop-types";
import { METADATA_ALL } from "./../../../../../services/EndPoints";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { decode } from "jsonwebtoken";
import ModalUpdateMetadata from "./ModalUpdateMetadata";
import ModalUpdateDetails from "./ModalUpdateDetails";

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

class TableContentMetada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      dataMetadata: [],
      hiddenColumnID: false,
      modal: false,
      modaldetails: false,
      id: "",
      idDetails: ""
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
      this.getDataMetadata();
    }
  }

  getDataMetadata = () => {
    const aux = this.state.auth;
    const user = decode(aux);
    fetch(`${METADATA_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + aux
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          dataMetadata: data
        });
      })
      .catch(err => {
        console.log(`Error => ${err.message}`);
      });
  };

  StatusMetadata = (cell, row) => {
    let status;
    if (row.status === 1 || row.status === true) {
      status = <b className="text-success">Metadado Activo</b>;
    } else if (row.status === 0 || row.status === false) {
      status = <b className="text-danger"> Metadato Inactivo</b>;
    }
    return status;
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  openModal(id) {
    this.myModal.toggle(id);
  }

  openModalDetails(id) {
    this.myModalDetails.toggle(id);
  }

  accionesMetadato(cell, row) {
    return (
      <div
      // className="table-actionMenuConglo"
      // style={{ textAlign: "center", padding: "0", marginRight: "40px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModal(row.id);
            this.setState({ id: row.id });
          }}
          title={"Actualizar valores de control"}
        >
          <i className="fa fa-pencil" />
        </button>
      </div>
    );
  }

  accionesDetalles(cell, row) {
    let button;
    if (row.inputType === "select" || row.inputType === "SELECT") {
      button = (
        <button
          type="button"
          title={"Actulizar detalles"}
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalDetails(row.id);
            this.setState({
              idDetails: row.id
            });
          }}
        >
          <i className="fa fa-cog" />
        </button>
      );
    } else if (row.inputType === "radio" || row.inputType === "RADIO") {
      button = (
        <button
          type="button"
          title={"Actulizar detalles"}
          className="btn btn-secondary btn-sm"
          onClick={() => {
            this.openModalDetails(row.id);
            this.setState({
              idDetails: row.id
            });
          }}
        >
          <i className="fa fa-cog" />
        </button>
      );
    } else if (row.inputType === "checkbox" || row.inputType === "CHECKBOX") {
      button = (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          title={"Actulizar detalles"}
          onClick={() => {
            this.openModalDetails(row.id);
            this.setState({
              idDetails: row.id
            });
          }}
        >
          <i className="fa fa-cog" />
        </button>
      );
    }
    return button;
  }

  render() {
    return (
      <div className="card card-body">
        <BootstrapTable
          data={this.state.dataMetadata}
          striped
          hover
          bordered={false}
          condensed={true}
          search
          searchPlaceholder="Buscar"
          pagination
        >
          <TableHeaderColumn
            export={false}
            isKey
            dataField={"id"}
            hidden={!this.state.hiddenColumnID}
          />
          <TableHeaderColumn dataFormat={this.indexN} width={"50"}>
            #
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"name"} dataAlign={"center"} dataSort>
            Nombre
          </TableHeaderColumn>
          <TableHeaderColumn dataField={"inputType"} dataAlign={"center"}>
            Tipo metadato
          </TableHeaderColumn>
          <TableHeaderColumn dataAlign={"center"} dataField={"description"}>
            Descripcion
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField={"status"}
            dataAlign={"center"}
            dataFormat={(cell, row) => this.StatusMetadata(cell, row)}
          >
            Estado
          </TableHeaderColumn>
          <TableHeaderColumn
            dataAlign={"center"}
            dataFormat={(cell, row) => this.accionesMetadato(cell, row)}
          >
            Acciones de control
          </TableHeaderColumn>
          <TableHeaderColumn
            dataAlign={"center"}
            dataFormat={(cell, row) => this.accionesDetalles(cell, row)}
          >
            {" "}
            Acciones de detalles
          </TableHeaderColumn>
        </BootstrapTable>
        <ModalUpdateMetadata
          authorization={this.state.auth}
          modalupdate={this.state.modal}
          id={this.state.id}
          ref={el => (this.myModal = el)}
          refresh={this.getDataMetadata}
        />
        <ModalUpdateDetails
          modaldetails={this.state.modaldetails}
          ref={el => (this.myModalDetails = el)}
          id={this.state.idDetails}
        />
      </div>
    );
  }
}

TableContentMetada.propTypes = {
  authorization: PropTypes.string.isRequired
};

export default TableContentMetada;
