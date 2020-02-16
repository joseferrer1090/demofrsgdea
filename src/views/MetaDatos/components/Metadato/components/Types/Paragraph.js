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

  render() {
    return (
      <div>
        <Card color={"secondary"}>
          <CardHeader>
            <i className="fa fa-paragraph" />
            Paragraph {this.state.title}
            <span
              className="pull-right"
              onClick={() => this.props.removeField(this.props.index)}
            >
              <i className="fa fa-times" />
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
                  Content
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
                  Style
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
                <p>Probando el otro tab</p>
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
