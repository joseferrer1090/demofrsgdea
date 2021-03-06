import React, { Component } from "react";
import { Link } from "react-router-dom";
import { options } from "./../../config/options";
import { withTranslation } from "react-i18next";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  UncontrolledDropdown
} from "reactstrap";
import PropTypes from "prop-types";
import language from "./../../assets/img/language.png";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/sevenet_ori.svg";
import sygnet from "../../assets/img/sevenet_ori.svg";
import { history } from "./../../helpers/history";
import PhotoAvatar from "./PhotoAvatarUser";

import decode from "jwt-decode";
import { SEARCH_BY_USERNAME } from "../../services/EndPoints";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

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

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoFull: logo,
      logoMin: sygnet,
      lang: options[1],
      resp: {},
      idUser: ""
    };
  }

  // pagePrincipal = () => {
  //   browserHistory.push("/path");
  // };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    asyncLocalStorage
      .getItem("user")
      .then(resp => {
        return JSON.parse(resp);
      })
      .then(resp => {
        this.getInfoUser(resp.data.access_token);
        this.setState({
          resp: decode(resp.data.access_token),
          auth: resp.data.access_token
        });
        console.log(this.state.auth);
        console.log(this.state.resp);
      });
  };

  getInfoUser = auth => {
    const username = decode(auth);
    fetch(`${SEARCH_BY_USERNAME}/?username=${username.user_name}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          idUser: data.id
        });
      })
      .catch(Error => console.log(" ", Error));
  };

  changeLanguaje = lang => {
    const { i18n } = this.props;
    this.setState({
      lang
    });
    i18n.changeLanguage(lang);
  };

  logout = () => {
    history.push("/#/logout");
    window.location.reload();
    // dispatch = useDispatch();
    // dispatch(userActions.userlogout());
    //localStorage.removeItem("auth_token");
    //history.push("/");
    //window.location.reload();
  };

  render() {
    const { children, ...attributes } = this.props;
    const { t } = this.props;
    const { lang } = this.state.lang;
    const optionlanguage = options.map((aux, idx) => {
      return (
        <option key={idx} value={aux.value}>
          {aux.label}
        </option>
      );
    });

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
          <NavItem className="">
            <img src={language} style={{ width: 20, height: 20 }} />
          </NavItem>
          <NavItem className="">
            <select
              className="form-control form-control-sm"
              style={{ borderColor: "#9CAEB2" }}
              defaultValue={options[0].value}
              value={lang}
              onChange={e => this.changeLanguaje(e.target.value)}
            >
              <option value={""} disabled style={{ background: "#D8E3E6" }}>
                -- &nbsp; {t("language")} &nbsp; --
              </option>
              {optionlanguage}
            </select>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar style={{ marginRight: "31px" }}>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav style={{ marginRight: "4px !important" }}>
              {/* {t("userLogged")} */}
              {this.state.resp.user_name}
              <PhotoAvatar
                authorization={this.state.auth}
                id={this.state.idUser}
              />
              {/* <img
                // src={"../../assets/img/avatars/user2.jpg"}
                src={"../../assets/img/GESTIONDOCUMENTAL.jpg"}
                className="img-avatar"
                alt="administratos@image"
              /> */}
              {/*
                
              */}
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
              <DropdownItem onClick={this.logout}>
                <i className="fa fa-lock" /> {t("goOut")}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withTranslation("translations")(DefaultHeader);
