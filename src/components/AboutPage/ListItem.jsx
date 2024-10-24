import React from 'react';
import {Box, Typography} from "@mui/material";

function ListItem({feature}) {
    return (
        <Box component="li" sx={{
            padding: 2,
            border: '1px solid #ddd',
            borderRadius: 2,
            backgroundColor: '#f9f9f9',
            marginBottom: 2,
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }
        }}>
            <Typography variant="body1">{feature}</Typography>
        </Box>
    );
}

export default ListItem;