import config from "./configRequest/config";
//---------------------------------------------GENERAL_PARAMETERS--------------------------------------------------//

/* GET */
export const PARAMETERS_ALL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/general/parameters`;

/* GET */
export const PARAMETERS_FIND_BY_ID = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/general/parameters/`;

/* GET INPUTS idParameter */
export const PARAMETERS_INPUTS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/general/parameters/input/`;

/* GET params => idGroup */
export const PARAMETERS_FIND_BY_PARAMETER_GROUP_ID = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/general/parameters/parameter/group/`;

/* PUT */
export const PARAMTERS_UPDATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/general/parameters`;

//---------------------------------------------PARAMETERS_GROUP--------------------------------------------------//

/* GET params idModule */
export const PARAMETER_GROUP_FIND_BY_MODULE_ID = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/parameter/group/module`;

//---------------------------------------------AUDITORIA--------------------------------------------------//

/* GET params id */
export const AUDIT_SHOW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/audits/`;

/* GET params page and size */
export const AUDIT_ALL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/audits/pagination`;

/* POST */
export const AUDIT_CONSULT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/audits/consult`;

//---------------------------------------------MODULO--------------------------------------------------//

/* GET */
export const MODULE_ALL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/modules`;

/* GET */
export const MODULE_ALL_ACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/modules/active`;

/* GET params username idModule */
export const MODULE_SHOW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/modules/`;

/* GET */
export const MODULE_ENTITIES_BY_MODULE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/modules/active`;

//---------------------------------------------ENTIDADES--------------------------------------------------//

/* GET */
export const ENTITIES_ALL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/entities`;

/* GET username id  */
export const ENTITIES_SHOW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/entities/`;

/* GET idModule */
export const ENTITIES_BY_MODULE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/entities/module/`;

//---------------------------------------------RESTABLECER CONTRASEÑA--------------------------------------------------//
/* POST EMAIL */
export const PASSWORD_RETRIEVAL_REQUEST = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/password-reset-request`;
/* POST NEW PASSWORD */
export const NEW_PASSWORD = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/password-reset`;
//---------------------------------------------ACCIONES--------------------------------------------------//

/* GET */
export const ACTIONS_ALL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/actions`;

/* GET username idAction */
export const ACTIONS_SHOW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/actions/`;

/* GET  idEntitie*/
export const ACTIONS_BY_ENTITY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/actions/entity/`;

//---------------------------------------------CONGLOMERADO--------------------------------------------------//

/* GET */
export const CONGLOMERATES = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates`;

/* POST / GET / DELETE */
export const CONGLOMERATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates`;

/* GET */
export const CONGLOMERATES_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates/active`;

export const CONGLOMERATES_STATUS_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/conglomerates/inactive`;

/* POST IMPORT */
export const CONGLOMERATE_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/conglomerates/`;

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

/* POST IMPORT */
export const COMPANY_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/companies/`;

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

/* POST IMPORT */
export const HEADQUARTER_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/headquarters/`;

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
/* POST IMPORT */
export const DEPENDENCE_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/dependencies/`;
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

/* POST IMPORT */
export const CHARGES_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/charges/`;
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

/* POST IMPORT */
export const MESSENGER_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/messengers/`;

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

/* POST IMPORT */
export const TYPESHIPMENTARRIVAL_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/types/shipment/arrival/`;
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

/* SRC PHOTO USER idUser */
export const USER_PHOTO = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/photo/view/base64/`;

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

/* POST */
export const USER_UPLOAD_PHOTO = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/users/photo/`;

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

/* POST IMPORT */
export const USERS_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/users/`;
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

/* POST IMPORT */
export const TYPETHIRDPARTYS_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/types/third/party/`;

/* GET params => page, size*/
export const TYPETHIRDPARTYS_PAGINATION = () => {
  //const page = 0; param page
  //const size = 1; param size
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties/pagination`;
};

/* GET param => username  */
export const TYPETHIRDPARTYS_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/third/parties/export/data`;

//---------------------------------------------ROLES--------------------------------------------------//

/* GET */
export const ROLES_ALL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles`;

/* GET param => idRol */
export const ROLES_SHOW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles/`;

/* GET */
export const ROLES_ACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles/active`;

/* GET */
export const ROLES_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles/inactive`;

/* POST */
export const ROLES_CREATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles`;

/* PUT */
export const ROLES_UPDATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles`;

/* PUT */
export const ROLES_UPDATE_PERMISSION_BY_ROL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles/permissions`;

/* GET param => idRol */
export const ROLES_PERMISSION_BY_ROL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles/permissions/`;

/* DELETE params => idRol */
export const ROLES_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles/`;

/* GET */
export const ROLES_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles/export/data`;

/* GET params => page , size */
export const ROLES_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/roles/pagination?page=${page}&size=${size}`;
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

/* POST IMPORT */
export const THIRDPARTY_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/third/parties/`;
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
export const TYPEDOCUMENTARY_SHOW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries/`;

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
export const TYPEDOCUMENTARYS_EXPORT_USERS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentaries/export`;

/* GET */
export const TYPEDOCUMENTARYS_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/typedocumentary/pagination?page=${page}&size=${size}`;
};
//---------------------------------------------RADICACIÓN VÍA CORREO ELECTRÓNICO--------------------------------------------------//
/* GET - POST - PUT - DELETE*/
export const EMAIL_FILING = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/email/accounts/filing`;
/* EXPORT */
export const EMAIL_FILING_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/email/accounts/filing/export/data`;

//---------------------------------------------PAÍS--------------------------------------------------//

/* GET / POST / PUT */
export const COUNTRIES = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/countries`;

/* GET / DELETE */
export const COUNTRY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/countries/`;

/* GET */
export const CONTRIES_STATUS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/countries/active`;

/* GET */
export const COUNTRIES_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/countries/export/data`;

/* POST IMPORT */
export const COUNTRIES_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/countries/`;

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

/* POST IMPORT */
export const DEPARTMENTS_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/departments/`;

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

/* POST IMPORT */
export const CITYS_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/cities/`;

/* GET */
export const CITIES_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/city/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------PLANTILLA EMAIL-----------------------------------------------------//

/* GET */
export const TEMPLATES_EMAIL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/email/templates`;
export const TEMPLATE_EMAIL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/email/templates/`;

//---------------------------------------------PLANTILLA DE DATOS--------------------------------------------------//

/* GET */
export const TEMPLATE_ALL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/templates`;

/* GET params => idTemplate */
export const TEMPLATE_SHOW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/templates`;

/* GET */
export const TEMPLATE_ACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/templates/active`;

/* GET */
export const TEMPLATE_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/templates/inactive`;

/* POST */
export const TEMPLATE_CREATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/templates`;

/* PUT */
export const TEMPLATE_UPDATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/templates`;

/* DELETE params => idTemplate */
export const TEMPLATE_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/templates/`;

/* GET params => username */
export const TEMPLATE_EXPORT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/templates/export/data`;

/* GET */
export const TEMPLATES_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `${config.IP}:${config.PORT}/api/sgdea/service/configuration/templates/pagination?page=${page}&size=${size}`;
};

