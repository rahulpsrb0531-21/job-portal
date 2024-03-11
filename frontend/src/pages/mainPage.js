import React, { useRef, useState } from 'react'
import { Stack, Typography, Button, Box, Popover, Divider, Container, useMediaQuery, useTheme, IconButton } from "@mui/material"
import { alpha } from '@mui/material/styles'
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
import { useDispatch, useSelector } from 'react-redux'
import CandidatePopover from '../layouts/dashboard/candidatePopover.js'
import Iconify from '../components/Iconify.js'
import MenuPopover from '../components/MenuPopover.js'
import { logOut } from '../redux/reducers/authSlice.js'


export function MainPage() {
    // const isDesktop = useResponsive('up', 'lg')
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('xl'))
    const isTablet = useMediaQuery(theme.breakpoints.down('xl'))
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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
    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const { user } = useSelector((state) => state.auth)
    console.log("user>>>", user)

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const logout = () => {
        localStorage.clear()
        dispatch(logOut())
        navigate("/")
    }
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;
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
                    {/* <Button variant="contained"
                        onClick={() => navigate('/login')}
                        // onClick={handleClick}
                        sx={{
                            width: 80, fontWeight: 400,
                            borderRadius: 8,
                            letterSpacing: 0.4
                        }}
                    >Login</Button> */}
                    {
                        user?.role === "CANDIDATE" ? (
                            <>
                                <IconButton
                                    ref={anchorRef}
                                    onClick={handleOpen}
                                >
                                    {/* <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} /> */}
                                    <Typography sx={{ pr: 1, textTransform: "capitalize" }} >{user?.candidateName}</Typography>
                                    <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 18, height: 18, transform: "rotate(270deg)" }} />
                                </IconButton>

                                <MenuPopover
                                    open={open}
                                    onClose={handleClose}
                                    anchorEl={anchorRef.current}
                                    sx={{
                                        mt: 1.5,
                                        ml: 0.75,
                                        width: 180,
                                        '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
                                    }}
                                >
                                    <Stack spacing={0.75}>
                                        <Stack direction={'row'} alignItems={'center'} >
                                            <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} />
                                            <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: "capitalize" }} >{user?.candidateName
                                            }</Typography>
                                        </Stack>
                                        <Divider />
                                        <Stack spacing={0.8}  >
                                            <Typography sx={{
                                                fontSize: 12, fontWeight: 500, p: 0.6,
                                                borderRadius: "4px"
                                                ,
                                                ":hover": {
                                                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                    cursor: "pointer"
                                                }
                                            }}
                                                onClick={() => navigate('/candidate/dashboard')}
                                            >Dashboard</Typography>
                                            <Typography sx={{
                                                fontSize: 12, fontWeight: 500, p: 0.6,
                                                borderRadius: "4px"
                                                ,
                                                ":hover": {
                                                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                    cursor: "pointer"
                                                }
                                            }}
                                                onClick={() => navigate('/candidate/profile')}
                                            >Profile</Typography>
                                            <Typography sx={{
                                                fontSize: 12, fontWeight: 500, p: 0.6,
                                                borderRadius: "4px"
                                                ,
                                                ":hover": {
                                                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                    cursor: "pointer"
                                                }
                                            }}
                                                onClick={() => navigate('/candidate/lists')}
                                            >Job</Typography>
                                            <Typography sx={{
                                                fontSize: 12, fontWeight: 500, p: 0.6,
                                                borderRadius: "4px"
                                                ,
                                                ":hover": {
                                                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                    cursor: "pointer"
                                                }
                                            }}
                                                onClick={() => navigate('/candidate/applications')}
                                            >Applied</Typography>
                                            <Divider />
                                            <Typography
                                                onClick={() => logout()}
                                                sx={{
                                                    fontSize: 12, fontWeight: 500, p: 0.6,
                                                    borderRadius: "4px"
                                                    ,
                                                    ":hover": {
                                                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                        cursor: "pointer"
                                                    }
                                                }}
                                            >Log out</Typography>
                                        </Stack>
                                    </Stack>
                                </MenuPopover>
                            </>
                        ) :
                            user?.role === "RECRUITER" ? (
                                <>
                                    <IconButton
                                        ref={anchorRef}
                                        onClick={handleOpen}
                                    >
                                        {/* <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} /> */}
                                        <Typography sx={{ pr: 1, textTransform: "capitalize" }} >{user?.recruiterName}</Typography>
                                        <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 18, height: 18, transform: "rotate(270deg)" }} />
                                    </IconButton>

                                    <MenuPopover
                                        open={open}
                                        onClose={handleClose}
                                        anchorEl={anchorRef.current}
                                        sx={{
                                            mt: 1.5,
                                            ml: 0.75,
                                            width: 180,
                                            '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
                                        }}
                                    >
                                        <Stack spacing={0.75}>
                                            <Stack direction={'row'} alignItems={'center'} >
                                                <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 32, height: 32 }} />
                                                <Typography sx={{ fontSize: 14, fontWeight: 500, textTransform: 'capitalize' }} >{user?.recruiterName}</Typography>
                                            </Stack>
                                            <Divider />
                                            <Stack spacing={0.8}  >
                                                <Typography sx={{
                                                    fontSize: 12, fontWeight: 500, p: 0.6,
                                                    borderRadius: "4px"
                                                    ,
                                                    ":hover": {
                                                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                        cursor: "pointer"
                                                    }
                                                }}
                                                    onClick={() => navigate('/recruiter/dashboard')}
                                                >Dashboard</Typography>
                                                <Typography sx={{
                                                    fontSize: 12, fontWeight: 500, p: 0.6,
                                                    borderRadius: "4px"
                                                    ,
                                                    ":hover": {
                                                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                        cursor: "pointer"
                                                    }
                                                }}
                                                    onClick={() => navigate('/recruiter/profile')}
                                                >Profile</Typography>
                                                <Typography sx={{
                                                    fontSize: 12, fontWeight: 500, p: 0.6,
                                                    borderRadius: "4px"
                                                    ,
                                                    ":hover": {
                                                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                        cursor: "pointer"
                                                    }
                                                }}
                                                    onClick={() => navigate('/recruiter/jobs')}
                                                >Job</Typography>
                                                <Typography sx={{
                                                    fontSize: 12, fontWeight: 500, p: 0.6,
                                                    borderRadius: "4px"
                                                    ,
                                                    ":hover": {
                                                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                        cursor: "pointer"
                                                    }
                                                }}
                                                    onClick={() => navigate('/recruiter/applicant')}
                                                >Applicant</Typography>
                                                <Divider />
                                                <Typography
                                                    onClick={() => logout()}
                                                    sx={{
                                                        fontSize: 12, fontWeight: 500, p: 0.6,
                                                        borderRadius: "4px"
                                                        ,
                                                        ":hover": {
                                                            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
                                                            cursor: "pointer"
                                                        }
                                                    }}
                                                >Log out</Typography>
                                            </Stack>
                                        </Stack>
                                    </MenuPopover>
                                </>
                            )
                                : (
                                    <Button variant="contained"
                                        onClick={() => navigate('/login')}
                                        // onClick={handleClick}
                                        sx={{
                                            width: 80, fontWeight: 400,
                                            borderRadius: 8,
                                            letterSpacing: 0.4
                                        }}
                                    >Login</Button>
                                )
                    }
                    {/* <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Stack spacing={0.8} sx={{ p: 1.4 }} >
                            <Typography sx={{ fontSize: 14, cursor: "pointer" }}
                                onClick={() => navigate('/login')}
                            >I'm looking for a job</Typography>
                            <Typography sx={{ fontSize: 14, cursor: "pointer" }}
                                onClick={() => navigate('/onboarding/recruiter/login')}
                            >I'm looking for candidates</Typography>
                        </Stack>
                    </Popover> */}
                </Stack>
            </Stack>
        </Container >
    )
}