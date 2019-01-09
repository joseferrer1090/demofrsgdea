import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import FormCreate from "./components/FormCreateGrupos";

export default class GrupoUsuarios extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <i className="fa fa-plus" /> Registrar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <i className="fa fa-gear" /> Administrar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <i className="fa fa-upload" /> Importar
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <FormCreate />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
