import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  GET_METADATA_FOR_TYPE_DOCUMENTARY,
  THIRDPARTYS_STATUS,
} from "./../../../services/EndPoints";
import Inputs from "./../components/Forms/components/Inputs";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class EditTemplateValues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      auth: this.props.auth,
      data: [],
      dataComplete: this.props.dataComplete,
      dataAux: [],
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
          dataAux: data.map((aux) => aux.metadata),
        });
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  };

  render() {
    console.log(this.props);

    return (
      <div className="animated fadeIn">
        {" "}
        <div className="card">
          <div className="card-header">
            {" "}
            <i className="fa fa-wpforms" /> Valores de la plantilla asociada
          </div>
          <div className="card-body">
            <div className="row">
              <div
                className="col-md-12"
                style={{ border: "1px solid red" }}
              ></div>
            </div>
            {/* <BootstrapTable
              data={this.state.dataAux.map((aux) => aux.elementConfig)}
            >
              <TableHeaderColumn dataField={"labeltext"}>
                Nombre
              </TableHeaderColumn>
            </BootstrapTable> */}
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
      </div>
    );
  }
}

EditTemplateValues.propTypes = {
  id: PropTypes.string.isRequired,
  auth: PropTypes.string.isRequired,
};

export default EditTemplateValues;
