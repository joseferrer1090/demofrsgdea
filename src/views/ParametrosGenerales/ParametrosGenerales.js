import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Badge,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import classnames from "classnames";
import { withTranslation } from "react-i18next";
import { MODULE_ALL } from "./../../services/EndPoints";
import Listmodules from "./components/ListModules";
import GroupParameter from "./components/GroupParameters";

class ParametrosGenerales extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1,
      idListModule: {}
    };
  }

  componentDidMount() {
    //this.getModules();
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  getModules = () => {
    console.log("Probando");
    console.log(this.props.authorization);
  };

  onDataSelected = props => {
    this.setState({
      idListModule: props
    });
  };

  render() {
    const { t } = this.props;
    console.log(this.state.idListModule);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <Card>
              <CardHeader>
                <i className="fa fa-cogs"></i>
                Parametro generales del Sistema{" "}
              </CardHeader>
              <CardBody>
                <Row>
                  <Listmodules
                    authorization={this.props.authorization}
                    onDataSelected={this.onDataSelected}
                  />
                  <Col xs="8">
                    <TabContent>
                      <GroupParameter
                        moduleID={this.state.idListModule}
                        authorization={this.props.authorization}
                      />
                    </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <Card>
              <CardBody>
                <p>Informacion de todos los parametos</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation("translations")(ParametrosGenerales);
