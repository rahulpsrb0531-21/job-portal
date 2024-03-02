import React, { useState } from 'react'
import { Stack, Typography, Button, Box, Popover, Divider, Container, useMediaQuery, useTheme } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import ParallaxMousemove from '../components/parallerX/ParallaxMousemove'
import useResponsive from '../hooks/useResponsive'
import CategoryServices from '../components/company/categoryServices/categoryServices'
import CardCarousel from '../components/company/cardCarousel'
import { companyServiceData } from '../utils/basicData'
import OurServices from '../components/company/ourServices.js'
import Footer from '../components/footer.js'
import AboutSection from '../components/company/aboutSection.js'
import ContactUs from '../components/company/contactUs.js'
import HeroSection from '../components/company/heroSection.js'
import DrawerMenu from '../components/drawerMenu.js'


export function MainPage() {
    // const isDesktop = useResponsive('up', 'lg')
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('xl'));
    const isTablet = useMediaQuery(theme.breakpoints.down('xl'));
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const getContainerMaxWidth = () => {
        if (isDesktop) return "xl";
        if (isTablet) return "xl";
        if (isMobile) return "sm";
        return "xl"; // fallback to xl for larger screens
    };
    return (
        <Box>
            <MainHeader />
            <Container
                // maxWidth={getContainerMaxWidth()} 
                maxWidth='lg'
                sx={{ pt: 2 }}
            >
                <HeroSection />
                <CategoryServices />
                <OurServices />
                <AboutSection />
            </Container>
            <Divider />
            <ContactUs />
            <Footer page="mainpage" />
        </Box>
    )
}

// 424-666-1308

const MainHeader = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <Container maxWidth="lg" >
            <Stack direction={'row'} alignItems={'center'}
                justifyContent={'space-between'}
                sx={{
                    bgcolor: "white",
                    // borderBottom: '1px solid #e0e0e0',
                    zIndex: 1,
                    width: '100%',
                    p: 1
                }} >
                <Box
                    component={'img'}
                    src='/images/logo.png'
                    sx={{ width: { xs: 100, lg: 120 } }}
                />
                <Box
                    sx={{ display: { xs: "block", sm: "block", md: "none", lg: 'none' } }}
                >
                    <DrawerMenu />
                </Box>
                <Stack direction={'row'} alignItems={'center'} spacing={2} justifyContent={'space-between'}
                    sx={{
                        width: '60%',
                        display: { xs: "none", sm: "none", md: "flex", lg: 'flex' }
                    }}
                >
                    <Stack direction={'row'} spacing={4} >
                        <Typography variant='headerTitleLink' sx={{ cursor: 'pointer', ":hover": { textDecoration: "underline" } }}
                            onClick={() => navigate('/login')}
                        >Find a job</Typography>
                        <Typography variant='headerTitleLink' sx={{ cursor: 'pointer', ":hover": { textDecoration: "underline" } }}
                            onClick={() => navigate('/onboarding/recruiter/login')}
                        >Find a Candidate</Typography>
                        <Typography variant='headerTitleLink' sx={{ cursor: 'pointer', ":hover": { textDecoration: "underline" } }} >Join Us Now</Typography>
                    </Stack>
                    <Button variant="contained"
                        onClick={() => navigate('/login')}
                        sx={{
                            width: 80, fontWeight: 400,
                            borderRadius: 8,
                            letterSpacing: 0.4
                        }}
                    >Login</Button>
                </Stack>
            </Stack>
        </Container>
    )
}