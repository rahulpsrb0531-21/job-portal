import { Box, Stack, Typography } from "@mui/material"
import Iconify from "../Iconify";
import { useSelector } from "react-redux"
import { useState } from "react";

export default function Overview() {
    const { candidate } = useSelector((state) => state.auth)
    // console.log(candidate?._id)
    // const [candidateData,setCandidateData] = useState(null)
    return (
        <Box sx={{
            bgcolor: 'rgb(255, 255, 255)', width: '100%',
            borderRadius: 0.4, p: 2,
            border: '1px solid #e0e0e0', borderRadius: "8px"
        }} >
            <Typography sx={{ fontSize: 24, fontWeight: 500 }} >What recruiter will see</Typography>
            <Stack sx={{
                border: '1px solid #e0e0e0', borderRadius: "8px"
            }} >
                <Stack sx={{ p: 2 }} spacing={2} >
                    <Stack direction={'row'} alignItems={'start'} >
                        <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 42, height: 42 }} />
                        <Box>
                            <Typography
                                sx={{ fontSize: 24, color: 'rgb(5, 12, 38)', fontWeight: 500 }}
                            >Rakesh Tamboli</Typography>
                            <Typography
                                sx={{ fontSize: 14, color: 'rgb(5, 12, 38)', fontWeight: 700 }}
                            >Full Stack Developer @ creativeWebo</Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ pl: 1 }}>
                        <Typography sx={{ fontSize: 14, color: 'rgb(145, 148, 160)' }}>Experience</Typography>
                        <Stack direction={'row'}  >
                            <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 22, height: 22 }} />
                            <Box>
                                <Typography
                                    sx={{ fontSize: 14, color: 'rgb(5, 12, 38)', fontWeight: 700 }}
                                >Full Stack Developer</Typography>
                                <Typography
                                    sx={{ fontSize: 14, color: 'rgb(145, 148, 160)' }}
                                >creativeWebo</Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <Box sx={{ pl: 1 }}>
                        <Typography
                            sx={{ fontSize: 14, color: 'rgb(145, 148, 160)' }}
                        >Skill</Typography>
                        <Stack direction={'row'} flexWrap={'wrap'} spacing={1} sx={{ pt: 1 }} >
                            <Typography
                                sx={{ bgcolor: "rgb(245, 245, 245)", p: 0.6, fontSize: 12, borderRadius: '4px', color: 'rgb(82, 87, 105)' }}
                            >Javascript</Typography>
                            <Typography sx={{ bgcolor: "rgb(245, 245, 245)", p: 0.6, fontSize: 12, borderRadius: '4px', color: 'rgb(82, 87, 105)' }} >React</Typography>
                            <Typography sx={{ bgcolor: "rgb(245, 245, 245)", p: 0.6, fontSize: 12, borderRadius: '4px', color: 'rgb(82, 87, 105)' }} >Node</Typography>
                            <Typography sx={{ bgcolor: "rgb(245, 245, 245)", p: 0.6, fontSize: 12, borderRadius: '4px', color: 'rgb(82, 87, 105)' }} >Redux</Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    )
}