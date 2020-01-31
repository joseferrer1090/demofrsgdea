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
import { withTranslation } from "react-i18next";
import FormCreateTemplateEmail from "./components/FormCreatePlantillaEmail";
import PlantillaEmailForm from "./components/Forms/PlantillaEmailForm";
import TableContentPlantillaEmail from "./components/TableContentPlantillaEmail";

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

class PlantillaEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      authToken: "",
      userToken: ""
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
              <i className="fa fa-plus " /> {t("app_plantilla_email_tab_2")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <i className={"fa fa-gear"} /> {t("app_plantilla_email_tab_3")}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <TableContentPlantillaEmail authorization={authToken} t={t} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Col sm="12">Importar</Col>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default withTranslation("translations")(PlantillaEmail);
