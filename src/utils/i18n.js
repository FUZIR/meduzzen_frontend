import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./translations/en.json"
import ua from "./translations/ua.json"

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        },
        ua: {
            translation: ua
        },
    },
    lng: "en",
    interpolation: {
        escapeValue: false
    },
    returnObjects: true,
});

export default i18n;