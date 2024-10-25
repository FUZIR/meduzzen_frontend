import React from "react";
import {Typography, Button, Box} from "@mui/material";
import SendIcon from "@mui/icons-material/Send"

export default function Hello() {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100vh",
        }}>
            <Typography variant={"h2"} color={"primary"} gutterBottom>
                Hi, it's start page of Quiz App
            </Typography>
            <Typography variant={"h3"} color={"primary"} marginBottom={"30px"} gutterBottom>Let's start our
                quiz.</Typography>
            <Button variant={"contained"} endIcon={<SendIcon/>} href={"/about"} size={"large"}> Let's goooo!</Button>
        </Box>
    )
}