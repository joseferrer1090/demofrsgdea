import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Conglomerado = React.lazy(() =>
  import("./views/Conglomerado/Conglomerado")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Inicio", component: DefaultLayout },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/dashboard/conglomerado",
    name: "Conglomerado",
    component: Conglomerado,
    exact: true
  }
];

export default routes;
