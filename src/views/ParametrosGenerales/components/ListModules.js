import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, ListGroup, ListGroupItem, Col } from "reactstrap";

const ListModules = () => {
  return (
    <Col xs="4">
      <ListGroup>
        <ListGroupItem active>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Morbi leo risus</ListGroupItem>
      </ListGroup>
    </Col>
  );
};

export default ListModules;

{
  /* <ListGroup id="list-tab" role="tablist">
  <ListGroupItem
    onClick={() => this.toggle(0)}
    action
    active={this.state.activeTab === 0}
  >
    Home
  </ListGroupItem>
  <ListGroupItem
    onClick={() => this.toggle(1)}
    action
    active={this.state.activeTab === 1}
  >
    Profile
  </ListGroupItem>
  <ListGroupItem
    onClick={() => this.toggle(2)}
    action
    active={this.state.activeTab === 2}
  >
    Messages
  </ListGroupItem>
  <ListGroupItem
    onClick={() => this.toggle(3)}
    action
    active={this.state.activeTab === 3}
  >
    Settings
  </ListGroupItem>
</ListGroup>; */
}
