import { Box, Container, Stack, Typography } from "@mui/material"
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
        <Box
            sx={{
                bgcolor: "black", position: "static",
                bottom: 0, width: '100%', py: 4
            }}
        >
            <Container maxWidth='lg' >
                {/* <Box
                    component={"img"}
                    src="/images/logo.png"
                    sx={{
                        width: 100,
                        objectFit: "cover", cursor: "pointer", bgcolor: "white"
                    }}
                    onClick={() => navigate('/')}
                /> */}
                <Typography sx={{ fontSize: 32, fontWeight: 700, letterSpacing: 1, color: "white", py: 2 }} >DKRIN</Typography>
                <Stack direction={{ xs: "column", lg: 'row' }}
                    justifyContent={'space-between'}
                    spacing={4}
                >
                    {/* 1  */}
                    <Stack
                        spacing={{ xs: 2, lg: 0 }}
                        justifyContent={'space-between'}
                    >
                        <Typography variant="footerText" >Make your dreams come true with us.<br />
                            Easy to Use, Easy to apply!
                        </Typography>
                        <Typography variant="footerText" >
                            Copyright © DKRIN 2024 All Right Reserved
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'} spacing={8} >
                        <Stack spacing={{ xs: 1.4, sm: 1.4, md: 2, lg: 2 }} >
                            <Typography variant="footerText" >
                                <a href="https://www.facebook.com/people/DKRIN-LTD/100064257146127/" target="_blank" style={{ textDecoration: "none", color: "white" }} >
                                    Facebook
                                </a>
                            </Typography>
                            <Typography variant="footerText" >
                                <a href="https://www.instagram.com/dkrinltd/" target="_blank" style={{ textDecoration: "none", color: "white" }}>
                                    Instagram
                                </a>
                            </Typography>
                            <Typography variant="footerText" >
                                <a href="https://www.linkedin.com/in/dkrin-ltd-69402148" target="_blank" style={{ textDecoration: "none", color: "white" }}>
                                    Linkedin
                                </a>
                            </Typography>
                            <Typography variant="footerText" >
                                <a href="https://twitter.com/dkrinltd#" target="_blank" style={{ textDecoration: "none", color: "white" }}>
                                    Twitter
                                </a>
                            </Typography>
                        </Stack>
                        <Stack spacing={{ xs: 1.4, sm: 1.4, md: 2, lg: 2 }} >
                            <Typography variant="footerText" sx={{ cursor: "pointer" }} onClick={() => navigate("/privacy-policy")} >Privacy Policy</Typography>
                            <Typography variant="footerText" sx={{ cursor: "pointer" }} onClick={() => navigate("/terms-condition")} >Terms & Condition</Typography>
                            <Typography variant="footerText" sx={{ cursor: "pointer" }} onClick={() => navigate("/about-us")} >About</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Box >
    )
}

{/* <Stack direction={'row'} justifyContent={'space-between'}
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
</Stack > */}