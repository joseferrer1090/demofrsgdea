import React from "react";
import DefaultLayout from "./containers/DefaultLayout";
import gruposUsuarios from "./views/Grupos/gruposUsuarios";
import Pais from "./views/Pais/Pais";
import Ciudad from "./views/Ciudad/Ciudad";
import Departamento from "./views/Departamento/Departamento";
import Profile from "./views/Pages/Profile/Profle";
import Tema from "./views/Tema/Tema";

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
    name: " Configuración / Tipo documental de radicacion ",
    component: TipoDocumentalesRadicacion
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
    name: " Configuracion / Auditoria ",
    component: Auditoria
  },
  {
    path: "/configuracion/auditoria/moverhistorico",
    exact: true,
    name: "Mover historico",
    component: MoverHistorico
  },
  {
    path: "/configuracion/tema",
    exact: true,
    name: " Configuracion / tema  ",
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
  }
];

export default routes;
