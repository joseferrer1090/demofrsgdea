import React, { Component } from "react";

class BuscadorNombres extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { filterVal, filterUpdate } = this.props;
    return (
      <form>
        <input
          type="text"
          className="form-control"
          ref="filterInput"
          placeholder="Buscar Rol"
          value={filterVal}
          onChange={() => {
            filterUpdate(this.refs.filterInput.value);
          }}
        />
      </form>
    );
  }
}

export default BuscadorNombres;
