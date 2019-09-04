import React, { Component } from "react";
import { Route, Link, matchPath } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import data from "./../../routes";

let routes = [
  {
    path: "/configuracion",
    exact: true,
    name: "Inicio",
    component: null
  },
  // {
  //   path: "/configuracion",
  //   exact: true,
  //   name: "Configuracion",
  //   component: Configuracion
  // },
  {
    path: "/configuracion/conglomerado",
    exact: true,
    name: "Configuración / Conglomerado",
    component: null
  },
  {
    path: "/configuracion/empresa",
    exact: true,
    name: " Configuración / Empresa ",
    component: null
  },
  {
    path: "/configuracion/sedes",
    exact: true,
    name: " Configuración / Sedes ",
    component: null
  },
  {
    path: "/configuracion/dependencia",
    exact: true,
    name: " Configuración / Dependencia ",
    component: null
  },
  {
    path: "/configuracion/cargo",
    exact: true,
    name: " Configuración / Cargo ",
    component: null
  },
  {
    path: "/configuracion/usuarios",
    exact: true,
    name: " Configuración / Usuarios ",
    component: null
  },
  {
    path: "/configuracion/roles",
    exact: true,
    name: " Configuración / Roles  ",
    component: null
  },
  {
    path: "/configuracion/grupos",
    exact: true,
    name: " Configuración / Grupo de usuarios ",
    component: null
  },
  {
    path: "/configuracion/terceros",
    exact: true,
    name: " Configuración / Terceros",
    component: null
  },
  {
    path: "/configuracion/tipodocumental",
    exact: true,
    name: " Configuración / Tipo documentales ",
    component: null
  },
  {
    path: "/configuracion/tipodocumentalradicacion",
    exact: true,
    name: " Configuración / Tipo documental de radicación ",
    component: null
  },
  {
    path: "/configuracion/tipodocumentalradication/edit",
    exact: true,
    name: "Configuración / Tipo documental de radicación",
    component: null
  },
  {
    path: "/configuracion/pais",
    exact: true,
    name: " Configuración / País ",
    component: null
  },
  {
    path: "/configuracion/ciudad",
    exact: true,
    name: " Configuración / Ciudad",
    component: null
  },
  {
    path: "/configuracion/departamento",
    exact: true,
    name: " Configuración / Departamento",
    component: null
  },
  {
    path: "/configuracion/perfil",
    exact: true,
    name: " Configuración / Perfil de usuario ",
    component: null
  },
  {
    path: "/configuracion/auditoria",
    exact: true,
    name: " Configuración / Auditoria ",
    component: null
  },
  {
    path: "/configuracion/auditoria/moverhistorico",
    exact: true,
    name: "Mover histórico",
    component: null
  },
  {
    path: "/configuracion/tema",
    exact: true,
    name: " Configuración / tema  ",
    component: null
  },
  {
    path: "/configuracion/mensajero",
    exact: true,
    name: " Configuración / Mensajero  ",
    component: null
  },
  {
    path: "/configuracion/tipollegada",
    exact: true,
    name: " Configuración / Tipo de envío / llegada  ",
    component: null
  },
  {
    path: "/configuracion/tipotramite",
    exact: true,
    name: "Configuración / Tipo trámite",
    component: null
  },
  {
    path: "/configuracion/tipotramite/edit",
    exact: true,
    name: "Editar tipo de tramite",
    component: null
  },
  {
    path: "/configuracion/tipotercero",
    exact: true,
    name: "Configuración / tipo de tercero",
    component: null
  },
  {
    path: "/configuracion/plantilla",
    exact: true,
    name: "Configuración / Plantilla de datos",
    component: null
  },
  {
    path: "/configuracion/plantilla/edit",
    exact: true,
    name: "Editar plantilla de datos",
    component: null
  },
  {
    path: "/configuracion/plantilla/addindexes",
    exact: true,
    name: "Agregar indices de datos",
    component: null
  }
];
const getPaths = pathname => {
  const paths = ["/"];

  if (pathname === "/") return paths;

  pathname.split("/").reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

const findRouteName = url => {
  const aroute = routes.find(route =>
    matchPath(url, { path: route.path, exact: route.exact })
  );
  return aroute && aroute.name ? aroute.name : null;
};

const BreadcrumbsItem = ({ match }) => {
  const routeName = findRouteName(match.url);
  if (routeName) {
    return match.isExact ? (
      <BreadcrumbItem active>{routeName}</BreadcrumbItem>
    ) : (
      <BreadcrumbItem>
        <Link to={match.url || ""}>{routeName}</Link>
      </BreadcrumbItem>
    );
  }
  return null;
};

BreadcrumbsItem.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

const Breadcrumbs = args => {
  const paths = getPaths(args.location.pathname);
  const items = paths.map((path, i) => (
    <Route key={i.toString()} path={path} component={BreadcrumbsItem} />
  ));
  return <Breadcrumb>{items}</Breadcrumb>;
};

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  appRoutes: PropTypes.any,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

const defaultProps = {
  tag: "div",
  className: "",
  appRoutes: [{ path: "/", exact: true, name: "Home", component: null }]
};

class AppBreadcrumb extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        {
          path: "/configuracion",
          exact: true,
          name: `${props.t("app_breadcrumb_inicio")}`,
          component: null
        },
        // {
        //   path: "/configuracion",
        //   exact: true,
        //   name: "Configuracion",
        //   component: Configuracion
        // },
        {
          path: "/configuracion/conglomerado",
          exact: true,
          name: "Configuración / Conglomerado",
          component: null
        },
        {
          path: "/configuracion/empresa",
          exact: true,
          name: " Configuración / Empresa ",
          component: null
        },
        {
          path: "/configuracion/sedes",
          exact: true,
          name: " Configuración / Sedes ",
          component: null
        },
        {
          path: "/configuracion/dependencia",
          exact: true,
          name: " Configuración / Dependencia ",
          component: null
        },
        {
          path: "/configuracion/cargo",
          exact: true,
          name: " Configuración / Cargo ",
          component: null
        },
        {
          path: "/configuracion/usuarios",
          exact: true,
          name: " Configuración / Usuarios ",
          component: null
        },
        {
          path: "/configuracion/roles",
          exact: true,
          name: " Configuración / Roles  ",
          component: null
        },
        {
          path: "/configuracion/grupos",
          exact: true,
          name: " Configuración / Grupo de usuarios ",
          component: null
        },
        {
          path: "/configuracion/terceros",
          exact: true,
          name: " Configuración / Terceros",
          component: null
        },
        {
          path: "/configuracion/tipodocumental",
          exact: true,
          name: " Configuración / Tipo documentales ",
          component: null
        },
        {
          path: "/configuracion/tipodocumentalradicacion",
          exact: true,
          name: " Configuración / Tipo documental de radicación ",
          component: null
        },
        {
          path: "/configuracion/tipodocumentalradication/edit",
          exact: true,
          name: "Configuración / Tipo documental de radicación",
          component: null
        },
        {
          path: "/configuracion/pais",
          exact: true,
          name: " Configuración / País ",
          component: null
        },
        {
          path: "/configuracion/ciudad",
          exact: true,
          name: " Configuración / Ciudad",
          component: null
        },
        {
          path: "/configuracion/departamento",
          exact: true,
          name: " Configuración / Departamento",
          component: null
        },
        {
          path: "/configuracion/perfil",
          exact: true,
          name: " Configuración / Perfil de usuario ",
          component: null
        },
        {
          path: "/configuracion/auditoria",
          exact: true,
          name: " Configuración / Auditoria ",
          component: null
        },
        {
          path: "/configuracion/auditoria/moverhistorico",
          exact: true,
          name: "Mover histórico",
          component: null
        },
        {
          path: "/configuracion/tema",
          exact: true,
          name: " Configuración / tema  ",
          component: null
        },
        {
          path: "/configuracion/mensajero",
          exact: true,
          name: " Configuración / Mensajero  ",
          component: null
        },
        {
          path: "/configuracion/tipollegada",
          exact: true,
          name: " Configuración / Tipo de envío / llegada  ",
          component: null
        },
        {
          path: "/configuracion/tipotramite",
          exact: true,
          name: "Configuración / Tipo trámite",
          component: null
        },
        {
          path: "/configuracion/tipotramite/edit",
          exact: true,
          name: "Editar tipo de tramite",
          component: null
        },
        {
          path: "/configuracion/tipotercero",
          exact: true,
          name: "Configuración / tipo de tercero",
          component: null
        },
        {
          path: "/configuracion/plantilla",
          exact: true,
          name: "Configuración / Plantilla de datos",
          component: null
        },
        {
          path: "/configuracion/plantilla/edit",
          exact: true,
          name: "Editar plantilla de datos",
          component: null
        },
        {
          path: "/configuracion/plantilla/addindexes",
          exact: true,
          name: "Agregar indices de datos",
          component: null
        }
      ]
    };
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
      routes: [
        {
          path: `/configuracion`,
          exact: true,
          name: `${t("app_breadcrumb_inicio")}`,
          component: null
        }
      ]
    });
  };

  render() {
    const { className, tag: Tag, ...attributes } = this.props;

    delete attributes.children;
    delete attributes.appRoutes;

    const classes = classNames(className);

    return (
      <Tag className={classes}>
        <Route path="/:path" component={Breadcrumbs} {...attributes} />
      </Tag>
    );
  }
}

AppBreadcrumb.propTypes = propTypes;
AppBreadcrumb.defaultProps = defaultProps;

export default AppBreadcrumb;
