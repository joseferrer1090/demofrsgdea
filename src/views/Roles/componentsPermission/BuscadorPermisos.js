import React, { Component } from "react";

class BuscadorPermisos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { filterVal, filterUpdate } = this.props;
    return (
      <div>
        <form>
          <input
            className="form-control"
            type="text"
            ref="filterInput"
            placeholder="Buscar permiso"
            // binding the input value to state
            value={filterVal}
            onChange={() => {
              filterUpdate(this.refs.filterInput.value);
            }}
          />
        </form>
      </div>
    );
  }
}

export default BuscadorPermisos;
