import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  TabContent,
  Nav,
  NavItem,
  NavLink,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import ModalPreview from "./../ModalPreview";

class Paragraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolType: "PARAGRAPH",
      title: "",
      name: "",
      content: "",
      colorText: "#000000",
      background: "#cccccc",
      color: "",
      fontSize: 10,
      align: "center",
      validation: {
        isReadOnly: false,
        isRequired: false
      },
      disabled: false,
      activeTab: "1",
      modalpreview: false
    };
  }

  componentDidMount() {
    this.setState(this.props.field);
    console.log(this.props.field);
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  changeValue = (stateFor, value) => {
    switch (stateFor) {
      case "NAME":
        this.setState({ name: value });
        break;
      case "TITLE":
        this.setState({ title: value });
        break;
      case "CONTENT":
        this.setState({ content: value });
        break;
      case "TEXT_COLOR":
        this.setState({ colorText: value });
        break;
      case "BACKGROUND_COLOR":
        this.setState({ background: value });
        break;
      case "FONT_SIZE":
        this.setState({ fontSize: value });
        break;
      case "TEXT_ALIGN":
        this.setState({ align: value });
        break;
      case "IS_READONLY":
        this.setState({
          validation: { ...this.state.validation, isReadOnly: value }
        });
        break;
      case "IS_REQUIRED":
        this.setState({
          validation: {
            ...this.state.validation,
            isRequired: value
          }
        });
        break;
      case "IS_DISABLED":
        this.setState({ disabled: value });
        break;

      default:
        return;
    }
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  fontSizes = () => {
    let sizes = [];
    for (let i = 6; i <= 72; i++) {
      sizes.push(i);
    }
    return sizes;
  };

  createMatadata = e => {
    e.preventDefault();
    const aux = JSON.stringify(
      {
        title: this.state.title,
        name: this.state.name,
        content: this.state.content,
        align: this.state.align,
        fontSize: this.state.fontSize,
        colorText: this.state.colorText,
        colorContent: this.state.background,
        disabled: this.state.disabled,
        isReadOnly: this.state.validation.isReadOnly,
        isRequired: this.state.validation.isRequired
      },
      null,
      2
    );
    alert(aux);
  };

  openModalPreview = () => {
    this.refs.child.toggle();
  };

  render() {
    return (
      <div>
        <Card clolor={"secondary"}>
          <CardHeader>
            <i className="fa fa-paragraph" /> Selección area de texto{" "}
            {this.state.title}
            <span
              className="pull-right cross"
              onClick={() => this.props.removeField(this.props.indes)}
            >
              {" "}
              <i className="fa fa-times" style={{ color: "red" }} />{" "}
            </span>
          </CardHeader>
          <CardBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  General <i className="fa fa-cog" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Styles <i className="fa fa-pencil" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3"
                  })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  Validacion <i className="fa fa-exclamation-triangle" />
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={"1"}>
                <Card body>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={this.state.value}
                      onChange={e => this.changeValue("NAME", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      onChange={e => this.changeValue("TITLE", e.target.value)}
                      value={this.state.title}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paragraph">Paragraph</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      onChange={e =>
                        this.changeValue("CONTENT", e.target.value)
                      }
                      value={this.state.content}
                    />
                  </div>
                </Card>
              </TabPane>
              <TabPane tabId={"2"}>
                <Card body>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="Color">Text Color</label>
                        <input
                          value={this.state.colorText}
                          onChange={e =>
                            this.changeValue("TEXT_COLOR", e.target.value)
                          }
                          className={"form-control form-control-sm"}
                          type="color"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="BackgroundColor">
                          {" "}
                          Background Color
                        </label>
                        <input
                          value={this.state.background}
                          onChange={e =>
                            this.changeValue("BACKGROUND_COLOR", e.target.value)
                          }
                          className="form-control form-control-sm"
                          type="color"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="Color"> Text Align </label>
                        <select
                          className="form-control form-control-sm"
                          onChange={e =>
                            this.changeValue("TEXT_ALIGN", e.target.value)
                          }
                          value={this.state.align}
                        >
                          <option value="center">Center</option>
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                          <option value="justify">Justify</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="Color"> Font size </label>
                      <select
                        className="form-control form-control-sm"
                        value={this.state.fontSize}
                        onChange={e =>
                          this.changeValue("FONT_SIZE", e.target.value)
                        }
                      >
                        {this.fontSizes().map(size => {
                          return (
                            <option key={size} value={size}>
                              {size} pt
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </Card>
              </TabPane>
              <TabPane tabId={"3"}>
                <div className="row">
                  <div className="col-md-12">
                    <Card body>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="isReadOnly"
                              value={this.state.validation.isReadOnly}
                              onChange={e =>
                                this.changeValue(
                                  "IS_READONLY",
                                  e.target.checked
                                )
                              }
                            />
                            <label htmlFor="isReadOnly">
                              {" "}
                              ¿ Solo lectura ?{" "}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="isRequired"
                              value={this.state.validation.isRequired}
                              onChange={e =>
                                this.changeValue(
                                  "IS_REQUIRED",
                                  e.target.checked
                                )
                              }
                            />
                            <label htmlFor="isRequired">
                              {" "}
                              ¿ Es requerido ?{" "}
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="disabled"
                              value={this.state.disabled}
                              onChange={e =>
                                this.changeValue(
                                  "IS_DISABLED",
                                  e.target.checked
                                )
                              }
                            />
                            <label htmlFor="disabled">
                              {" "}
                              ¿ Deshabilidado ?{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </CardBody>
          <CardFooter>
            <div className="pull-right">
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={() => {
                  this.openModalPreview();
                }}
              >
                <i className="fa fa-eye" /> Vista previa
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={e => {
                  this.createMatadata(e);
                }}
              >
                <i className="fa fa-save" /> Guardar metadato
              </button>
            </div>
          </CardFooter>
        </Card>
        <ModalPreview
          modalpreview={this.state.modalpreview}
          ref={"child"}
          field={this.props.field}
          inputType={this.props.dragType}
        />
      </div>
    );
  }
}

export default Paragraph;
