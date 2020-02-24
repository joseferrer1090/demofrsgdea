import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, UncontrolledTooltip } from "reactstrap";

class ToolBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tools: [
        {
          title: "Entrada",
          name: "SINGLE_FIELD",
          icon: "fa fa-wpforms"
        },
        {
          title: "Seleccion",
          name: "SELECT_FIELD",
          icon: "fa fa-caret-square-o-down"
        },
        {
          title: "Check",
          name: "CHECK_BOXES",
          icon: "fa fa-check-square-o"
        },
        {
          title: "Radio",
          name: "RADIO_BUTTONS",
          icon: "fa fa-circle"
        },
        {
          title: "Area de texto",
          name: "PARAGRAPH",
          icon: "fa fa-paragraph"
        },
        {
          title: "Fecha",
          name: "DURATION",
          icon: "fa fa-calendar"
        }
      ],
      tooltipOpen: false
    };
  }
  toggle = () => {
    this.setState({
      tooltipOpen: true
    });
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
            {" "}
            <i className="fa fa-keyboard-o" /> Tipo de entradas{" "}
          </CardHeader>
          <CardBody>
            <div>
              <ul className="list-group">
                {this.state.Tools.map(types => {
                  return (
                    <div>
                      <li
                        draggable
                        onDragStart={e => this.onDragStart(e, types.name)}
                        className="list-group-item"
                        key={types.name}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`${types.icon}`} />{" "}
                        <span id="help">{types.title}</span>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ToolBox;
