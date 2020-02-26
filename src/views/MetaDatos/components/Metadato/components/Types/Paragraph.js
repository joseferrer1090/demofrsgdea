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

class Paragraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolType: "PARAGRAPH",
      title: "",
      name: "",
      content: "",
      textColor: "#000000",
      backgroundColor: "#cccccc",
      color: "",
      fontSize: 10,
      align: "center",
      activeTab: "1"
    };
  }

  componentDidMount() {
    this.setState(this.props.field);
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
        this.setState({ textColor: value });
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

  render() {
    return (
      <div>
        <Card clolor={"secondary"}>
          <CardHeader>
            <i className="fa fa-paragraph" /> {this.state.title}
            <span
              className="pull-right cross"
              onClick={() => this.props.removeField(this.props.indes)}
            >
              {" "}
              <i className="fa fa-times" />{" "}
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
                          value={this.state.textColor}
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
                          value={this.state.backgroundColor}
                          onChange={e =>
                            this.changeValue(
                              "BACKGROUNDO_COLOR",
                              e.target.value
                            )
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
            </TabContent>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
  }
}

export default Paragraph;
