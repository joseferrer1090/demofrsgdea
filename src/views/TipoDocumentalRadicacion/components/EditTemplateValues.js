import React, { Component } from "react";
import PropTypes from "prop-types";
import { GET_METADATA_FOR_TYPE_DOCUMENTARY } from "./../../../services/EndPoints";
import PreviewTemplate from "./../components/Forms/components/PreviewTemplate";

class EditTemplateValues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      auth: this.props.auth,
      data: [],
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
        });
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
      });
  };

  render() {
    //console.log(this.props);
    return (
      <div className="animated fadeIn">
        {" "}
        <div className="card">
          <div className="card-header">
            {" "}
            <i className="fa fa-wpforms" /> Valores de la plantilla asociada
          </div>
          <div className="card-body">
            {this.state.data ? (
              <p className="text-success"> Hay Datos para actualizar</p>
            ) : (
              <p className="text-danger">No hay datos para actualizar</p>
            )}
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
