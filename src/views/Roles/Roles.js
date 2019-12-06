import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import FormCreate from "./components/FormCreateRoles";
import TableContent from "./components/TableContentRoles";
import FormImport from "./components/FormUploadRoles";
import data from "../../data/data";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

class Roles extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      t: this.props.t
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
    const { t } = this.props;
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
              <i className="fa fa-plus" /> {t("app_roles_tab")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <i className="fa fa-gear" /> {t("app_roles_tab_2")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <i className="fa fa-upload" /> {t("app_roles_tab_3")}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <FormCreate data={data} />
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <TableContent data={data} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <FormImport />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
Roles.propTypes = {
  t: PropTypes.any
};
export default withTranslation("translations")(Roles);
