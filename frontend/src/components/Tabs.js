import { Box, Stack, Typography } from "@mui/material";


export default function Tabs({ tabs = [] }) {
    return (
        <Stack direction={'row'} spacing={2} >
            {
                tabs.map((e, i) => (
                    <Box
                        sx={{
                            // bgcolor: "primary.light", color: "primary.main",
                            // bgcolor: 'red',
                            textAlign: 'center',
                            height: "fit-content",
                            width: 'auto',
                            padding: '2px 2px'
                        }}
                    >
                        <Typography variant="logo"
                            sx={{ fontSize: { xs: 12, sm: 14, md: 16, lg: 18 }, fontWeight: 500 }}
                        >{e.name}</Typography>
                    </Box>
                ))
            }
        </Stack>
    )
}