import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import FormUpdateProfile from "./FormUpdateData";
import FormChange from "./FormChangePassword";
import FormAdvance from "./FormChangeAdvanceData";
import ThemeSelector from "./ThemeSelector";
import NewEditTheme from "./NewEditTheme";
import { withTranslation } from "react-i18next";

class TabProfile extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      auth: props.authorization,
    };
  }

  static getDerivedStaticFromProps(props, state) {
    if (props.auhorization !== state.auth) {
      return {
        auth: props.authorization,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authorization !== prevProps.authorization) {
      this.setState({
        auth: this.props.authorization,
      });
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
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
              <i className="icon-user" /> {t("user_profile_tab_1")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <i className="icon-settings" />
              {t("user_profile_tab_2")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <i className="icon-lock" /> {t("user_profile_tab_3")}
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              <i className="cui-brush" /> {t("user_profile_tab_4")}
            </NavLink>
          </NavItem> */}
          {/* <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "5" })}
              onClick={() => {
                this.toggle("5");
              }}
            >
              <i className="cui-wrench" /> {t("user_profile_tab_5")}
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <FormUpdateProfile authorization={this.state.auth} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <FormChange authorization={this.state.auth} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <FormAdvance authorization={this.state.auth} />
              </Col>
            </Row>
          </TabPane>
          {/* <TabPane tabId="4">
            <Row>
              <Col sm="12">
                <ThemeSelector />
              </Col>
            </Row>
          </TabPane> */}
          {/* <TabPane tabId="5">
            <Row>
              <Col sm="12">
                <NewEditTheme />
              </Col>
            </Row>
          </TabPane> */}
        </TabContent>
      </div>
    );
  }
}

export default withTranslation("translations")(TabProfile);
