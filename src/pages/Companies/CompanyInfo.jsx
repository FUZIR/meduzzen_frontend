import React from 'react';
import {useParams} from "react-router-dom";
import {Card, CardContent, CardMedia, Container, Typography} from "@mui/material";
import {companies} from "../../utils/CompanyMock.js";

function CompanyInfo() {
    const { id } = useParams();
    const companyId = parseInt(id);
    const company = companies.find(company=> company.id === companyId)
    if (!company) {
        return <Typography variant="h4" color={"error"} align={"center"}>Company not found</Typography>;
    }
    return (
        <Container maxWidth={"md"} sx={{ height: "100vh", overflow: "hidden", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={company.photoUrl}
                    alt={`${company.name}`}
                />
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {company.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Description: {company.description}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Year Established: {company.yearEstablished}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Employees: {company.numberOfEmployees}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Headquarters: {company.headquarters}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Website: <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default CompanyInfo;