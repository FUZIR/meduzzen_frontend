import {Box, Container, Typography, Button} from "@mui/material";
import ListItem from "../components/AboutPage/ListItem.jsx"
import {features} from "../utils/AboutFeatures.js";

function About() {
    return (
        <Container maxWidth={"md"} sx={{height: "100vh", overflow: "hidden"}}>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", marginY: 6,}}>
                <Typography variant="h3" color="primary" gutterBottom>About QUIZZI</Typography>

                <Typography variant="body1" gutterBottom align="center">
                    Welcome to Quizzi App! This is a fun and interactive platform where you can challenge your knowledge
                    on various topics through quizzes. Whether you want to test yourself or compete with friends, Quizzi
                    is the perfect place to learn and enjoy!
                </Typography>

                <Typography variant="h4" color="primary" gutterBottom sx={{marginTop: 2}}>Key Features:</Typography>

                <Box component="ul" sx={{listStyle: "none", padding: 0, width: "100%", textAlign: "left", margin: 0}}>
                    {features.map((feature, index) => (
                        <ListItem feature={feature} key={index}/>))}
                </Box>

                <Button variant="contained" size="large"
                        sx={{marginTop: 4, bgcolor: 'primary.main', '&:hover': {bgcolor: 'primary.dark'}}} href={"/"}>
                    Let's start
                </Button>
            </Box>
        </Container>);
}

export default About;