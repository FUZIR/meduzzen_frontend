import React, {useState} from 'react';
import {Box, Container, Pagination, PaginationItem, Typography} from "@mui/material";
import InfoCard from "../../components/InfoCard.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {users} from "../../utils/UserMock.js";
import LangSelect from "../../components/LangSelect.jsx";
import {withTranslation} from "react-i18next";

function Users({t}) {
    const usersPerPage = 6;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersToShow = users.slice(startIndex, endIndex);
    const pageCount = Math.ceil(users.length / usersPerPage);
    return (
        <Container maxWidth={"xl"} sx={{position: "relative"}}>
            <Container maxWidth={"md"}>
                <Typography variant="h3" color="primary" align="center" gutterBottom>
                    {t("users_header")}
                </Typography>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                    {usersToShow.map((user) => (
                        <InfoCard detailsUrl={"/users"}
                                  id={user.id}
                                  title={user.name}
                                  subtitle={user.surname}
                                  imageUrl={user.photoUrl}
                                  description={user.company}
                                  key={user.id}
                        />
                    ))}
                </Box>
                <Pagination
                    sx={{display: "flex", justifyContent: "center", alignItems: "center", mt: 3}}
                    count={pageCount}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                            {...item}
                        />
                    )}
                />

            </Container>
            <LangSelect/>
        </Container>
    );
}

export default withTranslation()(Users);