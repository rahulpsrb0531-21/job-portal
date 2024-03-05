import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import candidateServices from "../../services/candidateServices";
import { Box, Stack, Typography } from "@mui/material"
import Iconify from "../Iconify";

export default function Overview() {
    const { user } = useSelector((state) => state.auth)
    const [candidateData, setCandidateData] = useState(null)
    // console.log(candidateData)

    async function getCandidateById(data) {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            setCandidateData(res?.candidate)
        } else {
            console.log('error')
        }
    }

    useEffect(() => {
        if (user) {
            getCandidateById()
        }
    }, [user])

    return (
        <Box sx={{
            bgcolor: 'rgb(255, 255, 255)', width: { xs: "98%", lg: '60%' },
            borderRadius: 0.4, p: 1, py: 2, mt: 1,
            border: '1px solid #e0e0e0', borderRadius: "8px"
        }} >
            <Typography sx={{ fontSize: 24, fontWeight: 500, pb: 1.3 }} >What recruiter will see</Typography>
            <Box sx={{
                border: '1px solid #e0e0e0', borderRadius: "8px"
            }}>
                <Stack sx={{ p: 2 }} spacing={4} >
                    <Stack direction={'row'} alignItems={'start'} spacing={2} >
                        <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 42, height: 42 }} />
                        <Box>
                            <Typography
                                sx={{ fontSize: 24, color: 'rgb(5, 12, 38)', fontWeight: 500 }}
                            >{candidateData?.candidateName}</Typography>
                            <Typography
                                sx={{ fontSize: 14, color: 'rgb(5, 12, 38)', fontWeight: 700 }}
                            >{candidateData?.primaryRole}</Typography>
                        </Box>
                    </Stack>


                    <Stack spacing={1.4} sx={{ pl: 1 }}>
                        <Typography sx={{ fontSize: 14, color: 'rgb(145, 148, 160)' }}>Education</Typography>
                        <Stack spacing={1.4} sx={{ width: { xs: "100%", lg: "80%" } }} >
                            {
                                candidateData?.eduction?.map((data, idx) => (
                                    <Stack direction={'row'} justifyContent={'space-between'} sx={{
                                        bgcolor: 'rgb(255, 255, 255)',
                                        p: 2, borderRadius: "4px",
                                        border: "1px solid rgb(224, 224, 224)",
                                        borderLeftColor: "rgb(224, 224, 224)",
                                        borderBottomColor: "rgb(224, 224, 224)"
                                    }} >
                                        <Stack direction={'row'} spacing={1}
                                        >
                                            <Iconify icon={"fluent-mdl2:education"}
                                                sx={{ width: 32, height: 32, border: "1px solid rgb(224, 224, 224)", borderRadius: '4px' }} />
                                            <Stack>
                                                <Typography variant="profilePageTitle">
                                                    {data?.education}</Typography>
                                                {/* <Typography variant="profilePageSubText">{data?.title}s</Typography> */}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </Stack>

                    <Stack spacing={1.4} sx={{ pl: 1 }}>
                        <Typography sx={{ fontSize: 14, color: 'rgb(145, 148, 160)' }}>Experience</Typography>
                        <Stack spacing={1.4} sx={{ width: { xs: "100%", lg: "80%" } }} >
                            {
                                candidateData?.workExperience?.map((data, idx) => (
                                    <Stack direction={'row'} justifyContent={'space-between'} sx={{
                                        bgcolor: 'rgb(255, 255, 255)',
                                        p: 2, borderRadius: "4px",
                                        border: "1px solid rgb(224, 224, 224)",
                                        borderLeftColor: "rgb(224, 224, 224)",
                                        borderBottomColor: "rgb(224, 224, 224)"
                                    }} >
                                        <Stack direction={'row'} spacing={1}>
                                            <Iconify icon={"bx:building"}
                                                sx={{ width: 32, height: 32, border: "1px solid rgb(224, 224, 224)", borderRadius: '4px' }} />
                                            <Stack>
                                                <Typography variant="profilePageTitle">{data?.title}</Typography>
                                                <Typography variant="profilePageSubText">{data?.company}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </Stack>
                    <Box sx={{ pl: 1 }}>
                        <Typography
                            sx={{ fontSize: 14, color: 'rgb(145, 148, 160)' }}
                        >Skill</Typography>
                        <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap >
                            {
                                candidateData?.skills.map((data, idx) => (
                                    <Typography
                                        sx={{ bgcolor: "rgb(245, 245, 245)", p: 0.6, fontSize: 12, borderRadius: '4px', color: 'rgb(82, 87, 105)' }}
                                    >{data}</Typography>
                                ))
                            }
                            {/* <Typography sx={{ bgcolor: "rgb(245, 245, 245)", p: 0.6, fontSize: 12, borderRadius: '4px', color: 'rgb(82, 87, 105)' }} >React</Typography>
                            <Typography sx={{ bgcolor: "rgb(245, 245, 245)", p: 0.6, fontSize: 12, borderRadius: '4px', color: 'rgb(82, 87, 105)' }} >Node</Typography>
                            <Typography sx={{ bgcolor: "rgb(245, 245, 245)", p: 0.6, fontSize: 12, borderRadius: '4px', color: 'rgb(82, 87, 105)' }} >Redux</Typography> */}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}