import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { browserHistory } from "react-router";
import Select from "react-select";
import { options } from "./../../config/options";
import { withTranslation } from "react-i18next";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";

import logo from "../../assets/img/sevenet_ori.svg";
import sygnet from "../../assets/img/sevenet_ori.svg";
import { useTranslation, Trans } from "react-i18next";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoFull: logo,
      logoMin: sygnet,
      lang: options[1]
    };
  }

  // pagePrincipal = () => {
  //   browserHistory.push("/path");
  // };

  changeLang = lang => {
    const { i18n } = this.props;
    const { value } = lang;
    this.setState({
      lang
    });
    i18n.changeLanguage(value);
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { t } = this.props;
    const { lang } = this.state.lang;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{
            src: this.state.logoFull,
            width: 100,
            height: 40,
            alt: "Logo Lexco "
          }}
          minimized={{
            src: this.state.logoMin,
            width: 40,
            height: 40,
            alt: "Logo Lexco"
          }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          {/* <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem> */}
          <NavItem className="px-4">
            <Select
              defaultValue={options[0]}
              options={options}
              value={lang}
              onChange={this.changeLang}
              className=""
            />
          </NavItem>
          {/* <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem> */}
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell"></i>
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-location-pin" />
            </NavLink>
          </NavItem> */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav style={{ marginRight: "4px !important" }}>
              {t("userLogged")}
              <img
                src={"../../assets/img/avatars/user2.jpg"}
                className="img-avatar"
                alt="administratos@image"
              />
            </DropdownToggle>
            <DropdownMenu style={{ marginLeft: "-45px" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>{t("account")}</strong>
              </DropdownItem>
              <DropdownItem>
                <Link
                  style={{
                    textDecoration: "none",
                    cursor: "pointer !important",
                    color: "black"
                  }}
                  to="/configuracion/perfil"
                >
                  {" "}
                  <i className="fa fa-user" /> {t("account")}{" "}
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link
                  to="/middleware"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer !important",
                    color: "black"
                  }}
                >
                  {" "}
                  <i className="fa fa-wrench" /> {t("homePage")}{" "}
                </Link>
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock" /> {t("goOut")}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withTranslation("translations")(DefaultHeader);
