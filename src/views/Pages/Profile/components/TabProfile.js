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

export default class TabProfile extends React.Component {
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
              <i className="icon-user" /> Datos personales
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <i className="icon-lock" /> Contraseña
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Card body>
                  <form className="form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label> Nueva contraseña </label>
                          <input type="password" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label> Repetir nueva contraseña </label>
                          <input type="password" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </form>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
