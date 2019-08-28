import React, { Component } from "react";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import { withNamespaces, Translation } from "react-i18next";

class FormUpdateData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <div className="container">
              <Row>
                <Col sm="6">
                  <div className="form-group">
                    <label> {t("user_profile_tab_1_form_update_1_id")} </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      disabled
                    />
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label>{t("user_profile_tab_1_form_update_1_name")} </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <div className="form-group">
                    <p> {t("user_profile_tab_1_from_update_1_date")} </p>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                    />
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label> {t("user_profile_tab_1_from_update_1_tel")} </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <div className="form-group">
                    <label> {t("user_profile_tab_1_from_update_1_dir")} </label>
                    <textarea className="form-control form-control-sm" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t("user_profile_tab_1_from_update_1_email")}{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      disabled
                    />
                  </div>
                </Col>
                <Col sm="6">
                  <div className="form-group">
                    <label>
                      {" "}
                      {t("user_profile_tab_1_from_update_1_user")}{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      disabled
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
          <CardFooter>
            <div className="float-right">
              <button type="button" className="btn btn-secondary btn-sm">
                <i className="fa fa-refresh" />{" "}
                {t("user_profile_tab_1_from_update_1_update")}{" "}
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default withNamespaces("translations")(FormUpdateData);
