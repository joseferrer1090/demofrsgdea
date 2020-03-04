import React, { Component, createRef, Children } from "react";

class ToolBox extends Component {
  constructor(props) {
    super(props);
    this._tools = createRef();
    this.state = {
      Tools: [
        {
          title: "Entrada de texto",
          name: "SINGLE_FIELD",
          icon: "fa fa-wpforms"
        },
        {
          title: "Selección multiple",
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

  componentDidMount() {
    // let tools = this._tools;
    //let aux = (tools.className = "list-group draggable");
    //console.log(aux);
    // console.log(tools);
    // let $ = window.$;
    // $(tools)
    //   .children()
    //   .each((i, l) => {
    //     $(l).draggable({ helper: "clone" });
    //   });
  }

  dragField = (e, types) => {
    e.dataTransfer.setData("dragField", types);
    // console.log(e.dataTransfer.setData("dragField", types));
    // console.log("dragField", types);
  };

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

  onDragOver = e => {
    e.preventDefault();
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
              <ul
                className="list-group"
                ref={tools => (this._tools = tools)}
                onDragOver={e => {
                  this.onDragOver(e);
                }}
                onDrop={e => {
                  console.log(e);
                }}
              >
                {Tools.map(types => {
                  return (
                    <li
                      key={types.name}
                      className="list-group-item draggable"
                      onDragStart={e => {
                        this.dragField(e, types.name);
                      }}
                      draggable={true}
                    >
                      <i className={`${types.icon}`} /> {types.title}
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
}

export default ToolBox;
