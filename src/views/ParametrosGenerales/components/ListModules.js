import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, ListGroup, ListGroupItem, Col } from "reactstrap";
import { MODULE_ALL } from "./../../../services/EndPoints";

const ListModules = props => {
  const [auth, setAuht] = useState(props.authorization);
  const [response, setResponse] = useState([]);
  const [ID, setID] = useState("");

  useEffect(() => {
    getDataModules();
  }, []);

  const getDataModules = () => {
    fetch(`${MODULE_ALL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth
      }
    })
      .then(response => response.json())
      .then(data => {
        setResponse(data);
        console.log(data);
      })
      .catch(err => console.log(`error => ${err}`));
  };

  return (
    <Col xs="4">
      <ListGroup>
        {response.map(aux => {
          return (
            <ListGroupItem
              tag={"button"}
              action
              dataId={aux.id}
              onClick={
                (function() {
                  setID(aux.id);
                },
                () => props.onDataSelected(aux.id))
              }
            >
              {aux.name}
            </ListGroupItem>
          );
        })}
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
