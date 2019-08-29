import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { t } = this.props;
    return (
      <React.Fragment>
        <span>
          <a>LEXCO SA</a> &copy; 2018 {t("development_footer")} Lexco.
        </span>
        <span className="ml-auto">
          {t("developer_footer")} <a>Lexco SA</a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default withTranslation("translations")(DefaultFooter);
