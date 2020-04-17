import React, { Component, createRef, Children } from "react";

class ToolBox extends Component {
  constructor(props) {
    super(props);
    this._tools = createRef();
    this.state = {
      t: this.props.t,
      Tools: [
        {
          title: `${this.props.t(
            "app_metadatos_crear_metadato_entrada_texto"
          )}`,
          name: "SINGLE_FIELD",
          icon: "fa fa-wpforms"
        },
        {
          title: `${this.props.t(
            "app_metadatos_crear_metadato_entrada_seleccion"
          )}`,
          name: "SELECT_FIELD",
          icon: "fa fa-caret-square-o-down"
        },
        {
          title: `${this.props.t(
            "app_metadatos_crear_metadato_entrada_check"
          )}`,
          name: "CHECK_BOXES",
          icon: "fa fa-check-square-o"
        },
        {
          title: `${this.props.t(
            "app_metadatos_crear_metadato_entrada_radio"
          )}`,
          name: "RADIO_BUTTONS",
          icon: "fa fa-circle"
        },
        {
          title: `${this.props.t(
            "app_metadatos_crear_metadato_entrada_parrafo"
          )}`,
          name: "PARAGRAPH",
          icon: "fa fa-paragraph"
        },
        {
          title: `${this.props.t(
            "app_metadatos_crear_metadato_entrada_fecha"
          )}`,
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
    const { t } = this.state;
    return (
      <div>
        <div className="card">
          <div className="card-header">
            {" "}
            <i className="fa fa-keyboard-o" />{" "}
            {t("app_metadatos_crear_metadato_tipo_entrada")}{" "}
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
