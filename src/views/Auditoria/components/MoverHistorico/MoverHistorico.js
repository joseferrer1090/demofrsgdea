import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import FormManual from "./components/FormManual";
import FormAutomatic from "./components/FormAutomatic";
import classnames from "classnames";

class MoverHisotrico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <i className="cui-note" /> Manual
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <i className="cui-cog" /> Automatico
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="row">
              <div className="col-md-12">
                <FormManual />
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="row">
              <div className="col-md-12">
                <FormAutomatic />
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default MoverHisotrico;
