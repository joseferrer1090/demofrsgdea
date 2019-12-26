export default {
  items: [
    {
      name: "Incio",
      url: "/configuracion",
      icon: "icon-home"
    },
    {
      name: "Conglomerado",
      icon: "icon-settings",
      url: "/configuracion/conglomerado"
    },
    {
      name: "Empresa",
      icon: "icon-settings",
      url: "/configuracion/empresa"
    },
    {
      name: "Sedes",
      icon: "icon-settings",
      url: "/configuracion/sedes"
    },
    {
      name: "Dependencia",
      icon: "icon-settings",
      url: "/configuracion/dependencia"
    },
    {
      name: "Cargo",
      icon: "icon-settings",
      url: "/configuracion/cargo"
    },
    {
      name: "Mensajero",
      icon: "icon-settings ",
      url: "/configuracion/mensajero"
    },
    {
      name: "Tipo de envío / llegada",
      icon: "icon-settings",
      url: "/configuracion/tipollegada"
    },
    {
      name: "Tipo Tramite",
      icon: "icon-settings",
      url: "/configuracion/tipotramite"
    },
    {
      name: "Usuarios",
      icon: "icon-settings",
      url: "/configuracion/usuarios"
    },
    {
      name: "Tipo de terceros",
      icon: "icon-settings",
      url: "/configuracion/tipotercero"
    },
    {
      name: "Roles",
      icon: "icon-settings",
      url: "/configuracion/roles"
    },
    {
      name: "Grupo de usuarios",
      icon: "icon-settings",
      url: "/configuracion/grupos"
    },
    {
      name: "Terceros",
      icon: "icon-settings",
      url: "/configuracion/terceros"
    },
    {
      name: "Tipo documental radicación",
      icon: "icon-book-open",
      url: "/configuracion/tipodocumentalradicacion"
    },
    {
      name: "País",
      icon: "icon-settings",
      url: "/configuracion/pais"
    },
    {
      name: "Departamento",
      icon: "icon-settings",
      url: "/configuracion/departamento"
    },
    {
      name: "Ciudad",
      icon: "icon-settings",
      url: "/configuracion/ciudad"
    },
    {
      name: "Auditoria",
      icon: "icon-info",
      url: "/configuracion/auditoria",
      children: [
        {
          name: "Consultar",
          url: "/configuracion/auditoria",
          icon: "fa fa-search"
        },
        {
          name: "Mover a historico",
          url: "/configuracion/auditoria/moverhistorico",
          icon: "fa fa-server"
        }
      ]
    },
    {
      name: "Plantilla",
      url: "/configuracion/plantilla",
      icon: "fa fa-puzzle-piece"
    },
    {
      name: "Tema",
      icon: "icon-pencil",
      url: "/configuracion/tema"
    }
  ]
};
