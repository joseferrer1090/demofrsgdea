import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import en from "./../services/locale/en.json";
import es from "./../services/locale/es.json";

i18n.use(reactI18nextModule).init({
  resources: {
    en,
    es
  },
  fallbackLng: "es",
  debug: true,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ","
  },
  react: {
    wait: true
  }
});
export default i18n;
