import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { GET_METADATA_FOR_TEMPLATE } from "./../../../../../services/EndPoints";
import Inputs from "./Inputs";

class PreviewTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
      id: this.props.id,
      template: {},
      idMetadata: [],
      values: {},
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
          idMetadata: data.map((aux, id) => {
            return {
              id: aux.idMetadata,
              defaultValue: aux.defaultValue,
            };
          }),
        });
        this.props.onDataFetch(data);
        this.props.onDataFetchidMetadata(this.state.idMetadata);
      })
      .catch((err) => {
        console.log(`Error => ${err.message}`);
      });
  };

  render() {
    // console.log(this.state.values);
    console.log(this.state.template);
    // console.log(this.state.idMetadata);
    // console.log(this.state.id);
    // console.log(
    //   this.state.template.map((aux, id) => {
    //     console.log(aux.metadata.elementConfig);
    //   })
    // );
    // console.log(
    //   this.state.template.map((aux, id) => {
    //     return { id: aux.id, defaultValue: aux.defaultValue };
    //   })
    // );
    return (
      <div>
        <Card>
          <CardHeader>
            {" "}
            <i className="fa fa-wpforms" /> Preview de la plantilla
          </CardHeader>
          <CardBody>
            <Card body>
              {this.state.template.length ? (
                this.state.template.map((aux, id) => (
                  <Inputs
                    key={id}
                    id={aux.id}
                    value={aux.value}
                    formType={aux.metadata.elementConfig.type}
                    elementConfig={aux.metadata.elementConfig}
                    onChange={(event) => {
                      this.setState(
                        {
                          values: {
                            ...this.state.values,
                            [id]: {
                              id: aux.idMetadata,
                              defaultValue: event.target.value,
                            },
                          },
                        },
                        () => this.props.onDataOnChange(this.state.values)
                      );
                    }}
                  />
                ))
              ) : (
                <p className="text-center">
                  {" "}
                  <strong>
                    {" "}
                    No hay dato verificar o seleccionar otra plantilla
                  </strong>
                </p>
              )}
            </Card>
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
