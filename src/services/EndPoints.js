import config from "./configRequest/config";
//---------------------------------------------CONGLOMERADO--------------------------------------------------//

/* GET */
export const CONGLOMERATES = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates`;

/* POST / GET / DELETE */
export const CONGLOMERATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates`;

/* GET */
export const CONGLOMERATES_STATUS = `${config.IP}:${config}/api/sgdea/conglomerate/active`;

export const CONGLOMERATES_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates/inactive`;

/* GET param username */
export const CONGLOMERATE_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates/export/data`;

/* GET */
export const CONGLOMERATE_PAGINATION = () => {
  //const page = 0; => param
  //const size = 3; => param
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates/pagination`;
};

//---------------------------------------------EMPRESA--------------------------------------------------//

/* GET / POST / PUT */
export const COMPANYS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/companies`;

/* GET / DELETE */
export const COMPANY =
  "http://192.168.10.180:7000/api/sgdea/company/679a9e1f-29a6-4c7a-b90b-da4d774ebf1f/ccuartas";

/* GET */
export const COMPANYS_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/companies/active`;

/* GET param => username  */
export const COMPANY_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/companies/export/data`;

/* GET param => idCompany */
export const COMPANY_BY_CONGLOMERATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/companies/conglomerate/`;

/* GET */
export const COMPANY_PAGINATION = () => {
  //const page = 0; => param page
  //const size = 1; => param size
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/companies/pagination`;
};

/* GET */
export const COMPANYS_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/companies/inactive`;

//---------------------------------------------SEDES--------------------------------------------------//

/* GET / POST / PUT  */
export const HEADQUARTERS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/headquarters`;

/* GET / DELETE param => idHeadquarter, username */
export const HEADQUARTER = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/headquarters/`;

/* GET */
export const HEADQUARTERS_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/headquarters/active`;

/* GET */
export const HEADQUARTERS_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/headquarters/inactive`;

/* GET param => username */
export const HEADQUARTER_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/headquarters/export/data`;

/* GET param idCharge */
export const HEADQUARTER_BY_CHARGE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/headquarters/charge/`;

/* GET param idCity */
export const HEADQUARTER_BY_CITY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/headquarters/city/`;

/* GET param idCompany */
export const HEADQUARTER_BY_COMPANY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/headquarters/company/`;

/* GET */
export const HEADQUARTER_PAGINATION = () => {
  //const page = 0; => param page
  //const size = 1; = > param size
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/headquarters/pagination`;
};

//---------------------------------------------DEPENDENCIA--------------------------------------------------//

/* GET / POST / PUT */
export const DEPENDENCIES = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/dependencies`;

/* GET / DELETE param => idDependencia */
export const DEPENDENCE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/dependencies/`;

/* GET */
export const DEPENDENCIES_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/dependencies/active`;

/*GET */
export const DEPENDENCIES_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/dependencies/inactive`;

/* GET  param => idHeadquarter */
export const DEPENDENCIES_BY_HEADQUARTER = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/dependencies/headquarter/`;

/* GET param => idCharge */
export const DEPENDENCIES_BY_CHARGE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/dependencies/charge/`;

/* GET  */
export const DEPENDENCE_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/dependence/export/ccuartas";

/* GET */
export const DEPENDENCE_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/dependence/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------CARGO--------------------------------------------------//

/* GET / POST / PUT */
export const CHARGES = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/charges`;

/* GET / DELETE */
export const CHARGE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/charges/`;

/* GET */
export const CHARGES_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/charges/active`;

/* GET */
export const CHARGE_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/charges/export/data`;

