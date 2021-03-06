import React, { Component } from "react";
import PropTypes, { resetWarningCache } from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
  PARAMETERS_FIND_BY_PARAMETER_GROUP_ID,
  PARAMETERS_ALL,
} from "./../../../services/EndPoints";
import ModalEdit from "./../components/ModalEditParameter";

class TableContentParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      id: this.props.idGroup,
      dataParameters: [],
      modal: false,
      t: this.props.t,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.idGroup !== state.id) {
      return {
        id: props.idGroup,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idGroup !== prevProps.idGroup) {
      this.setState({
        id: this.props.idGroup,
      });
      this.getDataParameterByIdGroup(this.state.id);
    }
  }

  getDataParameterByIdGroup = (id) => {
    fetch(`${PARAMETERS_FIND_BY_PARAMETER_GROUP_ID}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataParameters: data,
        });
      })
      .catch((err) => console.log(`err => ${err}`));
  };

  componentDidMount() {
    this.getDataParameters();
  }

  getDataParameters = () => {
    fetch(`${PARAMETERS_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataParameters: data,
        });
      })
      .catch((err) => `err => ${err}`);
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  accionesParametros(cell, row) {
    return (
      <button
        title="Editar el parametro"
        className="btn btn-secondary btn-sm"
        onClick={() => this.openModalEdit(row.parameter)}
      >
        <i className="fa fa-edit" />
      </button>
    );
  }

  openModalEdit = (id) => {
    this.refs.child.toggle(id);
  };

  render() {
    const { t } = this.state;
    return (
      <div className="row">
        <div className="col-md-12">
          <BootstrapTable
            data={this.state.dataParameters}
            search
            searchPlaceholder={t("app_parametros_generales_table_placeholder")}
            pagination
            striped
            hover
            bordered={false}
          >
            <TableHeaderColumn dataFormat={this.indexN} width={"40"}>
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              isKey
              dataField={"parameter"}
              dataAlign="center"
              width={"300"}
            >
              {t("app_parametros_generales_table_parametro")}
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"description"} dataAlign={"center"}>
              {" "}
              {t("app_parametros_generales_table_descripcion")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"parameterType"} dataAlign={"center"}>
              {t("app_parametros_generales_table_tipo_parametro")}{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"value"} dataAlign={"center"}>
              {" "}
              {t("app_parametros_generales_table_valor_parametro")}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataAlign={"center"}
              dataFormat={(cell, row) => this.accionesParametros(cell, row)}
            >
              {t("app_parametros_generales_table_accion")}
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <ModalEdit
          authorization={this.state.auth}
          modalEditParameter={this.state.modal}
          updateTable={() => {
            this.getDataParameters();
          }}
          ref={"child"}
          t={this.state.t}
        />
      </div>
    );
  }
}

TableContentParameter.propTypes = {
  authorization: PropTypes.string.isRequired,
  idGroup: PropTypes.string.isRequired,
};

export default TableContentParameter;
