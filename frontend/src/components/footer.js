import { Box, Typography } from "@mui/material";


export default function Footer() {
    return (
        <Box sx={{ bgcolor: "black", py: 2 }}  >
            <Typography sx={{ fontSize: 16, color: 'white', fontWeight: 400, textAlign: 'center' }} >© copyright 2020, DKRIN | All Rights Reserved</Typography>
        </Box>
    )
}