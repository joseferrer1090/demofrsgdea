import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";

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
      align: "center"
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
          <CardBody></CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
  }
}

export default Paragraph;
