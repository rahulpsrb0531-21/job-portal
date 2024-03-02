import { Box, Button, Grid, Stack, Typography } from "@mui/material";


export default function HeroSection() {
    return (
        <Stack direction={'row'} justifyContent={"space-between"} p={2}
            sx={{ pt: 8 }}
        >
            <Stack spacing={8}>
                <Stack spacing={2.2}
                >
                    <Typography variant="heroTitle"
                    >Search between <br /> more them <br /> <span style={{ fontWeight: 700 }} >50,000</span> open <br /> jobs.</Typography>
                    <Typography
                        variant="heroSubText"
                    // sx={{ fontSize: 14, opacity: 0.9 }}
                    >Find your dream job anywhere in the world <br /> Remotely part time and full time</Typography>
                    <Button variant="contained"
                        sx={{
                            width: 130, fontWeight: 400,
                            borderRadius: 8, letterSpacing: 0.4
                        }}
                    >Apply Now</Button>
                </Stack>
                <Stack spacing={1} >
                    <Typography variant="heroTitle" sx={{ fontWeight: 700 }} >3,875</Typography>
                    <Typography variant="heroSubText" >CVs Received this month</Typography>
                </Stack>
            </Stack>
            <Box
                sx={{ display: { xs: "none", sm: "none", md: "block", lg: 'block' } }}
            >
                <Stack direction={'row'} spacing={1}
                >
                    <Box
                        component={'img'}
                        src="./images/man-1.jpg"
                        sx={{
                            width: 140,
                            height: 180,
                            borderRadius: '2px',
                            objectFit: 'cover'
                        }}
                    />
                    <Stack spacing={1} >
                        <Box
                            component={'img'}
                            src="./images/man-2.jpg"
                            sx={{
                                width: 160,
                                borderRadius: '2px',
                                objectFit: "cover"
                            }}
                        />
                        <Box
                            component={'img'}
                            src="./images/woman-1.jpg"
                            sx={{
                                width: 160,
                                height: 180,
                                borderRadius: '2px',
                                objectFit: "cover"
                            }}
                        />
                        <Box
                            component={'img'}
                            src="./images/man-3.jpg"
                            sx={{
                                width: 160,
                                borderRadius: '2px',
                                objectFit: "cover"
                            }}
                        />
                    </Stack>
                    <Stack spacing={1} >
                        <Box
                            component={'img'}
                            src="./images/man-4.jpg"
                            sx={{
                                width: 160,
                                height: 180,
                                borderRadius: '2px',
                                objectFit: 'cover'
                            }}
                        />
                        <Box
                            component={'img'}
                            src="./images/woman-2.jpg"
                            sx={{
                                width: 160,
                                // height: 100,
                                borderRadius: '2px',
                                objectFit: 'cover'
                            }}
                        />
                        <Box
                            component={'img'}
                            src="./images/woman-3.jpg"
                            sx={{
                                width: 160,
                                height: 180,
                                borderRadius: '1px',
                                objectFit: 'cover'
                            }}
                        />
                    </Stack>
                </Stack>
            </Box>
        </Stack >
    )
}