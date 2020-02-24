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
          name: "DATE_FIELD",
          icon: "fa fa-calendar"
        }
      ],
      tooltipOpen: false
    };
  }

  renderCustomTools = () => {
    if (this.props.custom) {
      return this.props.custom.map(types => {
        return (
          <li
            data-tool={types.toolbox.name}
            onDragStart={e => this.dragField(e, types.toolbox.name)}
            key={types.toolbox.name}
            className="list-group-item singleField"
          >
            <i className={types.toolbox.icon + " mr-3"} />
            {types.toolbox.title}
          </li>
        );
      });
    }
  };

  render() {
    const Tools = this.state.Tools;
    return (
      <div>
        <div className="card">
          <div className="card-header">
            {" "}
            <i className="fa fa-keyboard-o" /> Tipo de entradas{" "}
          </div>
          <div className="card-body">
            <div>
              <ul className="list-group" ref={tools => (this._tools = tools)}>
                {Tools.map(types => {
                  return (
                    <li
                      data-tool={types.name}
                      onDragStart={e => this.dragField(e, types.name)}
                      key={types.name}
                      className="list-group-item singleField"
                    >
                      <i className={types.icon + " mr-3"}></i>
                      {types.title}
                    </li>
                  );
                })}
                {this.renderCustomTools()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let tools = this._tools;
    let $ = window.$;
    $(tools)
      .children()
      .each((i, l) => {
        $(l).draggable({ helper: "clone" });
      });
  }

  dragField = (e, types) => {
    e.dataTransfer.setData("dragField", types);
    console.log(e.dataTransfer.setData("dragField", types));
  };
}

export default ToolBox;
