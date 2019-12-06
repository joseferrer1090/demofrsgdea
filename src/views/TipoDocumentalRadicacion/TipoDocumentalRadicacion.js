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

export default withTranslation("translations")(
  class TipoDocumentalRadicacion extends React.Component {
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
              <FormCreate />
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
                  <FormImport />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      );
    }
  }
);
