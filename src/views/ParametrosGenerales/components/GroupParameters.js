import React from "react";
import PropTypes from "prop-types";
import { PARAMETER_GROUP_FIND_BY_MODULE_ID } from "./../../../services/EndPoints";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  CardGroup,
  TabContent
} from "reactstrap";

class GroupParameters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.moduleID,
      auth: this.props.authorization,
      listGroup: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.authorization !== state.auth) {
      return {
        auth: props.authorization
      };
    }
    if (props.id !== state.id) {
      return {
        id: props.moduleID
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.moduleID !== prevProps.moduleID) {
      // METODO
      this.getDataParamatersByModules(this.props.moduleID);
    }
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
        id: this.props.moduleID
      });
    }
  }

  getDataParamatersByModules = id => {
    fetch(`${PARAMETER_GROUP_FIND_BY_MODULE_ID}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authorization
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          listGroup: data
        });
      })
      .catch(err => console.log(`Error => ${err}`));
  };

  render() {
    console.log(this.props);
    const listGroup = this.state.listGroup;
    return (
      <div className="animated animated-fadeIn">
        <Row>
          {listGroup.length ? (
            listGroup.map((aux, id) => <CardGroupItem name={aux.name} />)
          ) : (
            <Col sm={{ size: 12 }}>
              <Card body>
                <p className="text-center">
                  Seleccione un modulo para cargar lista de grupo de parametros
                </p>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const CardGroupItem = props => {
  return (
    <Col sm={{ size: "4" }}>
      <Card>
        <CardBody>
          <CardTitle className="text-center"> {props.name} </CardTitle>
          {/* <CardSubtitle>{props.name}</CardSubtitle> */}
          {/* <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText> */}
          <button className="btn btn-secondary btn-sm btn-block">
            Seleccionar
          </button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default GroupParameters;
