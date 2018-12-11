import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Dashboard = React.lazy(() => import("./views/Dashboard"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Inicio", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard }
];

export default routes;
