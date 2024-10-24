import {Avatar, Box, Button, Typography} from "@mui/material";
import React from "react";

function InfoCard({id, info1, info2, photoUrl, info3, redirectUrl}) {
    return (
        <Box sx={{
            padding: 2,
            border: '1px solid #ddd',
            borderRadius: 2,
            backgroundColor: '#f9f9f9',
            marginBottom: 2,
            transition: 'transform 0.2s',
            width: "15vw",
            height: "250px",
            position: "relative",
            '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }
        }}>
            <Typography variant={"h6"}>
                {info1}
            </Typography>
            <Typography variant={"h6"}>
                {info2}
            </Typography>
            <Avatar alt={"avatar"} src={photoUrl}
                    sx={{width: "60px", height: "60px", position: "absolute", top: "10px", right: "10px"}}></Avatar>
            <Typography variant={"body"} color={"primary"}>{info3}</Typography>
            <Button variant={"text"} href={`${redirectUrl}/${id}`} size={"small"} sx={{position:"absolute", bottom:"10px", right:"10px"}} color={"primary"}>More info</Button>
        </Box>
    );
}

export default InfoCard;