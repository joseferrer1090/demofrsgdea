import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { GET_METADATA_FOR_TEMPLATE } from "./../../../../../services/EndPoints";

class PreviewTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      id: this.props.id,
      template: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth || props.id !== state.id) {
      return {
        auth: props.authorization,
        id: props.id,
      };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        id: this.props.id,
        auth: this.props.authorization,
      });
      this.getDataTemplate(this.state.auth, this.state.id);
    } else if (this.props.id === null) {
      return null;
    }
  }

  getDataTemplate = (auth, id) => {
    fetch(`${GET_METADATA_FOR_TEMPLATE}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          template: data,
        });
        // console.log(data);
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  render() {
    console.log(this.state.id);
    return (
      <div>
        <Card>
          <CardHeader>
            {" "}
            <i className="fa fa-wpforms" /> Preview de la plantilla
          </CardHeader>
          <CardBody>
            {Object.keys(this.state.template).length ? (
              <p>Hay datos desde la api</p>
            ) : (
              <p> No hay dato verificar o seleccionar otra plantilla</p>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

PreviewTemplate.propTypes = {
  authorization: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default PreviewTemplate;
