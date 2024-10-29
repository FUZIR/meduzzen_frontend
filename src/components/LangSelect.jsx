import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";

const defaultLang = "en"

function LangSelect() {
    const [language, setLanguage] = useState(defaultLang)
    const {i18n} = useTranslation()
    useEffect(() => {
        const storedLang = localStorage.getItem("language")
        if (storedLang) {
            setLanguage(storedLang)
            i18n.changeLanguage(storedLang);
        } else {
            setLanguage(defaultLang)
            i18n.changeLanguage(defaultLang)
            localStorage.setItem("language", defaultLang);
        }
    }, [language, i18n]);

    const handleChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage)
        localStorage.setItem("language", selectedLanguage)
        i18n.changeLanguage(localStorage.getItem("language"))
    }
    return (
        <FormControl fullWidth sx={{position: "absolute", top: "20px", right: "20px", width: "10vw"}}>
            <InputLabel id="lang-select-label">Language</InputLabel>
            <Select
                labelId="lang-select-label"
                id="lang-select"
                value={""}
                label="Language"
                onChange={handleChange}
            >
                <MenuItem value={"en"}>English</MenuItem>
                <MenuItem value={"ua"}>Українська</MenuItem>
            </Select>
        </FormControl>
    );
}

export default LangSelect;