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
import FormImporTipoLegada from "./components/FormImportTipoLlegada";
import FormCreateTipoLlegada from "./components/FormCreateTipoLlegada";
import TableContent from "./components/TableTipoLlegada";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

class TipoLlegada extends Component {
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
    const { t } = this.props;
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
              <i className="fa fa-plus " /> {t("app_tipoLlegada_tab")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <i className={"fa fa-gear"} /> {t("app_tipoLlegada_tab_2")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <i className={"fa fa-upload"} /> {t("app_tipoLlegada_tab_3")}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <FormCreateTipoLlegada />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <TableContent />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <FormImporTipoLegada />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
TipoLlegada.propTypes = {
  t: PropTypes.any
};

export default withTranslation("translations")(TipoLlegada);
