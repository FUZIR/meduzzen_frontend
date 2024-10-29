import {Box, Button, Container, Typography} from "@mui/material";
import ListItem from "../components/AboutPage/ListItem.jsx"
import {withTranslation} from "react-i18next";
import LangSelect from "../components/LangSelect.jsx";

function About({t}) {
    return (
        <Container maxWidth={"xl"}>
            <Container maxWidth={"md"} sx={{height: "100vh", overflow: "hidden", position: "relative"}}>
                <Box
                    sx={{display: "flex", alignItems: "center", flexDirection: "column", marginY: 6}}>
                    <Typography variant="h3" color="primary" gutterBottom>{t('about_header')}</Typography>

                    <Typography variant="body1" gutterBottom align="center">
                        {t('about_text')}
                    </Typography>

                    <Typography variant="h4" color="primary" gutterBottom
                                sx={{marginTop: 2}}>{t('about_features_header')}</Typography>

                    <Box component="ul"
                         sx={{listStyle: "none", padding: 0, width: "100%", textAlign: "left", margin: 0}}>
                        {t("about_features", {returnObjects: true}).map((feature, index) => (
                            <ListItem feature={feature} key={index}/>))}
                    </Box>

                    <Button variant="contained" size="large"
                            sx={{marginTop: 4, bgcolor: 'primary.main', '&:hover': {bgcolor: 'primary.dark'}}}
                            href={"/"}>
                        Let's start
                    </Button>
                </Box>
            </Container>
            <LangSelect/>
        </Container>);
}

export default withTranslation()(About);