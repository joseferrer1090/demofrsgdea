import React, { Component } from "react";
import PropTypes from "prop-types";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import { Row, Col } from "reactstrap";
import ModalView from "./ModalViewUser";
import ModalDelete from "./ModalDeleteUser";
import ModalUpdate from "./ModalEditUser";
import ModalChangePassword from "./FormChangePasswordUser";
import "./../../../css/styleTableUsuarios.css";

const data = [
  {
    Login: "IVANDLR",
    Nombre: "IVAN DE LA ROCHE MERINO",
    Dependencia: "DIRECCION FINANCIERA",
    Cargo: "DIRECTOR",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "RAMPER",
    Nombre: "RAMIRO PERDOMO",
    Dependencia: "SEGURIDAD FISICA",
    Cargo: "JEFE DE SEGURIDAD",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "BIVZAP",
    Nombre: "BIVIANA ANDREA ZAPATA GARZON",
    Dependencia: "TALENTO HUMANO",
    Cargo: "COORDINADOR DE TALENTO HUMANO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "CARGAR",
    Nombre: "CARLOS JOSE GARCIA BERNAL",
    Dependencia: "GERENCIA DE LOGISTICA",
    Cargo: "GERENTE DE LOGISTICA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "CARROD",
    Nombre: "CARMEN LILIANA RODRIGUEZ RODRIGUEZ",
    Dependencia: "LOGISTICA DE APROVISIONAMIENTO",
    Cargo: "AUXILIAR COMPRAS (SUMINISTROS)",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "EDUCAL",
    Nombre: "EDUIN ANTONIO CALDERA PRADO",
    Dependencia: "DISTRIBUCION BOGOTA",
    Cargo: "JEFE DE DISTRIBUCION",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "MARCIF",
    Nombre: "MARIA FERNANDA CIFUENTES PUERTO",
    Dependencia: "LOGISTICA DE APROVISIONAMIENTO",
    Cargo: "AUXILIAR COMPRAS (MATERIAS PRIMAS Y MATERIAL DE EMPAQUE)",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "MARMER",
    Nombre: "MARIO ENRIQUE MERINO PACHECO",
    Dependencia: "NOMINA",
    Cargo: "JEFE DE NOMINA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "PAOOVA",
    Nombre: "PAOLA OVALLE GARCIA",
    Dependencia: "CONTRATACION Y SEGURIDAD SOCIAL",
    Cargo: "COORDINADOR DE CONTRATACION Y SEGURIDAD SOCIAL",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "ROBREY",
    Nombre: "ROBERTO REYES CUEVAS",
    Dependencia: "CONTROL DE CALIDAD",
    Cargo: "JEFE DE CONTROL DE CALIDAD",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "WILBAL",
    Nombre: "WILSON ALEJANDRO BALLESTEROS",
    Dependencia: "CONTABILIDAD",
    Cargo: "ASISTENTE DE CONTABILIDAD",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "JOHBAR",
    Nombre: "JOHN FREDY BARRERA RINCON",
    Dependencia: "CREDITO Y CARTERA",
    Cargo: "JEFE DE CARTERA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "ALBCAM",
    Nombre: "ALBA INES CAMACHO CASAS",
    Dependencia: "SISTEMAS",
    Cargo: "ANALISTA  DE SISTEMAS",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "ANDCAB",
    Nombre: "ANDRES CABRERA RAMIREZ",
    Dependencia: "SISTEMAS",
    Cargo: "ANALISTA  DE SISTEMAS",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "ANGPEN",
    Nombre: "FLOR ANGELA PENA GALAN",
    Dependencia: "MANTENIMIENTO",
    Cargo: "AUXILIAR ADMINISTRATIVO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "DIMDEARM",
    Nombre: "DIMAS ENRIQUE DE ARMAS PACHECO",
    Dependencia: "CONTROL INTERNO",
    Cargo: "ANALISTA DE CONTROL INTERNO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "DIAORT",
    Nombre: "DIANA PATRICIA ORTEGA FISCO",
    Dependencia: "LOGISTICA DE APROVISIONAMIENTO",
    Cargo: "SECRETARIA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "ZULFIE",
    Nombre: "ZULUAY FIERRO HERRERA",
    Dependencia: "TESORERIA",
    Cargo: "ASISTENTE DE TESORERIA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "NUBSUA",
    Nombre: "NUBIA SUAREZ DIAZ",
    Dependencia: "CREDITO Y CARTERA",
    Cargo: "AUXILIAR DE CARTERA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "YESMOR",
    Nombre: "JESIKA MORENO FARA",
    Dependencia: "ARCHIVO",
    Cargo: "AUXILIAR DE ARCHIVO",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "YULGOM",
    Nombre: "YULIET PAOLA GOMEZ PESCADOR",
    Dependencia: "LOGISTICA DE APROVISIONAMIENTO",
    Cargo: "AUXILIAR COMPRAS (MATERIAS PRIMAS Y MATERIAL DE EMPAQUE)",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "SANDIA",
    Nombre: "SANDRA MILENA DIAZ ARDILA",
    Dependencia: "ALMACEN",
    Cargo: "AUXILIAR ADMINISTRATIVO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "LADCAS",
    Nombre: "LADY YANET CASTANO RESTREPO",
    Dependencia: "LOGISTICA PEREIRA",
    Cargo: "SECRETARIA REGIONAL",
    Sede: "REGIONAL EJE CAFETERO",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "RUBSIM",
    Nombre: "RUBEN DARIO SIMBAQUEVA ROJAS",
    Dependencia: "SISTEMAS",
    Cargo: "COORDINADOR DE PROYECTOS",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "ANAGAR",
    Nombre: "ANA ISABEL GARCIA",
    Dependencia: "LOGISTICA CALI",
    Cargo: "SECRETARIA REGIONAL",
    Sede: "REGIONAL OCCIDENTE",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "JOSGAR",
    Nombre: "JOSE FLAMINIO  GARCIA  SALDANA",
    Dependencia: "CONTABILIDAD",
    Cargo: "ANALISTA DE CONTABILIDAD",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "ALEVIA",
    Nombre: "ALEJANDRO VIAFARA GOMEZ",
    Dependencia: "CONTABILIDAD",
    Cargo: "DIRECTOR DE CONTABILIDAD",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "LUIPEN",
    Nombre: "LUIS ALBERTO PENA MARIN",
    Dependencia: "TESORERIA",
    Cargo: "JEFE DE TESORERIA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "IVEMAR",
    Nombre: "IVETH MARIA MARTINEZ TAPIAS",
    Dependencia: "LOGISTICA BARRANQUILLA",
    Cargo: "SECRETARIA REGIONAL",
    Sede: "REGIONAL ATLANTICO",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "LUZRAM",
    Nombre: "LUZ INGRID RAMIREZ GONZALEZ",
    Dependencia: "DIRECCION ADMINISTRATIVA",
    Cargo: "RECEPCIONISTA INTERNA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "WILGRA",
    Nombre: "WILLIAM MAURICIO GRANADOS MELO",
    Dependencia: "LOGISTICA DE APROVISIONAMIENTO",
    Cargo: "ANALISTA DE COMPRAS",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "TERTOR",
    Nombre: "TERESA TORRES SARMIENTO",
    Dependencia: "PRODUCCION",
    Cargo: "COORDINADOR DE PRODUCCION",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "JOHROM",
    Nombre: "JOHN ALVARO ROMERO CAMARGO",
    Dependencia: "SSTA",
    Cargo: "JEFE DE SSMA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "JULSOL",
    Nombre: "JULIO ANDRES SOLANO SANCHEZ",
    Dependencia: "CONTROL INTERNO",
    Cargo: "ASISTENTE DE CONTROL INTERNO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "SERMES",
    Nombre: "SERGIO ALEJANDRO MESA",
    Dependencia: "SISTEMAS",
    Cargo: "AUXILIAR",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "JAVISA",
    Nombre: "JAVIER ISAZA RAMOS",
    Dependencia: "SISTEMAS",
    Cargo: "DIRECTOR DE SISTEMAS",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "YURURR",
    Nombre: "YURANI URREGO AMARILES",
    Dependencia: "ARCHIVO",
    Cargo: "AUXILIAR DE ARCHIVO",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "HILCAN",
    Nombre: "HILDA LEONOR CANAS QUICENO",
    Dependencia: "LOGISTICA MEDELLIN",
    Cargo: "SECRETARIA REGIONAL",
    Sede: "REGIONAL ANTIOQUIA",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "LILCAR",
    Nombre: "LILIANA CARDENAS",
    Dependencia: "DISTRIBUCION BOGOTA",
    Cargo: "JEFE DE BODEGA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "MAURAM",
    Nombre: "MAURICIO ANTONIO RAMOS",
    Dependencia: "MANTENIMIENTO",
    Cargo: "JEFE DE MANTENIMIENTO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "CARCIF",
    Nombre: "CARMEN ELENA CIFUENTES",
    Dependencia: "DISTRIBUCION BOGOTA",
    Cargo: "AUXILIAR ADMINISTRATIVO",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "HECPEN",
    Nombre: "HECTOR AUGUSTO PENA TOVAR",
    Dependencia: "SISTEMAS",
    Cargo: "ASISTENTE DE SISTEMAS",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "JUACHI",
    Nombre: "JUAN MANUEL CHISCO PINILLA",
    Dependencia: "DIRECCION ADMINISTRATIVA",
    Cargo: "DIRECTOR ADMINISTRATIVO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "ORLRAM",
    Nombre: "ORLIRIAN RAMOS RAMIREZ",
    Dependencia: "DIRECCION ADMINISTRATIVA",
    Cargo: "SECRETARIA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "MARLOA",
    Nombre: "MARCO ALFREDO LOAIZA MILLAN",
    Dependencia: "GERENCIA DE PLANTA",
    Cargo: "GERENTE DE PLANTA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "MARGAL",
    Nombre: "MARIBEL GALEANO ARDILA",
    Dependencia: "NOMINA",
    Cargo: "AUXILIAR DE NOMINA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "JAILAC",
    Nombre: "JAIRO ENRIQUE LACHE JIMENEZ",
    Dependencia: "CONTROL DE CALIDAD",
    Cargo: "AUXILIAR DE CONTROL DE CALIDAD",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "DIAGAR",
    Nombre: "DIANA GARCIA",
    Dependencia: "LOGISTICA BUCARAMANGA",
    Cargo: "SECRETARIA REGIONAL",
    Sede: "REGIONAL SANTANDER",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "YESRUI",
    Nombre: "YESENIA RUIZ MEDINA",
    Dependencia: "LOGISTICA BUCARAMANGA",
    Cargo: "SECRETARIA REGIONAL",
    Sede: "REGIONAL SANTANDER",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "CESGON",
    Nombre: "CESAR RAUL GONZALEZ JUAJIBIOY",
    Dependencia: "NOMINA",
    Cargo: "AUXILIAR DE NOMINA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "FRAORT",
    Nombre: "FRANCY ELENA ORTIZ MEDINA",
    Dependencia: "CONTROL INTERNO",
    Cargo: "ANALISTA DE CONTROL INTERNO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "AMABEL",
    Nombre: "AMANDA PATRICIA BELTRAN SUAREZ",
    Dependencia: "DIRECCION ADMINISTRATIVA",
    Cargo: "COORDINADOR DE SERVICIOS ADMINISTRATIVOS",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "OLGCAS",
    Nombre: "OLGA LUC? CASILIMAS",
    Dependencia: "DIRECCION DE CATEGORIA",
    Cargo: "COORDINADOR",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "LAUOSS",
    Nombre: "LAURA MANUELA OSSA",
    Dependencia: "LOGISTICA PEREIRA",
    Cargo: "SECRETARIA REGIONAL",
    Sede: "REGIONAL EJE CAFETERO",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "ASEGURAMIENTO",
    Nombre: "ASEGURAMIENTO Y CALIDAD",
    Dependencia: "DIRECCION TECNICA",
    Cargo: "ANALISTA DE CALIDAD",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "DUNMAR",
    Nombre: "DUNIA MARTINEZ DE SABOGAL",
    Dependencia: "DIRECCION TECNICA",
    Cargo: "DIRECTOR TECNICO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "MAUVAN",
    Nombre: "MAURICIO VANEGAS MERINO",
    Dependencia: "GERENCIA GENERAL",
    Cargo: "GERENTE GENERAL",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "LEOPOR",
    Nombre: "RAUL LEONARDO PORRAS",
    Dependencia: "LOGISTICA DE APROVISIONAMIENTO",
    Cargo: "JEFE DE APROVISIONAMIENTO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "FABSAN",
    Nombre: "FABIAN SANCHEZ MARTINEZ",
    Dependencia: "NOMINA",
    Cargo: "AUXILIAR DE NOMINA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "MARURR",
    Nombre: "MARTHA CECILIA URREGO JIMENEZ",
    Dependencia: "LOGISTICA MEDELLIN",
    Cargo: "SECRETARIA REGIONAL",
    Sede: "REGIONAL ANTIOQUIA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "JAVBEL",
    Nombre: "JAVIER BELTRAN HURTADO",
    Dependencia: "NOMINA",
    Cargo: "COORDINADOR DE NOMINA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "RUTMOR",
    Nombre: "RUTH JENNY MORENO VILLARRAGA",
    Dependencia: "NOMINA",
    Cargo: "ASISTENTE DE NOMINA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "MARMED",
    Nombre: "MARCELA MEDINA ORTEGA",
    Dependencia: "GERENCIA NACIONAL DE VENTAS",
    Cargo: "SECRETARIA GERENCIA NACIONAL DE VENTAS",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "TESORERIA",
    Nombre: "TESORERIA",
    Dependencia: "TESORERIA",
    Cargo: "ASISTENTE DE TESORERIA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "MARFON",
    Nombre: "MARIA CRISTINA FONTECHA",
    Dependencia: "NOMINA",
    Cargo: "AUXILIAR DE NOMINA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "ORBHEN",
    Nombre: "ORBEISON HENAO OQUENDO",
    Dependencia: "GERENCIA NACIONAL DE VENTAS",
    Cargo: "GEOREFERENCIADOR",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "OSCVAL",
    Nombre: "OSCAR ANDRES VALDERRAMA",
    Dependencia: "PRODUCCION",
    Cargo: "SUPERVISOR DE PRODUCCION",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "RAMLAS",
    Nombre: "RAMON ENRIQUE LASPRIELLA",
    Dependencia: "GERENCIA NACIONAL DE VENTAS",
    Cargo: "GERENTE NACIONAL DE VENTAS",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "YENCOR",
    Nombre: "YENNY PAOLA CORTES PINZON",
    Dependencia: "DIRECCION DE CATEGORIA",
    Cargo: "ASISTENTE DE CATEGORIA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "LINSAN",
    Nombre: "LINA MARIA SANCHEZ",
    Dependencia: "DIRECCION DE CATEGORIA",
    Cargo: "COORDINADOR",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "CARROM",
    Nombre: "CAROLINA ROMERO CAICEDO",
    Dependencia: "DIRECCION DE CATEGORIA",
    Cargo: "DIRECTOR DE CATEGORIA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "GILLOR",
    Nombre: "GILBERTO LORDUY MORENO",
    Dependencia: "TRADE MARKETING",
    Cargo: "JEFE DE TRADE MARKETING",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "NANSUA",
    Nombre: "NANCY SUA",
    Dependencia: "GERENCIA DE MERCADEO",
    Cargo: "SECRETARIA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "DIAQUE",
    Nombre: "DIANA PATRICIA QUEVEDO ROJAS",
    Dependencia: "SSTA",
    Cargo: "COORD. DE GESTION AMBIENTAL",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "DORCAM",
    Nombre: "DORA EUGENIA CAMARGO",
    Dependencia: "GERENCIA NACIONAL DE VENTAS",
    Cargo: "COORDINADOR CANAL MERKA Y GANA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "LEIROA",
    Nombre: "LEIDY YOHANNA ROA",
    Dependencia: "TRADE MARKETING",
    Cargo: "ANALISTA DE TRADE MARKETING",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "MARCOR",
    Nombre: "MARICELA CORREDOR",
    Dependencia: "TRADE MARKETING",
    Cargo: "COORDINADOR REGIONAL DE TRADE MARKETING",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "LUZMAR",
    Nombre: "LUZ DARY MARTINEZ",
    Dependencia: "GERENCIA DE PLANTA",
    Cargo: "SECRETARIA GERENCIA DE PLANTA",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "NATTOB",
    Nombre: "NATALIA TOBON PENA",
    Dependencia: "DIRECCION DE CATEGORIA",
    Cargo: "DIRECTOR DE CATEGORIA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "PAUTRI",
    Nombre: "PAULA TRIANA SAENZ",
    Dependencia: "CREDITO Y CARTERA",
    Cargo: "AUXILIAR DE CARTERA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "EDGCUE",
    Nombre: "EDGAR ANDRES CUERVO ORTEGA",
    Dependencia: "ALMACEN",
    Cargo: "AUXILIAR DE ALMACEN",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "GUSGAI",
    Nombre: "GUSTAVO ADOLFO GAITAN HERRERA",
    Dependencia: "DIRECCION ADMINISTRATIVA",
    Cargo: "JEFE DE SEGURIDAD",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "DANCAS",
    Nombre: "DANIEL FERNANDO CASTRO PARRA",
    Dependencia: "PRODUCCION",
    Cargo: "JEFE DE PRODUCCION",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "REVFIS",
    Nombre: "REVISORIA FISCAL",
    Dependencia: "CONTABILIDAD",
    Cargo: "AUXILIAR",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "JUAJIM",
    Nombre: "JUAN CARLOS JIMENEZ",
    Dependencia: "DISTRIBUCION BOGOTA",
    Cargo: "AUXILIAR ADMINISTRATIVO",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "JANVAL",
    Nombre: "JANETH VALENCIA OTERO",
    Dependencia: "TRADE MARKETING",
    Cargo: "JEFE DE TRADE MARKETING",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "inactivo"
  },
  {
    Login: "GLOOVA",
    Nombre: "GLORIA ALEJANDRA OVALLE",
    Dependencia: "DIRECCION DE CATEGORIA",
    Cargo: "ASISTENTE DE CATEGORIA",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "EDGCAR",
    Nombre: "EDGAR MAURICIO CARDENAS ORTIZ",
    Dependencia: "CONTROL INTERNO",
    Cargo: "JEFE DE CONTROL INTERNO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "MARRUB",
    Nombre: "MARIA ALEJANDRA RUBIO JIMENEZ",
    Dependencia: "GERENCIA DE MERCADEO",
    Cargo: "COORDINADOR DE MARCAS PROPIAS",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "GERROM",
    Nombre: "GERMAN ROMERO",
    Dependencia: "GERENCIA OPERATIVA",
    Cargo: "GERENTE OPERATIVO",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "ROCSEG",
    Nombre: "ROCIO DEL PILAR SEGURA BERNAL",
    Dependencia: "GERENCIA GENERAL",
    Cargo: "SECRETARIA DE GERENCIA GENERAL",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "VICGUT",
    Nombre: "VICTOR MANUEL GUTIERREZ DIAZ",
    Dependencia: "GERENCIA NACIONAL DE VENTAS",
    Cargo: "JEFE NACIONAL DE CADENAS",
    Sede: "BOGOTA CENTRO DE LOGISTICA",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "SST",
    Nombre: "SEGURIDAD Y SALUD EN EL TRABAJO",
    Dependencia: "SSTA",
    Cargo: "AUXILIAR",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "RICLAT",
    Nombre: "RICARDO ANDRES LATINO AORTIZ",
    Dependencia: "PRODUCCION",
    Cargo: "JEFE DE DETERGENTES",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "TANZUN",
    Nombre: "TANIA GINETH ZU?GA CAMARGO",
    Dependencia: "PRODUCCION",
    Cargo: "AUXILIAR DE PRODUCCION DETERGENTES",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "LUIRIC",
    Nombre: "LUISA FERNANDA RICO REYES",
    Dependencia: "PRODUCCION",
    Cargo: "ANALISTA DE PRODUCCION",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  },
  {
    Login: "YENMAR",
    Nombre: "YENNY MARCELA MARIN NARANJO",
    Dependencia: "SSTA",
    Cargo: "AUXILIAR EN SALUD OCUPACIONAL",
    Sede: "BOGOTA PRINCIPAL",
    Email: "",
    Estado: "activo"
  }
];

class TableContentUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalviewuserstate: false,
      modaledituserstate: false,
      modaldeluserstate: false,
      modalchangepassword: false
    };
  }

  accionesUsuario(cell, row) {
    return (
      <div
        className="table-menu"
        style={{ textAlign: "center", padding: "0", marginRight: "40px" }}
      >
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalView();
          }}
        >
          {" "}
          <i className="fa fa-eye" />{" "}
        </button>
        &nbsp;
        <button
          className="btn btn-secondary btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalEdit();
          }}
        >
          <i className="fa fa-pencil" />
        </button>
        &nbsp;
        <button
          className="btn btn-danger btn-sm"
          data-trigger="hover"
          onClick={() => {
            this.openModalDelete();
          }}
        >
          {" "}
          <i className="fa fa-trash" />{" "}
        </button>
        &nbsp;
        <button
          className="btn btn-warning btn-sm"
          data-hover="hover"
          onClick={() => {
            this.openModalPassword();
          }}
        >
          {" "}
          <i className="fa fa-lock" />
        </button>
      </div>
    );
  }

  UsuarioStatus(cell, row) {
    let status;
    if (row.Estado === "activo") {
      status = <p className="text-success">ACTIVO</p>;
    } else if (row.Estado !== "activo") {
      status = <p className="text-danger">INACTIVO</p>;
    }
    return status;
  }

  openModalView() {
    this.refs.child.toggle();
  }

  openModalDelete() {
    this.refs.child2.toggle();
  }

  openModalEdit() {
    this.refs.child3.toggle();
  }

  openModalPassword() {
    this.refs.child4.toggle();
  }

  render() {
    function indexN(cell, row, enumObject, index) {
      return <div>{index}</div>;
    }
    return (
      <div className="animated fadeIn">
        <Col sm="12">
          <BootstrapTable
            pagination
            search
            searchPlaceholder="Buscar"
            data={data}
            exportCSV
            hover
            striped
            bordered={false}
            className="tableUsu texto-Usu"
            // headerStyle={{ height: "px" }}
          >
            <TableHeaderColumn
              dataField={"id"}
              isKey
              width={"20"}
              dataAlign="center"
              dataFormat={indexN}
            >
              #
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField={"Nombre"}
              dataAlign="center"
              width={"120"}
            >
              Nombre
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"Login"} dataAlign="center" width={"130"}>
              Usuario
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"Dependencia"} dataAlign="center" width={"190"}>
              {" "}
              Dependencia{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField={"Cargo"} dataAlign="center" width={"150"}>
              Cargo
            </TableHeaderColumn>
            <TableHeaderColumn
            width={"70"}
              dataField={"Estado"}
              dataAlign="center"
              dataFormat={(cell, row) => this.UsuarioStatus(cell, row)}
            >
              {" "}
              Estado{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
            width={"190"}
              export={false}
              dataAlign="center"
              dataFormat={(cell, row) => this.accionesUsuario(cell, row)}
              style={{ border: "none" }}
            >
              Acciones
            </TableHeaderColumn>
          </BootstrapTable>
        </Col>

        <ModalView modalview={this.state.modalviewuserstate} ref="child" />
        <ModalDelete modaldel={this.state.modaldeluserstate} ref="child2" />
        <ModalUpdate modaledit={this.state.modaledituserstate} ref="child3" />
        <ModalChangePassword
          modalpassword={this.state.modalchangepassword}
          ref="child4"
        />
      </div>
    );
  }
}

TableContentUser.propTypes = {};

export default TableContentUser;
