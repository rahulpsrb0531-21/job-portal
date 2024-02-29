import { Box, Button, Grid, Stack, Typography } from "@mui/material";


export default function HeroSection() {
    return (
        <Stack direction={'row'} justifyContent={"space-between"} p={2} >
            <Stack spacing={2}
            >
                <Typography
                    sx={{
                        fontSize: 62,
                        fontWeight: 200,
                        lineHeight: '60px'
                    }}
                >Search between <br /> more them <br /> <span style={{ fontWeight: 500 }} >50,000</span> open <br /> jobs.</Typography>
                <Typography
                    sx={{ fontSize: 14, opacity: 0.9 }}
                >Find your dream job anywhere in the world <br /> Remotely part time and full time</Typography>
                <Button variant="contained"
                    sx={{
                        width: 130, fontWeight: 400,
                        borderRadius: 8, letterSpacing: 0.4
                    }}
                >Apply Now</Button>
                <Typography sx={{ fontSize: 14, opacity: 0.9 }}>
                    <span style={{ fontSize: 42, fontWeight: 500 }} >3,875</span> <br /> CVs Received this month</Typography>
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
                                borderRadius: '2px',
                                objectFit: 'cover'
                            }}
                        />
                        <Box
                            component={'img'}
                            src="./images/woman-3.jpg"
                            sx={{
                                width: 160,
                                height: 200,
                                borderRadius: '2px',
                                objectFit: 'cover'
                            }}
                        />
                    </Stack>
                </Stack>
            </Box>
        </Stack >
    )
}