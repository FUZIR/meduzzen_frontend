import React, {useState} from 'react';
import {Box, Container, Pagination, PaginationItem, Typography} from "@mui/material";
import InfoCard from "../../components/InfoCard.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {companies2 as companies} from "../../utils/CompanyMock.js";

function Companies() {
    const usersPerPage = 6;
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const companiesToShow = companies.slice(startIndex, endIndex);
    const pageCount = Math.ceil(companies.length / usersPerPage);

    return (
        <Container maxWidth="md">
            <Typography variant="h3" color="primary" align="center" gutterBottom>
                Our Companies
            </Typography>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "row",
                flexWrap: "wrap"
            }}>
                {companiesToShow.map((company) => (
                    <InfoCard redirectUrl={"/companies"}
                              id={company.id}
                              info1={company.name}
                              photoUrl={company.photoUrl}
                              info2={company.description}
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
                    position: "relative",
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
    );
}

export default Companies;