import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Collapse,
} from "reactstrap";
import PropType from "prop-types";
import { withTranslation } from "react-i18next";

class NewEditTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headercollapse: false,
      bodycollapse: false,
      footercollapse: false,
      componentscollapse: false,
    };
  }

  toggle = () => {
    this.setState({ headercollapse: !this.state.headercollapse });
  };

  toggleBody = () => {
    this.setState({
      headercollapse: false,
      bodycollapse: !this.state.bodycollapse,
    });
  };

  toggleFooter = () => {
    this.setState({
      headercollapse: false,
      bodycollapse: false,
      footercollapse: !this.state.footercollapse,
    });
  };

  toggleComponentes = () => {
    this.setState({
      headercollapse: false,
      bodycollapse: false,
      footercollapse: false,
      componentscollapse: !this.state.componentscollapse,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Col sm="12">
                  <Card>
                    <CardHeader
                      onClick={() => {
                        this.toggle();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {t("user_profile_tab_5_header")}{" "}
                    </CardHeader>
                    <Collapse isOpen={this.state.headercollapse}>
                      <CardBody>
                        <p>Probando</p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader
                      onClick={() => {
                        this.toggleBody();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {t("user_profile_tab_5_body")}{" "}
                    </CardHeader>
                    <Collapse isOpen={this.state.bodycollapse}>
                      <CardBody>
                        <p>Probando</p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader
                      onClick={() => {
                        this.toggleFooter();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {t("user_profile_tab_5_footer")}{" "}
                    </CardHeader>
                    <Collapse isOpen={this.state.footercollapse}>
                      <CardBody>
                        <p>Probando</p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader
                      onClick={() => {
                        this.toggleComponentes();
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {t("user_profile_tab_5_otro")}
                    </CardHeader>
                    <Collapse isOpen={this.state.componentscollapse}>
                      <CardBody>
                        <p>Probando</p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </Col>
              </CardBody>
              <CardFooter>
                <div className="float-right">
                  <button className="btn btn-secondary btn-sm">
                    {" "}
                    <i className="fa fa-times" />{" "}
                    {t("user_profile_tab_5_button_cancel")}{" "}
                  </button>
                  &nbsp;
                  <button className="btn btn-secondary btn-sm">
                    <i className="fa fa-pencil" />{" "}
                    {t("user_profile_tab_5_button_new")}{" "}
                  </button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation("translations")(NewEditTheme);
