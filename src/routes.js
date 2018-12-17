import React from "react";
import DefaultLayout from "./containers/DefaultLayout";
import gruposUsuarios from "./views/Grupos/gruposUsuarios";
import Pais from "./views/Pais/Pais";
import Ciudad from "./views/Ciudad/Ciudad";
import Departamento from "./views/Departamento/Departamento";

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
    name: "Configuracion / Conglomerado",
    component: Conglomerado
  },
  {
    path: "/configuracion/empresa",
    exact: true,
    name: " Configuracion / Empresa ",
    component: Empresa
  },
  {
    path: "/configuracion/sedes",
    exact: true,
    name: " Configuracion / Sedes ",
    component: Sedes
  },
  {
    path: "/configuracion/dependencias",
    exact: true,
    name: " Configuracion / Dependencias ",
    component: Dependencias
  },
  {
    path: "/configuracion/cargo",
    exact: true,
    name: " Configuracion / Cargo ",
    component: Cargo
  },
  {
    path: "/configuracion/usuarios",
    exact: true,
    name: " Configuracion / Usuarios ",
    component: Usuarios
  },
  {
    path: "/configuracion/roles",
    exact: true,
    name: " Configuracion / Roles ",
    component: Roles
  },
  {
    path: "/configuracion/grupos",
    exact: true,
    name: " Configuracion / Grupos ",
    component: GruposUsuarios
  },
  {
    path: "/configuracion/remitentes",
    exact: true,
    name: " Configuracion / Remitentes ",
    component: Remitentes
  },
  {
    path: "/configuracion/tipodocumental",
    exact: true,
    name: " Configuracion / Tipo documentales ",
    component: TipoDocumentales
  },
  {
    path: "/configuracion/tipodocumentalradicacion",
    exact: true,
    name: " Configuracion / Tipo documentale de radicacion ",
    component: TipoDocumentalesRadicacion
  },
  {
    path: "/configuracion/pais",
    exact: true,
    name: " Configuracion / Pais ",
    component: Pais
  },
  {
    path: "/configuracion/ciudad",
    exact: true,
    name: " Configuracion / Ciudades",
    component: Ciudad
  },
  {
    path: "/configuracion/departamento",
    exact: true,
    name: " Configuracion / Departamento",
    component: Departamento
  }
];

export default routes;
