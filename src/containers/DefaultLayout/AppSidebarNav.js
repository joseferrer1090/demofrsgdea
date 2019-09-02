import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Nav, NavItem, NavLink as RsNavLink } from "reactstrap";
import classNames from "classnames";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { withTranslation } from "react-i18next";

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  navConfig: PropTypes.any,
  navFunc: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  isOpen: PropTypes.bool,
  staticContext: PropTypes.any,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  t: PropTypes.any
};

const defaultProps = {
  tag: "nav",
  navConfig: {
    items: [
      {
        name: "Incio",
        url: "/configuracion",
        icon: "icon-home"
      }
    ]
  },
  isOpen: false
};

class AppSidebarNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: `${props.t("nav_app_home")}`,
          url: "/configuracion",
          icon: "icon-home"
        },
        {
          name: `${props.t("nav_app_conglomerado")}`,
          icon: "icon-settings",
          url: "/configuracion/conglomerado"
        },
        {
          name: `${props.t("nav_app_empresa")}`,
          icon: "icon-settings",
          url: "/configuracion/empresa"
        },
        {
          name: `${props.t("nav_app_sedes")}`,
          icon: "icon-settings",
          url: "/configuracion/sedes"
        },
        {
          name: `${props.t("nav_app_dependencia")}`,
          icon: "icon-settings",
          url: "/configuracion/dependencia"
        },
        {
          name: `${props.t("nav_app_cargo")}`,
          icon: "icon-settings",
          url: "/configuracion/cargo"
        },
        {
          name: `${props.t("nav_app_mensajero")}`,
          icon: "icon-settings ",
          url: "/configuracion/mensajero"
        },
        {
          name: `${props.t("nav_app_tipo_llegada")}`,
          icon: "icon-settings",
          url: "/configuracion/tipollegada"
        },
        {
          name: `${props.t("nav_app_tipo_tramite")}`,
          icon: "icon-settings",
          url: "/configuracion/tipotramite"
        },
        {
          name: `${props.t("nav_app_usuarios")}`,
          icon: "icon-settings",
          url: "/configuracion/usuarios"
        },
        {
          name: `${props.t("nav_app_tipo_terceros")}`,
          icon: "icon-settings",
          url: "/configuracion/tipotercero"
        },
        {
          name: `${props.t("nav_app_roles")}`,
          icon: "icon-settings",
          url: "/configuracion/roles"
        },
        {
          name: `${props.t("nav_app_grupo_usuarios")}`,
          icon: "icon-settings",
          url: "/configuracion/grupos"
        },
        {
          name: `${props.t("nav_app_terceros")}`,
          icon: "icon-settings",
          url: "/configuracion/terceros"
        },
        {
          name: `${props.t("nav_app_tipo_radicacion")}`,
          icon: "icon-book-open",
          url: "/configuracion/tipodocumentalradicacion"
        },
        {
          name: `${props.t("nav_app_pais")}`,
          icon: "icon-settings",
          url: "/configuracion/pais"
        },
        {
          name: `${props.t("nav_app_departamento")}`,
          icon: "icon-settings",
          url: "/configuracion/departamento"
        },
        {
          name: `${props.t("nav_app_ciudad")}`,
          icon: "icon-settings",
          url: "/configuracion/ciudad"
        },
        {
          name: `${props.t("nav_app_auditoria")}`,
          icon: "icon-info",
          url: "/configuracion/auditoria",
          children: [
            {
              name: `${props.t("nav_app_auditoria_consultar")}`,
              url: "/configuracion/auditoria",
              icon: "fa fa-search"
            },
            {
              name: `${props.t("nav_app_auditoria_mover")}`,
              url: "/configuracion/auditoria/moverhistorico",
              icon: "fa fa-server"
            }
          ]
        },
        {
          name: `${props.t("nav_app_plantilla")}`,
          url: "/configuracion/plantilla",
          icon: "fa fa-puzzle-piece"
        },
        {
          name: `${props.t("nav_app_tema")}`,
          icon: "icon-pencil",
          url: "/configuracion/tema"
        }
      ],
      t: this.props.t
    };
    this.handleClick = this.handleClick.bind(this);
    this.activeRoute = this.activeRoute.bind(this);
    this.hideMobile = this.hideMobile.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.t !== state.t) {
      return {
        t: props.t
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, PrevState) {
    if (this.props.t !== prevProps.t) {
      this.handleItems(this.props.t);
    }
  }

  handleItems = t => {
    this.setState({
      items: [
        {
          name: `${t("nav_app_home")}`,
          url: "/configuracion",
          icon: "icon-home"
        },
        {
          name: `${t("nav_app_conglomerado")}`,
          icon: "icon-settings",
          url: "/configuracion/conglomerado"
        },
        {
          name: `${t("nav_app_empresa")}`,
          icon: "icon-settings",
          url: "/configuracion/empresa"
        },
        {
          name: `${t("nav_app_sedes")}`,
          icon: "icon-settings",
          url: "/configuracion/sedes"
        },
        {
          name: `${t("nav_app_dependencia")}`,
          icon: "icon-settings",
          url: "/configuracion/dependencia"
        },
        {
          name: `${t("nav_app_cargo")}`,
          icon: "icon-settings",
          url: "/configuracion/cargo"
        },
        {
          name: `${t("nav_app_mensajero")}`,
          icon: "icon-settings ",
          url: "/configuracion/mensajero"
        },
        {
          name: `${t("nav_app_tipo_llegada")}`,
          icon: "icon-settings",
          url: "/configuracion/tipollegada"
        },
        {
          name: `${t("nav_app_tipo_tramite")}`,
          icon: "icon-settings",
          url: "/configuracion/tipotramite"
        },
        {
          name: `${t("nav_app_usuarios")}`,
          icon: "icon-settings",
          url: "/configuracion/usuarios"
        },
        {
          name: `${t("nav_app_tipo_terceros")}`,
          icon: "icon-settings",
          url: "/configuracion/tipotercero"
        },
        {
          name: `${t("nav_app_roles")}`,
          icon: "icon-settings",
          url: "/configuracion/roles"
        },
        {
          name: `${t("nav_app_grupo_usuarios")}`,
          icon: "icon-settings",
          url: "/configuracion/grupos"
        },
        {
          name: `${t("nav_app_terceros")}`,
          icon: "icon-settings",
          url: "/configuracion/terceros"
        },
        {
          name: `${t("nav_app_tipo_radicacion")}`,
          icon: "icon-book-open",
          url: "/configuracion/tipodocumentalradicacion"
        },
        {
          name: `${t("nav_app_pais")}`,
          icon: "icon-settings",
          url: "/configuracion/pais"
        },
        {
          name: `${t("nav_app_departamento")}`,
          icon: "icon-settings",
          url: "/configuracion/departamento"
        },
        {
          name: `${t("nav_app_ciudad")}`,
          icon: "icon-settings",
          url: "/configuracion/ciudad"
        },
        {
          name: `${t("nav_app_auditoria")}`,
          icon: "icon-info",
          url: "/configuracion/auditoria",
          children: [
            {
              name: `${t("nav_app_auditoria_consultar")}`,
              url: "/configuracion/auditoria",
              icon: "fa fa-search"
            },
            {
              name: `${t("nav_app_auditoria_mover")}`,
              url: "/configuracion/auditoria/moverhistorico",
              icon: "fa fa-server"
            }
          ]
        },
        {
          name: `${t("nav_app_plantilla")}`,
          url: "/configuracion/plantilla",
          icon: "fa fa-puzzle-piece"
        },
        {
          name: `${t("nav_app_tema")}`,
          icon: "icon-pencil",
          url: "/configuracion/tema"
        }
      ]
    });
  };

  handleClick(e) {
    e.preventDefault();
    e.currentTarget.parentElement.classList.toggle("open");
  }

  activeRoute(routeName, props) {
    return props.location.pathname.indexOf(routeName) > -1
      ? "nav-item nav-dropdown open"
      : "nav-item nav-dropdown";
  }

  hideMobile() {
    if (document.body.classList.contains("sidebar-show")) {
      document.body.classList.toggle("sidebar-show");
    }
  }

  // nav list
  navList(items) {
    return items.map((item, index, t) => this.navType(item, index));
  }

  // nav type
  navType(item, idx, t) {
    return item.title
      ? this.navTitle(item, idx, t)
      : item.divider
      ? this.navDivider(item, idx, t)
      : item.label
      ? this.navLabel(item, idx, t)
      : item.children
      ? this.navDropdown(item, idx, t)
      : this.navItem(item, idx, t);
  }

  // nav list section title
  navTitle(title, key) {
    const classes = classNames("nav-title", title.class);
    return (
      <li key={key} className={classes}>
        {this.navWrapper(title)}{" "}
      </li>
    );
  }

  // simple wrapper for nav-title item
  navWrapper(item) {
    return item.wrapper && item.wrapper.element
      ? React.createElement(
          item.wrapper.element,
          item.wrapper.attributes,
          item.name
        )
      : item.name;
  }

  // nav list divider
  navDivider(divider, key) {
    const classes = classNames("divider", divider.class);
    return <li key={key} className={classes} />;
  }

  // nav label with nav link
  navLabel(item, key) {
    const classes = {
      item: classNames("hidden-cn", item.class),
      link: classNames("nav-label", item.class ? item.class : ""),
      icon: classNames(
        "nav-icon",
        !item.icon ? "fa fa-circle" : item.icon,
        item.label.variant ? `text-${item.label.variant}` : "",
        item.label.class ? item.label.class : ""
      )
    };
    return this.navLink(item, key, classes);
  }

  // nav dropdown
  navDropdown(item, key) {
    const classIcon = classNames("nav-icon", item.icon);
    const attributes = JSON.parse(JSON.stringify(item.attributes || {}));
    const classes = classNames(
      "nav-link",
      "nav-dropdown-toggle",
      item.class,
      attributes.class
    );
    delete attributes.class;
    return (
      <li key={key} className={this.activeRoute(item.url, this.props)}>
        <a
          className={classes}
          href="#"
          onClick={this.handleClick}
          {...attributes}
        >
          <i className={classIcon} />
          {item.name}
          {this.navBadge(item.badge)}
        </a>
        <ul className="nav-dropdown-items">{this.navList(item.children)}</ul>
      </li>
    );
  }

  // nav item with nav link
  navItem(item, key) {
    const classes = {
      item: classNames(item.class),
      link: classNames(
        "nav-link",
        item.variant ? `nav-link-${item.variant}` : ""
      ),
      icon: classNames("nav-icon", item.icon)
    };
    return this.navLink(item, key, classes);
  }

  // nav link
  navLink(item, key, classes) {
    const url = item.url || "";
    const itemIcon = <i className={classes.icon} />;
    const itemBadge = this.navBadge(item.badge);
    const attributes = item.attributes || {};
    return (
      <NavItem key={key} className={classes.item}>
        {attributes.disabled ? (
          <RsNavLink href={""} className={classes.link} {...attributes}>
            {itemIcon}
            {item.name}
            {itemBadge}
          </RsNavLink>
        ) : this.isExternal(url) ? (
          <RsNavLink href={url} className={classes.link} active {...attributes}>
            {itemIcon}
            {item.name}
            {itemBadge}
          </RsNavLink>
        ) : (
          <NavLink
            to={url}
            className={classes.link}
            activeClassName="active"
            onClick={this.hideMobile}
            {...attributes}
          >
            {itemIcon}
            {item.name}
            {itemBadge}
          </NavLink>
        )}
      </NavItem>
    );
  }

  // badge addon to NavItem
  navBadge(badge) {
    if (badge) {
      const classes = classNames(badge.class);
      return (
        <Badge className={classes} color={badge.variant}>
          {badge.text}
        </Badge>
      );
    }
    return null;
  }

  isExternal(url) {
    const link = url ? url.substring(0, 4) : "";
    return link === "http";
  }

  render() {
    const { className, children, navConfig, t, ...attributes } = this.props;

    delete attributes.isOpen;
    delete attributes.staticContext;
    delete attributes.Tag;

    const navClasses = classNames(className, "sidebar-nav");

    // ToDo: find better rtl fix
    const isRtl =
      getComputedStyle(document.documentElement).direction === "rtl";

    // sidebar-nav root
    return (
      <PerfectScrollbar
        className={navClasses}
        {...attributes}
        options={{ suppressScrollX: !isRtl }}
      >
        <Nav>{this.navList(this.state.items)}</Nav>
      </PerfectScrollbar>
    );
  }
}

AppSidebarNav.propTypes = propTypes;
AppSidebarNav.defaultProps = defaultProps;

export default withTranslation("translations")(AppSidebarNav);
