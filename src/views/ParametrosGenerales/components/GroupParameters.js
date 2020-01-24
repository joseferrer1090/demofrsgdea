import React from "react";
import PropTypes from "prop-types";

class GroupParameters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <p className="text-center">Informacion del grupo de parametros</p>
      </div>
    );
  }
}

export default GroupParameters;
