import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem
} from "reactstrap";
import classnames from "classnames";
import ModalPreview from "./../ModalPreview";

class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "Date",
      name: "",
      toolType: "DATE_FIELD",
      defaultValue: "",
      placoholder: "",
      description: "",
      validation: {
        isRequired: false,
        isReadOnly: false,
        min: "",
        max: ""
      },
      activeTab: "1",
      modalpreview: false
    };
  }

  componentDidMount() {
    this.setState(this.props.field);
    console.log(this.props.field);
  }

  changeValue = (stateFor, value) => {
    switch (stateFor) {
      case "NAME":
        this.setState({ name: value });
        break;
      case "TITLE":
        this.setState({ title: value });
        break;
      case "TYPE":
        this.setState({ type: value });
        break;
      case "PLACEHOLDER":
        this.setState({ placoholder: value });
        break;
      case "DESCRIPTION":
        this.setState({ description: value });
        break;
      case "DEFAULT_VALUE":
        this.setState({ defaultValue: value });
        break;
      case "IS_REQUIRED":
        this.setState({
          validation: {
            ...this.state.validation,
            isRequired: value
          }
        });
        break;
      case "IS_READONLY":
        this.setState({
          validation: { ...this.state.validation, isReadOnly: value }
        });
        break;
      case "MAX":
        this.setState({
          validation: { ...this.state.validation, max: value }
        });
        break;
      case "MIN":
        this.setState({ validation: { ...this.state.validation, min: value } });
        break;

      default:
        return;
    }
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.field);
    }, 0);
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  createMetadata = e => {
    e.preventDefault();
    const aux = JSON.stringify(
      {
        title: this.state.title,
        name: this.state.name,
        description: this.state.description,
        isRequired: this.state.validation.isRequired,
        isReadOnly: this.state.validation.isReadOnly,
        min: this.state.validation.min,
        max: this.state.validation.max
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
        <Card outline color={"secondary"}>
          <CardHeader>
            <i className="fa fa-calendar" /> Tipo de campon fecha{" "}
            {this.state.title}
            <span
              className="pull-right"
              onClick={() => this.props.removeField(this.props.index)}
            >
              {" "}
              <i className="fa fa-times" style={{ color: "red" }} />{" "}
            </span>
          </CardHeader>
          <CardBody>
            <Nav tabs>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "1"
                })}
                onClick={() => this.toggle("1")}
              >
                General <i className="fa fa-cog" />
              </NavLink>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "2"
                })}
                onClick={() => this.toggle("2")}
              >
                Validacion <i className="fa fa-exclamation-triangle" />
              </NavLink>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={"1"}>
                <Card body>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        {/* <p className="alert alert-info text-center">
                          <strong>NAME</strong>
                        </p> */}
                        <label htmlFor="name">NAME</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.name}
                          onChange={e =>
                            this.changeValue("NAME", e.target.value)
                          }
                          placeholder={"Nombre"}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">TITLE</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.title}
                          onChange={e =>
                            this.changeValue("TITLE", e.target.value)
                          }
                          placeholder={"Titulo"}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="description"> Descripcion </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={this.state.description}
                          onChange={e => {
                            this.changeValue("DESCRIPTION", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabPane>
              <TabPane tabId={"2"}>
                <Card body>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="checkbox"
                          value={this.state.validation.isRequired}
                          onChange={e =>
                            this.changeValue("IS_REQUIRED", e.target.checked)
                          }
                          id={"isRequired"}
                        />
                        <label htmlFor="isRequired"> ¿Es requerido? </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type={"checkbox"}
                          value={this.state.validation.isReadOnly}
                          onChange={e =>
                            this.changeValue("IS_READONLY", e.target.checked)
                          }
                          id="isReadOnly"
                        />
                        <label htmlFor="isReadOnly"> ¿Solo lectura? </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>MAX</label>
                        <input
                          type={"date"}
                          className={"form-control form-control-sm"}
                          onChange={e =>
                            this.changeValue("MAX", e.target.value)
                          }
                          value={this.state.validation.max}
                          patter={"yyyy/mm/dd"}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>MIN</label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={this.state.validation.min}
                          onChange={e =>
                            this.changeValue("MIN", e.target.value)
                          }
                          patter={"yyyy/mm/dd"}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabPane>
            </TabContent>
          </CardBody>
          <CardFooter>
            <div className="pull-right">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
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
                onClick={e => this.createMetadata(e)}
              >
                {" "}
                <i className="fa fa-save" /> Guardar metadato{" "}
              </button>
            </div>
          </CardFooter>
        </Card>
        <ModalPreview
          ref="child"
          modalpreview={this.state.modalpreview}
          field={this.props.field}
          inputType={this.props.dragType}
        />
      </div>
    );
  }
}
export default DateField;
