import {useEffect} from 'react';
import {useTranslation} from "react-i18next";

function LanguageInitializer() {
    const {i18n} = useTranslation()
    useEffect(() => {
        const storedLang = localStorage.getItem("language")
        if (storedLang) {
            i18n.changeLanguage(storedLang)
        } else {
            const defaultLang = "en"
            localStorage.setItem("language", defaultLang);
            i18n.changeLanguage(defaultLang)
        }
    }, [i18n]);
    return null
}

export default LanguageInitializer;