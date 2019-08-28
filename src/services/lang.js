function selectedLang() {
  let getVar = localStorage.getItem("myLang");
  //   if (!getVar) {
  //     localStorage.setItem("myLang", "es");
  //   } else if (getVar) {
  //   }
  if (!getVar) {
    return "en";
  } else if (getVar === "en") {
    localStorage.setItem("myLang", "es");
    return "es";
  } else if (getVar === "es") {
    localStorage.setItem("myLang", "en");
    return "en";
  }
}

const content = {
  en: {
    // Principal Component´s
    home: "Home",
    userlogged: "manager "
  },
  es: {
    // Componentes primcipales
    home: "Inicio",
    userlogged: "administrador"
  }
};

module.exports = [selectedLang()];
