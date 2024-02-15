import React, { useState } from 'react'
import { Stack, Typography, Button, Box, Popover, Divider } from "@mui/material"
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


export function MainPage() {
    const isDesktop = useResponsive('up', 'lg')
    return (
        <Box>
            <MainHeader />
            <Box>
                {
                    isDesktop === true ? (
                        <Stack alignItems={'center'}
                            sx={{ height: "86vh" }}
                        >
                            <ParallaxMousemove />
                        </Stack>
                    ) : (
                        <Stack alignItems={'center'}
                            justifyContent={'center'}
                            sx={{ height: '400px' }}
                        >
                            <Typography
                                sx={{
                                    border: "2px dashed black",
                                    borderRadius: '4px',
                                    fontSize: 38, fontWeight: 600,
                                    textAlign: 'center',
                                    // width: '100%',
                                    p: 0.6
                                }}
                            >Welcome to DKRIN</Typography>
                        </Stack>
                    )
                }
            </Box>
            {
                isDesktop === true ? (
                    <CategoryServices />
                ) : (
                    <CardCarousel cards={companyServiceData} />
                )
            }
            <OurServices />
            <AboutSection />
            <Footer />
        </Box>
    )
}

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
        <Stack direction={'row'} alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
                bgcolor: "white",
                borderBottom: '1px solid #e0e0e0',
                zIndex: 1,
                width: '100%',
                p: 1
            }} >
            <Box
                component={'img'}
                src='/images/logo.png'
                sx={{ width: { xs: 100, lg: 200 } }}
            />
            <Stack direction={'row'} alignItems={'center'} spacing={2} >
                <Button variant="outlined"
                    onClick={() => navigate('/login')}
                >Log In</Button>
                <Button variant="blackButton"
                    onClick={handleClick}
                >Sign Up</Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Box sx={{ p: 1.4 }} >
                        <Typography sx={{ fontSize: 12, cursor: "pointer" }}
                            onClick={() => navigate('/login')}
                        >I'm looking for a job</Typography>
                        <Typography sx={{ fontSize: 12, cursor: "pointer" }}
                            onClick={() => navigate('/onboarding/recruiter/login')}
                        >I'm looking for candidates</Typography>
                    </Box>
                </Popover>
            </Stack>
        </Stack>
    )
}