import React, { Component } from "react";
import PropTypes from "prop-types";

class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>Componente visor cuando se seleccione desde la tabla</p>
      </div>
    );
  }
}

ViewComponent.propTypes = {};

export default ViewComponent;
