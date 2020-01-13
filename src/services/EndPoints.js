import config from "./configRequest/config";
//---------------------------------------------CONGLOMERADO--------------------------------------------------//

/* GET */
export const CONGLOMERATES = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates`;

/* POST / GET / DELETE */
export const CONGLOMERATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates`;

/* GET */
export const CONGLOMERATES_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates/active`;

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

/* GET */
export const COMPANYS_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/companies/active`;

/* GET param => username  */
export const COMPANY_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/companies/export/data`;

/* GET param => idConglomerate */
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
export const DEPENDENCE_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/dependencies/export/data`;

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

/* GET params => id, usernema */
export const TYPESHIPMENTARRIVAL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/shipments/arrivals`;

/* GET */
export const TYPESHIPMENTSARRIVALS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/shipments/arrivals/`;

/* GET */
export const TYPESHIPMENTARRIVAL_STATUS_ACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/shipments/arrivals/active`;

/* GET */
export const TYPESHIPMENTARRIVAL_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/shipments/arrivals/inactive`;

/* POST */
export const TYPESHIPMENTARRIVAL_POST = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/shipments/arrivals`;

/* PUT */
export const TYPESHIPMENTARRIVAL_UPDATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/shipments/arrivals`;

/* DELETE params identification, username */
export const TYPESHIPMENTARRIVAL_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/shipments/arrivals/`;

/* GET */
export const TYPESHIPMENTARRIVAL_PAGINATION = () => {
  // const page = 0; params page
  // const size = 2; params size
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/shipments/arrivals/pagination`;
};

/* GET params username */
export const TYPESHIPMENTARRIVAL_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/shipments/arrivals/export/data`;

//---------------------------------------------TIPO TRÁMITE--------------------------------------------------//

/* GET */
export const TYPEPROCEDURES = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures`;

/* GET  params => idTypeprodcedure, username*/
export const TYPEPROCEDURE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures/`;

/* GET */
export const TYPEPROCEDURES_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures/active`;

/* GET */
export const TYPEPROCEDURES_STATUS_INAVTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures/inactive`;

/* POST */
export const TYPEPROCEDURE_POST = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures`;

/* PUT */
export const TYPEPROCEDURE_UPDATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures`;

/* DELETE param = idTypeProcedure, username, code */
export const TYPEPROCEDURE_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures/`;

/* GET */
export const TYPEPROCEDURES_PAGINATION = () => {
  //const page = 0; param page
  //const size = 1; param size
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures/pagination`;
};

/* GET params username */
export const TYPEPROCEDURES_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures/export/data`;

/* GET */
export const TYPEPROCEDURES_EXPORT_USERS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/procedures/export`;

//---------------------------------------------USUARIOS--------------------------------------------------//

/* GET */
export const USERS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users`;

/* GET  params => idUser, username  */
export const USER = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/`;

/* SRC PHOTO USER */
export const USER_PHOTO = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/photo/view/`;

/* GET */
export const USERS_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/active`;

/* GET */
export const USERS_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/inactive`;

/* GET params => idCharge */
export const USERS_BY_CHARGE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/charge/`;

/* GET params => idDependence */
export const USERS_BY_DEPENDENCE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/dependence/`;

/* POST */
export const USER_POST = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users`;

/* PUT */
export const USER_PUT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users`;

/* DELETE params => identification, username, idUser */
export const USER_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/`;

/* POST */
export const CHANGE_PASSWORD = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/change/password`;

/* PUT */
export const UPDATE_PROFILE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/update/profile`;

/* PUT */
export const UPDATE_INTENT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/update/intent/04f5da38-b6b5-409d-9d81-96fe8d13caa4`;

/* POST */
export const UPDATE_PROFILE_PASSWORD = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/update/profile/password`;

/* GET */
export const USERS_PAGINATION = () => {
  //const page = 0; params page
  //const size = 1; param size
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/pagination`;
};

/* GET  param => username  */
export const USERS_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/export/data`;

/* GET  params => idRol, username  VERIFICAR LA URL PORQUE TIENES EL ID QUEMADO*/
export const USERS_EXPORT_ROLES = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/export/7ec027cc-d915-4b2f-a450-73d16b505337/roles`;

/* GET  */
export const SEARCH_BY_USERNAME = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/search/username`;

/* POST */
export const PASSWORD_RESET_REQUEST = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/user/password-reset-request`;