/* GET */
export const CHARGE_PAGINATION = () => {
  //const page = 0; // => param que tienen que ir en la url
  //const size = 2; // => param que tiene que ir en la url
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/charges/pagination`;
};

//---------------------------------------------MENSAJERO--------------------------------------------------//

/* GET / POST / PUT */
export const MESSENGERS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/messengers`;

/* GET / DELETE */

export const MESSENGER = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/messengers`;

/* GET */
export const MESSENGERS_STATUS_ACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/messengers/active`;

/* GET */

export const MESSENGERS_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/messengers/inactive`;

/* GET  params => username  */
export const MESSENGER_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/messengers/export/data`;

/* GET params => {page, size} */
export const MESSENGER_PAGINATION = () => {
  // const page = 0;
  // const size = 2;
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/messengers/pagination`;
};

//---------------------------------------------TIPO DE ENVÍO / LLEGADA--------------------------------------------------//

/* GET / POST / PUT */
export const TYPESHIPMENTARRIVAL =
  "http://192.168.10.180:7000/api/sgdea/typeshipmentarrival";

/* GET / DELETE */
export const TYPESHIPMENTSARRIVALS =
  "http://192.168.10.180:7000/api/sgdea/typeshipmentarrival/81339c73-fed7-4847-9215-8c6ebb67e36b/ccuartas";

/* GET */
export const TYPESHIPMENTARRIVAL_STATUS =
  "http://192.168.10.180:7000/api/sgdea/typeshipmentarrival/status/1";

/* GET */
export const TYPESHIPMENTARRIVAL_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/typeshipmentarrival/export/ccuartas";

/* GET */
export const TYPESHIPMENTARRIVAL_PAGINATION = () => {
  const page = 0;
  const size = 2;
  return `http://192.168.10.180:7000/api/sgdea/typeshipmentarrival/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------TIPO TRÁMITE--------------------------------------------------//

/* GET / POST / PUT */
export const TYPEPROCEDURES =
  "http://192.168.10.180:7000/api/sgdea/typeprocedure";

/* GET / DELETE */
export const TYPEPROCEDURE =
  "http://192.168.10.180:7000/api/sgdea/typeprocedure/2ca8b720-764d-4219-ae96-b530343562db/ccuartas";

/* GET */
export const TYPEPROCEDURES_STATUS =
  "http://192.168.10.180:7000/api/sgdea/typeprocedure/status/1";

/* GET */
export const TYPEPROCEDURES_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/typeprocedure/export/ccuartas";

/* GET */
export const TYPEPROCEDURES_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/typeprocedure/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------USUARIOS--------------------------------------------------//

/* GET / POST / PUT */
export const USERS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users`;

/* GET / DELETE */
export const USER =
  "http://192.168.10.180:7000/api/sgdea/user/689bfff8-4fa1-490f-96e0-c5092c7a8aad/ccuartas";

/* GET */
export const USERS_STATUS = "http://192.168.10.180:7000/api/sgdea/user/active";

/* GET */
export const USERS_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/user/export/ccuartas";

/* GET */
export const USERS_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/user/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------TIPO DE TERCERO--------------------------------------------------//

/* GET / POST / PUT */
export const TYPETHIRDPARTYS =
  "http://192.168.10.180:7000/api/sgdea/typethirdparty";

/* GET / DELETE */
export const TYPETHIRDPARTY =
  "http://192.168.10.180:7000/api/sgdea/typethirdparty/66b23763-3979-443c-967c-7453b6b3e5c2/ccuartas";

/* GET */
export const TYPETHIRDPARTYS_STATUS =
  "http://192.168.10.180:7000/api/sgdea/typethirdparty/active";

/* GET */
export const TYPETHIRDPARTYS_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/typethirdparty/export/ccuartas";

/* GET */
export const TYPETHIRDPARTYS_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/typethirdparty/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------ROLES--------------------------------------------------//

/* GET / POST / PUT */
export const ROLES = "http://192.168.10.180:7000/api/sgdea/role";

/* GET / DELETE */
export const ROLE =
  "http://192.168.10.180:7000/api/sgdea/role/bc01f1eb-dd48-4911-99d5-7af6c95595cb/ccuartas";

/* GET */
export const ROLES_STATUS =
  "http://192.168.10.180:7000/api/sgdea/role/status/1";

/* GET */
export const ROLES_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/role/export/ccuartas";

/* GET */
export const ROLES_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/role/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------GRUPO DE USUARIOS--------------------------------------------------//

/* GET / POST / PUT */
export const GROUPUSERS = "http://192.168.10.180:7000/api/sgdea/groupuser";

/* GET / DELETE */
export const GROUPUSER =
  "http://192.168.10.180:7000/api/sgdea/groupuser/171331b2-97b2-4523-b93b-092483a567bd/ccuartas";

/* GET */
export const GROUPUSERS_STATUS =
  "http://192.168.10.180:7000/api/sgdea/groupuser/status/1";

/* GET */
export const GROUPUSERS_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/groupuser/export/ccuartas";

/* GET */
export const GROUPUSERS_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/groupuser/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------TERCEROS--------------------------------------------------//

/* GET / POST / PUT */
export const THIRDPARTYS = "http://192.168.10.180:7000/api/sgdea/thirdparty";

/* GET / DELETE */
export const THIRDPARTY =
  "http://192.168.10.180:7000/api/sgdea/thirdparty/50dd5f08-1104-4eac-ba3c-6e77b3b70373/ccuartas";

/* GET */
export const THIRDPARTYS_STATUS =
  "http://192.168.10.180:7000/api/sgdea/thirdparty/status/1";

/* GET */
export const THIRDPARTYS_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/thirdparty/export/ccuartas";

/* GET */
export const THIRDPARTY_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/thirdparty/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------TIPO DOCUMENTAL RADICACIÓN--------------------------------------------------//

/* GET / POST / PUT */
export const TYPEDOCUMENTARYS =
  "http://192.168.10.180:7000/api/sgdea/typedocumentary";

/* GET / DELETE */
export const TYPEDOCUMENTARY =
  "http://192.168.10.180:7000/api/sgdea/typedocumentary/c76861c5-3913-454c-bfcf-6ced7c235cc5/ccuartas";

/* GET */
export const TYPEDOCUMENTARYS_STATUS =
  "http://192.168.10.180:7000/api/sgdea/typedocumentary/status/1";

/* GET */
export const TYPEDOCUMENTARYS_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/typedocumentary/export/ccuartas";

/* GET */
export const TYPEDOCUMENTARYS_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/typedocumentary/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------PAÍS--------------------------------------------------//

/* GET / POST / PUT */
export const COUNTRIES = "http://192.168.10.180:7000/api/sgdea/country";

/* GET / DELETE */
export const CONTRY =
  "http://192.168.10.180:7000/api/sgdea/country/fecd7706-42f2-49a0-88c2-ec5e17fe6479/ccuartas";

/* GET */
export const CONTRIES_STATUS =
  "http://192.168.10.180:7000/api/sgdea/country/active";

/* GET */
export const COUNTRIES_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/country/export/ccuartas";

/* GET */
export const COUNTRIES_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/country/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------DEPARTAMENTO--------------------------------------------------//

/* GET / POST / PUT */
export const DEPARTMENTS = "http://192.168.10.180:7000/api/sgdea/department";

/* GET / DELETE */
export const DEPARTMENT =
  "http://192.168.10.180:7000/api/sgdea/department/af27290a-714e-4857-b157-1779c941e4fc/ccuartas";

/* GET */
export const DEPARTMENTS_STATUS =
  "http://192.168.10.180:7000/api/sgdea/department/active";

/* GET */
export const DEPARTMENTS_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/department/export/ccuartas";

/* GET */
export const DEPARTMENTS_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/department/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------CIUDAD--------------------------------------------------//

/* GET / POST / PUT */
export const CITYS = "http://192.168.10.180:7000/api/sgdea/city";

/* GET / DELETE */
export const CITY =
  "http://192.168.10.180:7000/api/sgdea/city/23ed762d-ae48-44af-a6cc-82b2430fc33b/ccuartas";

/* GET */
export const CITIES_STATUS = "http://192.168.10.180:7000/api/sgdea/city/active";

/* GET */
export const CITIES_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/city/export/ccuartas";

/* GET */
export const CITIES_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/city/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------PLANTILLA DE DATOS--------------------------------------------------//

/* GET / POST / PUT */
export const TEMPLATES = "http://192.168.10.180:7000/api/sgdea/template";

/* GET / DELETE */
export const TEMPLATE =
  "http://192.168.10.180:7000/api/sgdea/template/3df0b744-a7b4-416b-bbeb-f4d8d5ae32e1/ccuartas";

/* GET */
export const TEMPLATES_STATUS =
  "http://192.168.10.180:7000/api/sgdea/template/status/1";

/* GET */
export const TEMPLATES_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/template/export/ccuartas";

/* GET */
export const TEMPLATES_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/template/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------MÓDULOS--------------------------------------------------//

/* GET */
export const MODULES = "http://192.168.10.180:7000/api/sgdea/module";

/* GET */
export const MODULE = "http://192.168.10.180:7000/api/sgdea/module/1";

/* GET */
export const MODULES_STATUS =
  "http://192.168.10.180:7000/api/sgdea/module/status/1";

//---------------------------------------------ENTIDADES--------------------------------------------------//

/* GET */
export const ENTITIES = "http://192.168.10.180:7000/api/sgdea/entity";

/* GET */
export const ENTITY = "http://192.168.10.180:7000/api/sgdea/entity/1";

/* GET */
export const ENTITY_MODULE_STATUS =
  "http://192.168.10.180:7000/api/sgdea/entity/module/1/status/1";

//---------------------------------------------ACCIONES--------------------------------------------------//

/* GET */
export const ACTIONS = "http://192.168.10.180:7000/api/sgdea/action";

/* GET */
export const ACTION = "http://192.168.10.180:7000/api/sgdea/action/1";

/* GET */
export const ACTION_ENTITY_STATUS =
  "http://192.168.10.180:7000/api/sgdea/action/entity/1/status/1";
