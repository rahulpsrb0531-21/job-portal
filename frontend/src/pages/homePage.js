import { Box, Divider, Stack, Typography } from "@mui/material"
import Iconify from "../components/Iconify"

const HomePage = () => {
    return (
        <Stack sx={{
            bgcolor: 'rgb(255, 255, 255)', width: '100%',
            borderRadius: 0.4, p: 1, pt: 4
        }} spacing={1} >
            <Typography sx={{ fontSize: 16, fontWeight: 500, textAlign: 'right' }} >Profile last updated on: Jan 9, 2024</Typography>
            <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}
                sx={{ width: '100%', border: '1px solid #e0e0e0', borderRadius: "8px", p: 1 }}
            >
                <Stack direction={'row'} alignItems={'start'} >
                    <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 42, height: 42 }} />
                    <Stack spacing={4} >
                        <Box>
                            <Typography
                                sx={{ fontSize: 24, color: 'rgb(5, 12, 38)', fontWeight: 500 }}
                            >Rakesh Tamboli</Typography>
                            <Typography
                                sx={{ fontSize: 14, color: 'rgb(5, 12, 38)', fontWeight: 700 }}
                            >Full Stack Developer @ creativeWebo</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'rgb(5, 12, 38)' }} >Where are you in your job search?</Typography>
                            <Typography sx={{ fontSize: 12, color: 'rgb(5, 12, 38)' }} >Keep your job status up-to-date to inform employers of your search.</Typography>
                        </Box>
                    </Stack>
                </Stack>
                <Stack direction={'row'} spacing={2} >
                    <Typography
                        sx={{
                            color: "rgb(20, 63, 205)", fontSize: 12,
                            fontWeight: 500,
                            "&:hover": {
                                textDecoration: 'underline'
                            }
                        }}
                    >view your public profile</Typography>
                    <Typography sx={{
                        color: "rgb(20, 63, 205)", fontSize: 12,
                        fontWeight: 500,
                        "&:hover": {
                            textDecoration: 'underline'
                        }
                    }}>Edit</Typography>
                </Stack>
            </Stack>
            <Stack spacing={2}
                sx={{ width: '100%', border: '1px solid #e0e0e0', borderRadius: "8px", p: 2 }}
            >
                <Typography sx={{ fontSize: 16, fontWeight: 500 }} >Recently Applied Jobs</Typography>
                <Stack direction={'row'} alignItems={'start'} >
                    <Stack spacing={1} >
                        <Stack direction={'row'} spacing={1} >
                            <Typography>BrandLogo</Typography>
                            <Box>
                                <Typography
                                    sx={{ fontSize: 14, color: 'rgb(5, 12, 38)', fontWeight: 500 }}
                                >Full Stack Developer</Typography>
                                <Typography
                                    sx={{ fontSize: 12, color: 'rgb(5, 12, 38)' }}
                                >Quantapp</Typography>
                                <Typography
                                    sx={{ fontSize: 12, color: 'rgb(5, 12, 38)' }}
                                >India . Remote</Typography>
                                <Typography
                                    sx={{ fontSize: 14, color: 'rgb(5, 12, 38)', fontWeight: 500 }}
                                >Pending Jan 4</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider sx={{ pt: 1 }} />
                <Typography
                    sx={{
                        fontSize: 12, color: "rgb(20, 63, 205)", textAlign: 'center', ":hover": {
                            textDecoration: "underline"
                        }
                    }}
                >See all applied jobs</Typography>
            </Stack>
        </Stack >
    )
}
export default HomePage