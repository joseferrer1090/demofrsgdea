import React, { Component } from "react";
import PropTypes from "prop-types";

class TableStatusCorrespondence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.authorization,
    };
  }
  render() {
    return (
      <div>
        <p>probnado</p>
      </div>
    );
  }
}

TableStatusCorrespondence.propTypes = {
  authorization: PropTypes.string.isRequired,
};

export default TableStatusCorrespondence;