/* POST */
export const TEMPLATE_IMPORT = `${config.IP}:${config.PORT}/api/sgdea/service/import/templates/`;
//---------------------------------------------PERMISOS-----------------------------------------------------//

/* GET params => idEntidad */
export const PERMISSIONS_BY_PAGE_ENTITY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/permissions/page/entity/`;

/* GET params => username */
export const PERMISSIONS_BY_USER = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/permissions/user`;

//--------------------------------------------- PETICIONES VÍA EMAIL -----------------------------------------------------//

/* GET */
export const REQUEST_EMAIL = `${config.IP}:${config.PORT}/api/sgdea/service/filing/emails/email/account/filing/`;

/* GET */
export const EMAIL_ACCOUNTS = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/email/accounts/filing`;

/* GET */
export const INFO_EMAIL = `${config.IP}:${config.PORT}/api/sgdea/service/filing/emails/show/`;

/* GET => View Files*/
export const VIEW_FILE = `${config.IP}:${config.PORT}/api/sgdea/service/filing/emails/view/file/`;

//--------------------------------------------- METADATA BAG -----------------------------------------------------//

/* GET */
export const METADATA_ALL = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag`;

/* GET param in url => id, username */
export const METADATA_VIEW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag/`;

/* GET */
export const METADATA_ACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag/active`;

/* GET */
export const METADATA_INACTIVE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag/inactive`;

/* GET param in url name */
export const METADATA_FIND_BY_NAME = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag/search/name`;

/* POST */
export const METADATA_CREATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag`;

/* PUT */
export const METADATA_UPDATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag`;

/* DELETE  params in url => id */
export const METADATA_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag/`;

/* GET params in url page and size */
export const METADATA_PAGINATION = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag`;

//--------------------------------------------- METADATA BAG  DETAIL -----------------------------------------------------//

/* GET param in url idMetadata */
export const FIND_BY_METADATA_BAG_ID = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag/detail/find/metadata/bag/`;

/* POST */
export const METADATA_DETAIL_CREATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag/detail`;

/* PUT */
export const METADATA_DETAIL_PUT = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag/detail`;

/* DELETE params in url idDetail */
export const METADATA_DETAIL_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/metadata/bag/detail/`;

//--------------------------------------------- TEMPLATE_METADATA_BAG -----------------------------------------------------//

/* POST */
export const TEMPLATE_METADATA_BAG_CREATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/template/metadata/bag`;

/* PUT */
export const TEMPLATE_METADATA_BAG_UPDATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/template/metadata/bag`;

/* DELETE params => IdMetadata Y username */
export const TEMPLATE_METADATA_BAG_DELETE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/template/metadata/bag`;

/* GET params => IdTemplate */
export const TEMPLATE_METADATA_BAG_FIND_BY_TEMPLATE_ID = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/template/metadata/bag/find/template/`;

/* GET params => IdMetadata */
export const TEMPLATE_METADATA_BAG_VIEW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/template/metadata/bag`;

//--------------------------------------------- TYPE_DOCUMENTARIES_METADATA_BAG  -----------------------------------------------------//

/* GET params => idtemplate */
export const TYPE_DOCUMENTARIES_METADATA_BAG_UPDATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/template/metadata/bag/get/template/`;

/* GET params => idtemplate */
export const TYPE_DOCUMENTARIES_METADATA_BAG_VIEW = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentary/metadata/bag/`;

/* GET => params => idtemplate  */
export const FIND_BY_TYPE_DOCUMENTARY_ID = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentary/metadata/bag/find/type/documentary/`;

/* GET  params => idtemplate */
export const GET_METADATA_FOR_TEMPLATE = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/template/metadata/bag/get/template`;

/* GET params => idtypedocumentary */
export const GET_METADATA_FOR_TYPE_DOCUMENTARY = `${config.IP}:${config.PORT}/api/sgdea/service/configuration/type/documentary/metadata/bag/get/type/documentary/`;
