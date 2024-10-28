import {Avatar, Box, Button, Typography} from "@mui/material";
import React from "react";
import {withTranslation} from "react-i18next";

function InfoCard({id, title, subtitle, imageUrl, description, detailsUrl, t}) {
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
                transform: 'scale(1.02)', boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }
        }}>
            <Typography variant={"h6"}>
                {title}
            </Typography>
            <Typography variant={"h6"}>
                {subtitle}
            </Typography>
            <Avatar alt={"avatar"} src={imageUrl}
                    sx={{width: "60px", height: "60px", position: "absolute", top: "10px", right: "10px"}}>
            </Avatar>
            <Typography variant={"body"} color={"primary"}>{description}</Typography>
            <Button variant={"text"} href={`${detailsUrl}/${id}`} size={"small"}
                    sx={{position: "absolute", bottom: "10px", right: "10px"}}
                    color={"primary"}>{t('info_cards_button')}
            </Button>
        </Box>);
}

export default withTranslation()(InfoCard);
