import config from "./configRequest/config";
//---------------------------------------------CONGLOMERADO--------------------------------------------------//

/* GET / POST / PUT */
export const CONGLOMERATES =
  "http://192.168.10.180:7000/api/sgdea/conglomerate";

/* GET / DELETE */
export const CONGLOMERATE =
  "http://192.168.10.180:7000/api/sgdea/conglomerate/054a3833-fa34-4770-8c30-3fc0efcebb28/ccuartas";

/* GET */
export const CONGLOMERATES_STATUS =
  "http://192.168.10.180:7000/api/sgdea/conglomerate/active";

/* GET */
export const CONGLOMERATE_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/conglomerate/export/ccuartas";

/* GET */
export const CONGLOMERATE_PAGINATION = () => {
  const page = 0;
  const size = 3;
  return `http://192.168.10.180:7000/api/sgdea/conglomerate/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------EMPRESA--------------------------------------------------//

/* GET / POST / PUT */
export const COMPANYS = "http://192.168.10.180:7000/api/sgdea/company";

/* GET / DELETE */
export const COMPANY =
  "http://192.168.10.180:7000/api/sgdea/company/679a9e1f-29a6-4c7a-b90b-da4d774ebf1f/ccuartas";

/* GET */
export const COMPANYS_STATUS =
  "http://192.168.10.180:7000/api/sgdea/company/active";

/* GET */
export const COMPANY_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/company/export/ccuartas";

/* GET */
export const COMPANY_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/company/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------SEDES--------------------------------------------------//

/* GET / POST / PUT */
export const HEADQUARTERS = "http://192.168.10.180:7000/api/sgdea/headquarter";

/* GET / DELETE */
export const HEADQUARTER =
  "http://192.168.10.180:7000/api/sgdea/headquarter/2473c30a-c0ef-4176-b196-0c8b2c55c1a0/ccuartas";

/* GET */
export const HEADQUARTERS_STATUS =
  "http://192.168.10.180:7000/api/sgdea/headquarter/active";

/* GET */
export const HEADQUARTER_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/headquarter/export/ccuartas";

/* GET */
export const HEADQUARTER_PAGINATION = () => {
  const page = 0;
  const size = 1;
  return `http://192.168.10.180:7000/api/sgdea/headquarter/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------DEPENDENCIA--------------------------------------------------//

/* GET / POST / PUT */
export const DEPENDENCIES = "http://192.168.10.180:7000/api/sgdea/dependence";

/* GET / DELETE */
export const DEPENDENCE =
  "http://192.168.10.180:7000/api/sgdea/dependence/a113c47b-e30c-49e8-987d-c178b429b302/ccuartas";

/* GET */
export const DEPENDENCIES_STATUS =
  "http://192.168.10.180:7000/api/sgdea/dependence/active";

/* GET */
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
export const CHARGES_STATUS =
  "http:///192.168.20.187:7000/api/sgdea/charge/active";

/* GET */
export const CHARGE_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/charge/export/ccuartas";

/* GET */
export const CHARGE_PAGINATION = () => {
  const page = 0;
  const size = 2;
  return `http://192.168.10.180:7000/api/sgdea/charge/pagination?page=${page}&size=${size}`;
};

//---------------------------------------------MENSAJERO--------------------------------------------------//

/* GET / POST / PUT */
export const MESSENGERS = "http://192.168.10.180:7000/api/sgdea/messenger";

/* GET / DELETE */
export const MESSENGER =
  "http://192.168.10.180:7000/api/sgdea/messenger/be31eb45-fa5b-4b15-bd32-c4adf9ff4376/ccuartas";

/* GET */
export const MESSENGERS_STATUS =
  "http://192.168.10.180:7000/api/sgdea/messenger/status/1";

/* GET */
export const MESSENGER_EXPORT =
  "http://192.168.10.180:7000/api/sgdea/messenger/export/ccuartas";

/* GET */
export const MESSENGER_PAGINATION = () => {
  const page = 0;
  const size = 2;
  return `http://192.168.10.180:7000/api/sgdea/messenger/pagination?page=${page}&size=${size}`;
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
export const USERS = "http://192.168.10.180:7000/api/sgdea/user";

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
