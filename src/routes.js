import React from "react";
import DefaultLayout from "./containers/DefaultLayout";
import gruposUsuarios from "./views/Grupos/gruposUsuarios";
import Pais from "./views/Pais/Pais";
import Ciudad from "./views/Ciudad/Ciudad";
import Departamento from "./views/Departamento/Departamento";
import Profile from "./views/Pages/Profile/Profle";
import Tema from "./views/Tema/Tema";
import EditTramite from "./views/TipoTramite/components/ViewEditTramite";
import EditPlantilla from "./views/Plantilla/components/EditPlantilla";
import AddIndexPlantilla from "./views/Plantilla/components/AddIndexPlantilla";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  try {
    if (token != null) {
      return true;
    } else {
      return false;
    }
    // decode(token);
    // console.log(decode(token));
  } catch (error) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);

const Configuracion = React.lazy(() =>
  import("./views/Configuracion/Configuracion")
);
const Conglomerado = React.lazy(() =>
  import("./views/Conglomerado/Conglomerado")
);
const Empresa = React.lazy(() => import("./views/Empresa/Empresa"));

const Sedes = React.lazy(() => import("./views/Sedes/Sedes"));

const Dependencias = React.lazy(() =>
  import("./views/Dependencias/Dependencias")
);

const Cargo = React.lazy(() => import("./views/Cargo/Cargo"));

const Usuarios = React.lazy(() => import("./views/Usuarios/Usuarios"));

const Roles = React.lazy(() => import("./views/Roles/Roles"));

const GruposUsuarios = React.lazy(() =>
  import("./views/Grupos/gruposUsuarios")
);

const Remitentes = React.lazy(() => import("./views/Remitentes/Remitentes"));

const TipoDocumentales = React.lazy(() =>
  import("./views/TipoDocumental/TipoDocumental")
);

const TipoDocumentalesRadicacion = React.lazy(() =>
  import("./views/TipoDocumentalRadicacion/TipoDocumentalRadicacion")
);

const Auditoria = React.lazy(() => import("./views/Auditoria/Auditoria"));

const MoverHistorico = React.lazy(() =>
  import("./views/Auditoria/components/MoverHistorico/MoverHistorico")
);

const Mensajero = React.lazy(() => import("./views/Mensajero/Mensajero"));

const TipoLlegada = React.lazy(() => import("./views/TipoLlegada/TipoLlegada"));

const TipoTramite = React.lazy(() => import("./views/TipoTramite/TipoTramite"));

const TipoTercero = React.lazy(() => import("./views/TipoTercero/TipoTercero"));

const Plantilla = React.lazy(() => import("./views/Plantilla/Plantilla"));

const EditTipoDocumentalRadication = React.lazy(() =>
  import(
    "./views/TipoDocumentalRadicacion/components/ViewEditTipoDocumentalRadication"
  )
);

