import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Button
} from "reactstrap";
import SingleField from "./Types/SingleField";
import SelectField from "./Types/SelectField";
import RadioButtons from "./Types/RadioButtons";
import CheckBoxes from "./Types/CheckBoxes";
import Paragraph from "./Types/Paragraph";
import DateField from "./Types/DateField";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragActive: false,
      fields: [],
      orders: [],
      change: false,
      nameDuplicate: false
    };
  }
  componentDidMount() {}

  renderToolBoxItems = (field, index) => {
    return (
      <div key={index} data-index={index}>
        {this.renderTypes(field, index)}
        <hr />
      </div>
    );
  };

  renderTypes = (field, index) => {
    if (this.props.custom) {
      let Component = this.props.custom.filter(tool => {
        if (tool.states.toolType === field.toolType) {
          return tool;
        } else {
          return false;
        }
      })[0];
      if (Component) {
        let props = {
          fields: field,
          index: index,
          key: index,
          changeState: (e, index) => this.changeChildState(e, index),
          removeField: () => this.removeField(index)
        };
        let ClonedComponent = React.cloneElement(Component.container, props);
        return ClonedComponent;
      }
    }
    if (field.toolType === "SELECT_FIELD") {
      return (
        <SelectField
          changeState={e => {
            this.changeChildState(e, index);
          }}
          field={field}
          index={index}
          key={index}
          removeField={() => this.remove(index)}
        />
      );
    } else if (field.toolType === "SINGLE_FIELD") {
      return (
        <SingleField
          changeState={e => {
            this.changeChildState(e, index);
          }}
          field={field}
          index={index}
          key={index}
          removeField={() => this.remove(index)}
        />
      );
    } else if (field.toolType === "CHECK_BOXES") {
      return (
        <CheckBoxes
          changeState={e => {
            this.changeChildState(e, index);
          }}
          field={field}
          index={index}
          key={index}
          removeField={() => this.remove(index)}
        />
      );
    } else if (field.toolType === "RADIO_BUTTONS") {
      return (
        <RadioButtons
          changeState={e => {
            this.changeChildState(e, index);
          }}
          field={field}
          index={index}
          key={index}
          removeField={() => this.remove(index)}
        />
      );
    } else if (field.toolType === "PARAGRAPH") {
      return (
        <Paragraph
          changeState={e => {
            this.changeChildState(e, index);
          }}
          field={field}
          index={index}
          key={index}
          removeField={() => this.remove(index)}
        />
      );
    } else if (field.toolType === "DURATION") {
      return (
        <DateField
          changeState={e => {
            this.changeChildState(e, index);
          }}
          field={field}
          index={index}
          key={index}
          removeField={() => this.remove(index)}
        />
      );
    }
  };

  changeChildState = (e, index) => {
    if (index !== -1) {
      let fields = this.state.fields;
      fields[index] = e;
      this.setState({ fields: fields, change: this.state.change });
    }
    this.resetStateOrder();
    this.nameDuplicateReflector();
  };

  nameDuplicateReflector() {
    // duplicate names
    let f = this.state.fields;
    var arr = [];
    f.forEach(i => {
      if (
        i.name !== undefined &&
        i.name.trim() !== "" &&
        i.name.indexOf(" ") === -1
      ) {
        arr.push(i.name);
      }
    });
    let unique = arr.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
    if (f.length !== unique.length) {
      this.setState({
        nameDuplicate: true
      });
    } else {
      this.setState({
        nameDuplicate: false
      });
    }
  }

  remove(indexR) {
    let fields = this.state.fields;
    fields.splice(indexR, 1);
    this.setState({
      fields: fields,
      change: this.state.change
    });
    this.resetStateOrder();
    this.nameDuplicateReflector();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Card>
            <CardHeader>
              <i className="fa fa-code" /> Bolsa de metadatos{" "}
              <div className="pull-right">
                <button className="btn btn-secondary btn-sm">
                  {" "}
                  <i className="fa fa-eye" /> Preview
                </button>{" "}
                <button className="btn btn-secondary btn-sm ">
                  <i className="fa fa-save" /> Guardar
                </button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="row">
                <div className="col-md-12">
                  <Card body outline color={"primary"}>
                    {this.state.fields.length > 0 ? (
                      this.state.fields.map((field, index) => {
                        return (
                          <p>
                            Tengo que llamar al metodo para mostrar la interfaz
                            de configuracion
                          </p>
                        );
                      })
                    ) : (
                      <div>
                        <p
                          style={{
                            textAlign: "center",
                            padding: "2em",
                            fontSize: "18pt",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            color: "#aaa",
                            backgroundColor: "#eee"
                          }}
                        >
                          Seleccione una entrada a configurar
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default FormContainer;
