import { Box, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Iconify from "./Iconify"


export default function Footer({ page }) {
    const navigate = useNavigate()
    const socialMedia = [
        {
            title: "facebook",
            icon: "il:facebook",
            link: "https://www.facebook.com/people/DKRIN-LTD/100064257146127/"
        },
        {
            title: "instagram",
            icon: "il:instagram",
            link: "https://www.instagram.com/dkrinltd/"
        },
        {
            title: "twitter",
            icon: "pajamas:twitter",
            link: "https://twitter.com/dkrinltd#"
        },
        {
            title: "linkedin",
            icon: "bi:linkedin",
            link: "https://www.linkedin.com/in/dkrin-ltd-69402148"
        },
    ]
    return (
        <Stack direction={'row'} justifyContent={'space-between'}
            // alignItems={'center'}
            sx={{
                bgcolor: "black", p: 1, position: "static",
                bottom: 0, width: '100%'
            }}>
            <Stack direction={{ xs: 'row', sm: 'row', md: "row", lg: 'row' }} spacing={{ xs: 0.6, sm: 0.6, md: 2, lg: 2 }}  >
                <Typography variant="footerTitle" sx={{ textAlign: 'center' }} >© DKRIN 2024</Typography>
                <Typography variant="footerTitle" sx={{
                    textAlign: 'center', cursor: "pointer",
                    ":hover": {
                        textDecoration: "underline"
                    }
                }}
                    onClick={() => navigate('/privacy-page')}
                >Privacy Policy</Typography>
            </Stack>
            <Stack direction={'row'} spacing={1} >
                {
                    socialMedia?.map((data, idx) => (
                        <a href={data?.link} target="_blank" >
                            <Iconify icon={data?.icon} sx={{ width: 24, height: 24, color: "white" }} />
                        </a>
                    ))
                }
            </Stack>
        </Stack >
    )
}