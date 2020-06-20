import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  GET_METADATA_FOR_TYPE_DOCUMENTARY,
  TEMPLATE_METADATA_BAG_FIND_BY_TEMPLATE_ID,
} from "./../../../services/EndPoints";
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
      template: {},
      metadataBagID: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dataTemplate !== state.template) {
      return {
        template: props.dataTemplate,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dataTemplate !== prevProps.dataTemplate) {
      this.setState({
        template: this.props.dataTemplate,
      });
      this.getDataMetadataTemplate(this.state.template.id);
    }
    return null;
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

  getDataMetadataTemplate = (id) => {
    const auth = this.state.auth;
    fetch(`${TEMPLATE_METADATA_BAG_FIND_BY_TEMPLATE_ID}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          metadataBagID: data.map((aux, id) => aux.metadataBag.id),
        });
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  };

  editValueTemplate = (id) => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          title="Editar valor de la plantilla"
          onClick={() => {
            this.OpenModalEdit(id);
          }}
        >
          <i className="fa fa-pencil" />
        </button>
      </div>
    );
  };

  indexN(cell, row, enumObject, index) {
    return <div key={index}>{index + 1}</div>;
  }

  OpenModalEdit(id, type, idmetadata) {
    this.ModalEditRef.toggle(id, type, idmetadata);
  }

  render() {
    const aux = this.state.data.map((aux, id) => {
      return { id: aux.id, metadata: aux.metadata };
    });
    const ids = this.state.metadataBagID.map((aux, id) => {
      return { idmetadata: aux };
    });

    const array = aux.map((obj, id) => {
      return { ...obj, ...ids[id] };
    });

    return (
      <div className="animated fadeIn">
        {" "}
        <div className="card">
          <div className="card-header">
            {" "}
            <i className="fa fa-wpforms" /> Valores de la plantilla asociada
          </div>
          <div className="card-body">
            <div className="table-responseive">
              <table className="table table-bordered table-sm table-hover">
                <thead className="thead-light">
                  <tr className="text-center">
                    <th scope="col">Nombre del metadato</th>
                    <th scope="col">Tipo metadato</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((aux, id) => {
                    return (
                      <tr className="text-center" key={id}>
                        <td>{aux.metadata.elementConfig.labeltext}</td>
                        <td>{aux.metadata.type}</td>
                        <td>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() =>
                              this.OpenModalEdit(
                                aux.id,
                                aux.metadata.type,
                                aux.idmetadata
                              )
                            }
                          >
                            <i className="fa fa-pencil" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ModalEditValues
          modaledit={this.state.modaledit}
          ref={(medv) => (this.ModalEditRef = medv)}
          authorization={this.state.auth}
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