/* POST */
export const PASSWORD_RESET = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/user/password-reset`;

//---------------------------------------------TIPO DE TERCERO--------------------------------------------------//

/* GET */
export const TYPETHIRDPARTYS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties`;

/* GET params => username  */
export const TYPETHIRDPARTY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties/`;

/* GET */
export const TYPETHIRDPARTYS_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties/active`;

/* GET */
export const TYPETHIRDPARTYS_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties/inactive`;

/* POST */
export const TYPETHIRDPARTY_POST = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties`;

/* PUT */
export const TYPETHIRDPARTY_UPDATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties`;

/* DELETE  params => id, code, username  */
export const TYPETHIRDPARTY_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties/`;

/* GET params => page, size*/
export const TYPETHIRDPARTYS_PAGINATION = () => {
  //const page = 0; param page
  //const size = 1; param size
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties/pagination`;
};

/* GET param => username  */
export const TYPETHIRDPARTYS_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties/export/data`;

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
export const ROLES_STATUS_ACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles/active`;

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
export const GROUPUSERS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/group/users`;

/* GET / DELETE  params => id */
export const GROUPUSER = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/group/users/`;

/* GET */
export const GROUPUSERS_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/group/users/active`;

export const GROUPUSERS_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/group/users/inactive`;

/* GET */
export const GROUPUSERS_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/group/users/export/data`;

/* GET params => id grupo*/
export const GROUPUSERS_EXPORT_USERS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/group/users/export/`;

/* GET */
export const GROUPUSERS_PAGINATION = () => {
  //const page = 0; params page
  //const size = 1; params size
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/group/users/pagination`;
};

//---------------------------------------------TERCEROS--------------------------------------------------//

/* GET / POST / PUT */
export const THIRDPARTYS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/third/parties`;

/* GET / DELETE */
export const THIRDPARTY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/third/parties/`;

/* GET */
export const THIRDPARTYS_STATUS =
  "http://192.168.10.180:7000/api/sgdea/thirdparty/status/1";

/* GET */
export const THIRDPARTYS_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/third/parties/export/data`;

/* GET */
export const THIRDPARTY_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/thirdparty/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------TIPO DOCUMENTAL RADICACIÓN--------------------------------------------------//

/* GET */
export const TYPEDOCUMENTARY_ALL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries`;

/* GET params => ID, username */
export const TYPEPROCEDURE_SHOW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries/`;

/* POST  */
export const TYPEDOCUMENTARY_POST = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries`;

/* PUT */
export const TYPEDOCUMENTARY_PUT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries`;

/* DELETE  params => id */
export const TYPEDOCUMENTARY_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries/`;

/* GET */
export const TYPEDOCUMENTARYS_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries/active`;

/* GET */
export const TYPEDOCUMENTARYS_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries/inactive`;

/* GET param => username */
export const TYPEDOCUMENTARYS_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries/export/data`;

/* GET params id  */
export const TYPEDOCUMENTARYS_EXPORT_USERS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries/export/`;

/* GET */
export const TYPEDOCUMENTARYS_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/typedocumentary/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------PAÍS--------------------------------------------------//

/* GET / POST / PUT */
export const COUNTRIES = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/countries`;

/* GET / DELETE */
export const COUNTRY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/countries/`;

/* GET */
export const CONTRIES_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/countries/active`;

/* GET */
export const COUNTRIES_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/countries/export/data`;

/* GET */
export const COUNTRIES_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/countries/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------DEPARTAMENTO--------------------------------------------------//

/* GET / POST / PUT */
export const DEPARTMENTS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/departments`;

/* GET / DELETE */
export const DEPARTMENT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/departments/`;

/* GET */
export const DEPARTMENTS_BY_COUNTRY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/departments/country/`;

/* GET */
export const DEPARTMENTS_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/departments/active`;

/* GET */
export const DEPARTMENTS_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/departments/export/data`;

/* GET */
export const DEPARTMENTS_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `${config.IP}:${config.PORT}/api/sgdea/department/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------CIUDAD--------------------------------------------------//

/* GET / POST / PUT */
export const CITYS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/cities`;

/* GET / DELETE */
export const CITY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/cities/`;

/* GET */
export const CITIES_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/cities/active`;

/* GET */
export const CITIES_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/cities/export/data`;

export const CITIES_BY_DEPARTMENT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/cities/department/`;

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
