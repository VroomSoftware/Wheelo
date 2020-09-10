import i18n from "i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import en from "./components/locales/en/translation";
import fr from "./components/locales/fr/translation";

i18n
    .use(LanguageDetector)
    .init({
    resources: {
        en: en,
        fr: fr
    },
    fallbackLng: "en",
    debug: false,

    ns: ["common"],
    defaultNS: "common",

    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    }
});

export default i18n;