import React from "react";
import {Typography, Button, Container} from "@mui/material";
import SendIcon from "@mui/icons-material/Send"

export default function Hello() {
    return (
        <Container maxWidth={"sx"}>
            <Typography variant={"h2"} color={"primary"} align={"center"} gutterBottom>
                Hi, it's start page of Quiz App
            </Typography>
            <Typography variant={"h3"} color={"primary"} align={"center"} gutterBottom>Let's start our
                quiz.</Typography>
            <Button variant={"contained"} endIcon={<SendIcon/>}> Let's goooo!</Button>
        </Container>
    )
}