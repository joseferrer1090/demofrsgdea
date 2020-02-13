import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";

const InputTypes = [
  "Checkbox",
  "Color",
  "Date",
  "Email",
  "File",
  "Month",
  "Number",
  "Password",
  "Radio",
  "Range",
  "Search",
  "Tel",
  "Text",
  "Time",
  "Url",
  "Week",
  "Textarea"
];

class SingleField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "",
      title: "",
      type: "Text",
      name: "",
      toolType: "Entrada de texto",
      defaultValue: "",
      placeholder: "",
      description: "",
      validation: {
        isReadOnly: false,
        isRequired: false,
        min: 6,
        max: 6
      },
      activeTab: "1"
    };
  }

  componentDidMount() {
    this.setState(this.props.field);
  }

  changeValue = (stateFor, value) => {
    switch (stateFor) {
      case "NAME":
        this.setState({ name: value });
        break;
      case "TITLE":
        this.setState({ title: value });
        break;
      case "PLACEHOLDER":
        this.setState({ placeholder: value });
        break;
      case "TYPE":
        this.setState({ type: value });
        break;
      case "DESCRIPTION":
        this.setState({ description: value });
        break;
      case "DEFAULT_VALUE":
        this.setState({ defaultValue: value });
        break;
      case "IS_REQUIRED":
        this.setState({
          validation: { ...this.state.validation, isRequired: value }
        });
        break;
      case "IS_READONLY":
        this.setState({
          validation: { ...this.state.validation, isReadOnly: value }
        });
        break;
      case "MIN":
        this.setState({ validation: { ...this.state.validation, min: value } });
        break;
      case "MAX":
        this.setState({ validation: { ...this.state.validation, max: value } });
        break;

      default:
        return;
    }
    setTimeout(() => {
      return this.props.changeState(this.state, this.props.index);
    }, 0);
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div>
        <Card outline color={"secondary"}>
          <CardHeader>
            <i className="fa fa-wpforms" /> Texto {this.state.title}
            <span
              className="pull-right"
              onClick={() => this.props.removeField(this.props.index)}
            >
              {" "}
              <i className="fa fa-times" />
            </span>
          </CardHeader>
          <CardBody>
            <Nav tabs>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                General
              </NavLink>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                {" "}
                Validacion{" "}
              </NavLink>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <p>Primera parte</p>
              </TabPane>
              <TabPane tabId="2">
                <p>Otra parte</p>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SingleField;