const RadicacionEmail = React.lazy(() =>
  import("./views/RadicacionEmail/RadicacionEmail")
);
const PlantillaEmail = React.lazy(() =>
  import("./views/PlantillaEmail/PlantillaEmail")
);
const EditPlantillaEmail = React.lazy(() =>
  import("./views/PlantillaEmail/components/ModalEditPlantillaEmail")
);
const ParametrosGenerales = React.lazy(() =>
  import("./views/ParametrosGenerales/ParametrosGenerales")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  {
    path: "/configuracion",
    exact: true,
    name: "Inicio",
    component: Configuracion
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
    component: Conglomerado
  },
  {
    path: "/configuracion/empresa",
    exact: true,
    name: " Configuración / Empresa ",
    component: Empresa
  },
  {
    path: "/configuracion/sedes",
    exact: true,
    name: " Configuración / Sedes ",
    component: Sedes
  },
  {
    path: "/configuracion/dependencia",
    exact: true,
    name: " Configuración / Dependencia ",
    component: Dependencias
  },
  {
    path: "/configuracion/cargo",
    exact: true,
    name: " Configuración / Cargo ",
    component: Cargo
  },
  {
    path: "/configuracion/usuarios",
    exact: true,
    name: " Configuración / Usuarios ",
    component: Usuarios
  },
  {
    path: "/configuracion/roles",
    exact: true,
    name: " Configuración / Roles  ",
    component: Roles
  },
  {
    path: "/configuracion/grupos",
    exact: true,
    name: " Configuración / Grupo de usuarios ",
    component: GruposUsuarios
  },
  {
    path: "/configuracion/terceros",
    exact: true,
    name: " Configuración / Terceros",
    component: Remitentes
  },
  {
    path: "/configuracion/tipodocumental",
    exact: true,
    name: " Configuración / Tipo documentales ",
    component: TipoDocumentales
  },
  {
    path: "/configuracion/tipodocumentalradicacion",
    exact: true,
    name: " Configuración / Tipo documental de radicación ",
    component: TipoDocumentalesRadicacion
  },
  {
    path: "/configuracion/tipodocumentalradication/edit/:id",
    exact: true,
    name: "Configuración / Tipo documental de radicación",
    component: props => (
      <EditTipoDocumentalRadication
        {...props}
        authorization={localStorage.getItem("auth_token")}
      />
    )
  },
  {
    path: "/configuracion/pais",
    exact: true,
    name: " Configuración / País ",
    component: Pais
  },
  {
    path: "/configuracion/ciudad",
    exact: true,
    name: " Configuración / Ciudad",
    component: Ciudad
  },
  {
    path: "/configuracion/departamento",
    exact: true,
    name: " Configuración / Departamento",
    component: Departamento
  },
  {
    path: "/configuracion/perfil",
    exact: true,
    name: " Configuración / Perfil de usuario ",
    component: Profile
  },
  {
    path: "/configuracion/auditoria",
    exact: true,
    name: " Configuración / Auditoria ",
    component: Auditoria
  },
  {
    path: "/configuracion/auditoria/moverhistorico",
    exact: true,
    name: "Mover histórico",
    component: MoverHistorico
  },
  {
    path: "/configuracion/tema",
    exact: true,
    name: " Configuración / tema  ",
    component: Tema
  },
  {
    path: "/configuracion/mensajero",
    exact: true,
    name: " Configuración / Mensajero  ",
    component: Mensajero
  },
  {
    path: "/configuracion/tipollegada",
    exact: true,
    name: " Configuración / Tipo de envío / llegada  ",
    component: TipoLlegada
  },
  {
    path: "/configuracion/tipotramite",
    exact: true,
    name: "Configuración / Tipo trámite",
    component: TipoTramite
  },
  {
    path: "/configuracion/tipotramite/edit/:id",
    exact: true,
    name: "Editar tipo de tramite",
    component: props => (
      <EditTramite
        {...props}
        authorization={localStorage.getItem("auth_token")}
      />
    )
  },
  {
    path: "/configuracion/tipotercero",
    exact: true,
    name: "Configuración / tipo de tercero",
    component: TipoTercero
  },
  {
    path: "/configuracion/plantilla",
    exact: true,
    name: "Configuración / Plantilla de datos",
    component: Plantilla
  },
  {
    path: "/configuracion/plantilla/edit",
    exact: true,
    name: "Editar plantilla de datos",
    component: EditPlantilla
  },
  {
    path: "/configuracion/plantilla/addindexes",
    exact: true,
    name: "Agregar indices de datos",
    component: AddIndexPlantilla
  },
  {
    path: "/configuracion/radicacionemail",
    exact: true,
    name: "Configuración / Radicación por email",
    component: RadicacionEmail
  },
  {
    path: "/configuracion/plantillaemail",
    exact: true,
    name: "Configuración / Plantilla de correo electrónico",
    component: PlantillaEmail
  },
  {
    path: "/configuracion/plantillaemail/edit/:id",
    exact: true,
    name: "Configuración / Plantilla de correo electrónico",
    component: props => (
      <EditPlantillaEmail
        {...props}
        authorization={localStorage.getItem("auth_token")}
      />
    )
  },
  {
    path: "/configuracion/parametrosgenerales",
    exact: true,
    name: " Configuración / Parámetros generales",
    component: ParametrosGenerales
  }
];

// {
//   routes.map((route, idx) => {
//     // console.log(route);
//   });
// }

export default routes;
