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
import FormCreate from "./components/FormCreateTipoDocumentalRadicacion";
import FormImport from "./components/FormUploadTipoDocumentalRadication";
import TableContent from "./components/TableContentTipoDocumentalRadication";
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

export default withTranslation("translations")(
  class TipoDocumentalRadicacion extends React.Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        activeTab: "1",
        authToken: ""
      };
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

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
    render() {
      const { authToken } = this.state;
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
                <i className="fa fa-plus" /> {t("app_documentalRadicacion_tab")}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                <i className="fa fa-gear" />{" "}
                {t("app_documentalRadicacion_tab_2")}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "3" })}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                <i className="fa fa-upload" />{" "}
                {t("app_documentalRadicacion_tab_3")}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <FormCreate authorization={authToken} />
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
);
