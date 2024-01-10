import { Stack, Typography, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"


export function MainPage() {
    return (
        <Box>
            <MainHeader />
            {/* <Stack> */}
            <Stack alignItems={'center'}
                sx={{ pt: 10 }}
            >
                <Typography
                    sx={{
                        border: "2px dashed black",
                        borderRadius: '4px',
                        fontSize: 52, fontWeight: 600,
                        textAlign: 'center',
                        width: '34%'
                    }}
                >Find what's next</Typography>
                {/* </Stack> */}
            </Stack>
        </Box>
    )
}

const MainHeader = () => {
    const navigate = useNavigate()
    return (
        <Stack direction={'row'} alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
                bgcolor: "white",
                borderBottom: '1px solid #e0e0e0',
                // position: "fixed",
                // top: 0,
                // transition: "background 0.5s ease",
                zIndex: 1,
                width: '100%',
                p: 1
            }} >
            <Typography variant="h2">W:</Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={2} >
                <Typography sx={{
                    fontSize: 14, fontWeight: 300,
                    ":hover": {
                        color: 'rgb(15, 111, 255)',
                        textDecoration: 'underline'
                    }
                }}>Find Jobs</Typography>
                <Typography sx={{
                    fontSize: 14, fontWeight: 300,
                    ":hover": {
                        color: 'rgb(15, 111, 255)',
                        textDecoration: 'underline'
                    }
                }} >For Recruiter</Typography>
                <Button variant="outlined"
                    onClick={() => navigate('/login')}
                >Log In</Button>
                <Button variant="blackButton" >Sign Up</Button>
            </Stack>
        </Stack>
    )
}