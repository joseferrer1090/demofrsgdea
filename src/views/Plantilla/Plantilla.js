import React, { Component } from "react";
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
import FormCreatePlantilla from "./components/FormCreatePlantilla";
import TableContent from "./components/TableContentPlantilla";
import FormImport from "./components/Forms/UploadFormPlantilla";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};

class Plantilla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      authToken: "",
      t: this.props.t,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    asyncLocalStorage
      .getItem("user")
      .then((resp) => {
        return JSON.parse(resp);
      })
      .then((resp) => {
        this.setState({
          authToken: resp.data.access_token,
        });
      });
  };

  toggle = (tab) => {
    if (this.state.activeTab !== "tab") {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const { authToken } = this.state;
    const { t } = this.state;
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
              <i className="fa fa-plus " /> {t("app_plantilla_tab")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <i className={"fa fa-gear"} /> {t("app_plantilla_tab_2")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <i className={"fa fa-upload"} /> {t("app_plantilla_tab_3")}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm={12}>
                <FormCreatePlantilla t={t} authorization={authToken} />
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
                <FormImport authorization={authToken} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
Plantilla.propTypes = {
  t: PropTypes.string.isRequired,
};

export default withTranslation("translations")(Plantilla);
