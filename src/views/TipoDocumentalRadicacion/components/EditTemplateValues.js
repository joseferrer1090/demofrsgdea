import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  GET_METADATA_FOR_TYPE_DOCUMENTARY,
  THIRDPARTYS_STATUS,
} from "./../../../services/EndPoints";
import Inputs from "./../components/Forms/components/Inputs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ModalEditValues from "./ModalEditValuesTemplate";

class EditTemplateValues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      auth: this.props.auth,
      data: [],
      dataComplete: this.props.dataComplete,
      dataAux: [],
      modaledit: false,
      newArray: [],
    };
  }

  componentDidMount() {
    this.getData(this.state.id, this.state.auth);
  }

  getData = (id, auth) => {
    fetch(`${GET_METADATA_FOR_TYPE_DOCUMENTARY}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
          dataAux: data.map((aux) => aux.metadata.elementConfig),
          newArray: data.map((aux, id) => {
            return { id: aux.id, dataInputs: aux.metadata.elementConfig };
          }),
        });
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  };

  editValueTemplate = (cell, row) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          title="Editar valor de la plantilla"
          onClick={() => this.OpenModalEdit(row.type)}
        >
          <i className="fa fa-pencil" />
        </button>
      </div>
    );
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  OpenModalEdit(type) {
    this.ModalEditRef.toggle(type);
  }

  render() {
    //console.log(this.props);
    // console.log(this.state.dataAux.map((x) => x.elementConfig));
    // console.log(this.state.dataAux);
    //console.log(this.state.data);
    // console.log(
    //   this.state.data.map((aux, id) => {
    //     return {
    //       id: aux.id,
    //       dataInputs: aux.metadata.elementConfig,
    //     };
    //   })
    // );
    console.log(this.state.newArray);
    return (
      <div className="animated fadeIn">
        {" "}
        <div className="card">
          <div className="card-header">
            {" "}
            <i className="fa fa-wpforms" /> Valores de la plantilla asociada
          </div>
          <div className="card-body">
            <BootstrapTable
              data={this.state.dataAux}
              striped
              hover
              condensed
              bordered={false}
            >
              <TableHeaderColumn
                isKey
                dataField="id"
                dataFormat={this.indexN}
                width="50"
                dataAlign="center"
              >
                #
              </TableHeaderColumn>
              <TableHeaderColumn dataField="labeltext" dataAlign="center">
                Label Text
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataAlign="center">
                Nombre
              </TableHeaderColumn>
              <TableHeaderColumn dataField="type" dataAlign="center">
                Tipo
              </TableHeaderColumn>
              <TableHeaderColumn
                dataAlign="center"
                dataFormat={(cell, row) => this.editValueTemplate(cell, row)}
              >
                Editar
              </TableHeaderColumn>
            </BootstrapTable>
            {/* {this.state.data ? (
              this.state.data.map((aux, id) => (
                <Inputs
                  key={id}
                  value={aux.value}
                  formType={aux.metadata.elementConfig.type}
                  elementConfig={aux.metadata.elementConfig}
                />
              ))
            ) : (
              <p className="text-danger">No hay datos para actualizar</p>
            )} */}
          </div>
        </div>
        <ModalEditValues
          modaledit={this.state.modaledit}
          ref={(medv) => (this.ModalEditRef = medv)}
          authorization={this.state.auth}
          data={this.state.dataAux}
        />
      </div>
    );
  }
}

EditTemplateValues.propTypes = {
  id: PropTypes.string.isRequired,
  auth: PropTypes.string.isRequired,
};

export default EditTemplateValues;
