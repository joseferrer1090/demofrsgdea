import React, { Component } from "react";
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
import PropTypes from "prop-types";
import FormCreateMensajero from "./components/FormCreateMensajero";
import TableContent from "./components/TableContentMensajero";
import FormImportMensajero from "./components/FormImportMensajero";
import { withTranslation } from "react-i18next";

const asyncLocalStorage = {
  setItem: async function(key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function(key) {
    await null;
    return localStorage.getItem(key);
  }
};

class Mensajero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }
  componentDidMount() {
    this.getDataLocal();
  }

  getDataLocal = () => {
    asyncLocalStorage
      .getItem("user")
      .then(resp => {
        return JSON.parse(resp);
      })
      .then(resp => {
        this.setState({
          authToken: resp.data.access_token
        });
      });
  };

  toggle = tab => {
    if (this.state.activeTab !== 0) {
      this.setState({
        activeTab: tab
      });
    }
  };

  toggle = tab => {
    if (this.state.activeTab !== "tab") {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const { t } = this.props;
    const { authToken } = this.state;
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
              <i className="fa fa-plus " /> {t("app_mensajero_tab")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <i className={"fa fa-gear"} /> {t("app_mensajero_tab_2")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <i className={"fa fa-upload"} /> {t("app_mensajero_tab_3")}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <FormCreateMensajero />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <TableContent authorization={authToken} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <FormImportMensajero />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
Mensajero.propTypes = {
  t: PropTypes.any
};
export default withTranslation("translations")(Mensajero);
