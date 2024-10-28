import React, {useState} from 'react';
import {Box, Container, Pagination, PaginationItem, Typography} from "@mui/material";
import InfoCard from "../../components/InfoCard.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {companies2 as companies} from "../../utils/CompanyMock.js";
import LangSelect from "../../components/LangSelect.jsx";
import {withTranslation} from "react-i18next";

function Companies({t}) {
    const usersPerPage = 6;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const companiesToShow = companies.slice(startIndex, endIndex);
    const pageCount = Math.ceil(companies.length / usersPerPage);

    return (
        <Container maxWidth="xl">
            <Container maxWidth="md">
                <Typography variant="h3" color="primary" align="center" gutterBottom>
                    {t("companies_header")}
                </Typography>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                    {companiesToShow.map((company) => (
                        <InfoCard detailsUrl={"/companies"}
                                  id={company.id}
                                  title={company.name}
                                  imageUrl={company.photoUrl}
                                  description={company.description}
                                  key={company.id}
                        />
                    ))}
                </Box>
                <Pagination
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 3,
                        marginBottom: 3
                    }}
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

export default withTranslation()(Companies);