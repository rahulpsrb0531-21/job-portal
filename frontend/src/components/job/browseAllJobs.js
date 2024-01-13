import { Box, Button, Stack, Typography } from "@mui/material"
import Iconify from "../Iconify"


export function BrowseAllJobs({ data }) {
    console.log(data)
    const datas = [
        {
            company: "Qiro Finance",
            dec: "Qiro is  an private finance",
            companySize: {
                min: 1, max: 10
            },
            job: [
                {
                    title: 'Web Full Stack developer',
                    location: "Remote",
                    salaryRange: {
                        min: '60k', max: "90k"
                    }
                },
                {
                    title: 'Frontend developer',
                    location: "Remote",
                    salaryRange: {
                        min: '60k', max: "90k"
                    }
                },
                {
                    title: 'Backend developer',
                    location: "Remote",
                    salaryRange: {
                        min: '60k', max: "90k"
                    }
                },
            ]
        }
    ]
    return (
        <Box >
            {
                datas?.map((item, idx) => (
                    <Stack sx={{ border: '1px solid #e0e0e0', borderRadius: "8px" }} >
                        <Stack direction={'row'} justifyContent={'space-between'} sx={{ px: 1 }} >
                            <Stack direction={'row'} spacing={1} >
                                <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 42, height: 42 }} />
                                <Box>
                                    <Typography
                                        sx={{ color: 'rgb(14, 17, 17)', fontSize: 18, fontWeight: 500 }}
                                    >{item?.company}</Typography>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                    >{item?.dec}</Typography>
                                    <Typography
                                        sx={{ fontSize: 11, fontWeight: 500, color: 'rgb(158, 158, 158)' }}
                                    >1-10 EMPLOYEES</Typography>
                                </Box>
                            </Stack>
                            <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 16, height: 16, transform: "rotate(180deg)" }} />
                        </Stack>
                        <Stack spacing={0.4} sx={{
                            // border: "1px solid rgb(238, 238, 238)", 
                            borderRadius: '4px', p: 2
                        }} >
                            {
                                item?.job.map((job, idx) => (
                                    <Stack direction={'row'} justifyContent={'space-between'} sx={{
                                        p: 1, border: "1px solid rgb(238, 238, 238)", borderRadius: '4px',
                                        ":hover": {
                                            border: "1px solid rgb(5, 12, 38, 0.4)"
                                        }
                                    }} >
                                        <Stack direction={'row'} spacing={2}
                                        // sx={{ p: 1, border: "1px solid rgb(238, 238, 238)", borderRadius: '4px' }}
                                        >
                                            <Typography
                                                sx={{ fontSize: 14, fontWeight: 500, color: 'rgb(14, 17, 17)' }}
                                            >{job?.title}</Typography>
                                            <Typography
                                                sx={{ fontSize: 14, color: 'rgb(82, 87, 105)' }}
                                            >{job?.location}</Typography>
                                            <Typography sx={{ fontSize: 14, color: 'rgb(82, 87, 105)' }}>{job?.salaryRange?.min}- {job?.salaryRange?.max}</Typography>
                                        </Stack>
                                        <Stack direction={'row'} spacing={1} >
                                            <Button size="small" variant="outlined"
                                                sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                                            >
                                                Save
                                            </Button>
                                            <Button variant="blackButton"
                                                sx={{ fontSize: 12, width: "110px", height: "30px", bgcolor: 'black', fontWeight: 500, }}
                                            >
                                                Learn more
                                            </Button>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </Stack>
                ))
            }
        </Box>
    )
}