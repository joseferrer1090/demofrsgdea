import React, { Component, createRef } from "react";
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
    this.tooList = createRef();
    this._toolBoxContainer = createRef();
    this.state = {
      dragActive: false,
      fields: [],
      orders: [],
      change: false,
      nameDuplicate: false
    };
  }

  componentWillMount() {
    if (this.props.updateOnMount === true) {
      this.props.updateForm(form => {
        this.setState({
          fields: form,
          orders: form
        });
      });
    }
  }

  componentDidMount() {
    let list = this.tooList;
    let toolBoxContainer = this._toolBoxContainer;
    toolBoxContainer = "droppable";
    //let self = this;
    //const $ = window.$;
    // $(function() {
    //   $(toolBoxContainer).droppable({
    //     drop: function(event, ui) {
    //       let tool = $(ui.draggable[0]).attr("data-tool");
    //       if (tool !== undefined) {
    //         self.catchField(tool);
    //       }
    //     }
    //   });
    // });
    // console.log(list);
    // console.log(toolBoxContainer);
  }

  onDrop = e => {
    let id = e.dataTransfer.getData("dragField");
    console.log(id);
    if (id !== undefined) {
      this.catchField(id);
    } else {
      return null;
    }
    // let list = this.tooList;
    // let toolBoxContainer = this._toolBoxContainer;
    // let self = this;
    // const $ = window.$;
    // $(function() {
    //   $(toolBoxContainer).droppable({
    //     drop: function(event, ui) {
    //       let tool = $(ui.draggable[0]).attr("data-tool");
    //       if (tool !== undefined) {
    //         self.catchField(tool);
    //       }
    //     }
    //   });
    // });
  };

  renderToolBoxItems = (field, index) => {
    return (
      <div key={index} data-index={index}>
        {this.renderTypes(field, index)}
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
          dragType={field.toolType}
          authorization={this.props.authorization}
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
    } else if (field.toolType === "DATE_FIELD") {
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
    //this.resetStateOrder();
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
    //this.resetStateOrder();
    this.nameDuplicateReflector();
  }

  popForm = () => {
    let states = this.state.orders;
    let d = states.filter(data => {
      return data !== null && data !== undefined;
    });
    return this.props.onSave(d);
  };

  nameDuplicateReflector = () => {
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
  };

  catchField = data => {
    if (this.props.custom) {
      let toolItem = this.props.custom.filter(tool => {
        if (tool.toolbox.name === data) {
          return tool;
        } else {
          return false;
        }
      })[0];

      if (toolItem) {
        let fields = this.state.fields;
        fields.push(toolItem.states);
        this.setState({
          dragActive: false,
          fields: fields
        });
        //this.resetStateOrder();
        this.nameDuplicateReflector();
        return;
      }
    }

    let tools = [
      "SINGLE_FIELD",
      "SELECT_FIELD",
      "CHECK_BOXES",
      "RADIO_BUTTONS",
      "PARAGRAPH",
      "DATE_FIELD"
    ];
    if (tools.indexOf(data) === -1) {
      this.setState({
        dragActive: false
      });
      return;
    }
    var meta = {};
    if (data === "SINGLE_FIELD") {
      meta = {
        title: "Title",
        type: "Text",
        toolType: "SINGLE_FIELD",
        defaultValue: "",
        placeholder: "",
        description: "",
        validation: {
          isReadOnly: false,
          isRequired: false,
          min: 6,
          max: 6
        }
      };
    } else if (data === "DATE_FIELD") {
      meta = {
        titleTo: "Title",
        titleFrom: "Title",
        title: "Title",
        type: "date",
        toolType: "DATE_FIELD",
        defaultValue: "",
        placeholder: "",
        description: "",
        validation: {
          isReadOnly: false,
          isRequired: false,
          min: 6,
          max: 6
        }
      };
    } else if (data === "SELECT_FIELD") {
      meta = {
        title: "Title",
        type: "SELECT",
        toolType: "SELECT_FIELD",
        multiple: false,
        defaultValue: "",
        placeholder: "",
        description: "",
        validation: {
          isReadOnly: false,
          isRequired: false,
          min: 6,
          max: 6
        },
        options: []
      };
    } else if (data === "CHECK_BOXES") {
      meta = {
        title: "Title",
        toolType: "CHECK_BOXES",
        inline: false,
        defaultValue: "",
        placeholder: "",
        description: "",
        validation: {
          isReadOnly: false,
          isRequired: false,
          min: 6,
          max: 6
        },
        checkBoxes: []
      };
    } else if (data === "RADIO_BUTTONS") {
      meta = {
        title: "Title",
        toolType: "RADIO_BUTTONS",
        multiple: false,
        inline: false,
        defaultValue: "",
        placeholder: "",
        description: "",
        validation: {
          isReadOnly: false,
          isRequired: false,
          min: 6,
          max: 6
        },
        radios: []
      };
    } else if (data === "PARAGRAPH") {
      meta = {
        title: "Title",
        toolType: "PARAGRAPH",
        content: "",
        textColor: "",
        backgroundColor: "",
        color: "",
        fontSize: "",
        align: "",
        validation: {
          isReadOnly: "",
          isRequired: ""
        },
        disabled: ""
      };
    }
    let fields = this.state.fields;
    fields.push(meta);
    this.setState({
      dragActive: false,
      fields: fields
    });
    // this.resetStateOrder();
    this.nameDuplicateReflector();
  };

  render() {
    return (
      <div className="anitmated fadeIn">
        <div className="row">
          <div
            className="col-md-12"
            droppable={"true"}
            ref={c => (this._toolBoxContainer = c)}
            onDragOver={e => {
              e.preventDefault();
            }}
            onDrop={e => this.onDrop(e)}
          >
            <Card>
              <CardHeader>
                <i className="fa fa-code" /> Bolsa de metadatos{" "}
                {/* <div className="pull-right">
                  <button className="btn btn-secondary btn-sm">
                    {" "}
                    <i className="fa fa-eye" /> Preview
                  </button>{" "}
                </div> */}
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="list-group"
                      ref={l => (this.tooList = l)}
                      // onDragOver={e => {
                      //   e.preventDefault();
                      // }}
                      // onDrop={e => this.onDrop(e)}
                    >
                      {this.state.fields.length ? (
                        this.state.fields.map((field, index) => {
                          return this.renderToolBoxItems(field, index);
                        })
                      ) : (
                        <div>
                          <p
                            style={{
                              textAlign: "center",
                              padding: "2em",
                              fontSize: "12pt",
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
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default FormContainer;
