import React, { useEffect, useState } from "react"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Divider, Stack, Tab, Typography } from "@mui/material";
import OverView from "../components/company/overview";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import candidateServices from "../services/candidateServices";
import applicationServices from "../services/applicationServices";
import { useSnackbar } from "notistack";

export default function JobDetails() {
    const { state } = useLocation()
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useSelector((state) => state.auth)
    // console.log(user)
    // console.log(state)
    // const [value, setValue] = useState('1')
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // }
    // async function getCandidateById() {
    //     const id = user?._id
    //     const res = await candidateServices.getCandidateById(id)
    //     if (res && res.success) {
    //         // enqueueSnackbar(res?.message, {
    //         //     variant: "success",
    //         //     anchorOrigin: { horizontal: "right", vertical: "top" },
    //         //     autoHideDuration: 1000
    //         // })
    //     } else {
    //         enqueueSnackbar(res?.data, {
    //             variant: "error",
    //             anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
    //         })
    //     }
    // }

    // useEffect(() => {
    //     if (user) {
    //         getCandidateById()
    //     }
    // }, [user])

    async function createApplication() {
        const data = {
            candidateId: user?._id,
            jobId: state?._id,
            about: "Testing Application"
        }
        // console.log(data)
        const res = await applicationServices.create(data)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }


    const jobBasicDetails = [
        {
            name: 'Job Overview',
            value: state?.jobOverview[0]
        },
        {
            name: 'Job Qualifications',
            value: state?.qualifications[0]
        },
        {
            name: 'Job jobRequirements',
            value: state?.jobRequirements[0]
        },
        {
            name: 'Job jobResponsibilities',
            value: state?.jobResponsibilities[0]
        },
    ]

    return (
        <Stack mt={6} spacing={2} >
            <Stack direction={'row'} alignItems={'center'} justifyContent={"space-between"} >
                <Stack direction={'row'}>
                    <Box
                        component={'img'}
                        src="https://photos.wellfound.com/startups/i/8360909-783a7fbc4f0ae14f7a0c656bce23c8fa-medium_jpg.jpg?buster=1622336656"
                        alt='brand'
                        sx={{ width: 80, objectFit: 'contain' }}
                    />
                    <Stack>
                        <Typography variant="companyTitle" >{state?.company?.companyName}</Typography>
                        <Typography variant="companySubText" >{state?.company?.oneLinePitch}</Typography>
                    </Stack>
                </Stack>
                <Button size="small" variant="outlined" type="submit"
                    sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                >Save</Button>
            </Stack>
            <Divider />
            <Stack direction={'row'} >
                {/* 1 */}
                <Stack direction={'row'} sx={{ width: '78%' }} >
                    <Box sx={{ width: '70%' }} >
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} >
                            <Typography>{state?.title}</Typography>
                        </Stack>
                        <Stack spacing={1}>
                            {
                                jobBasicDetails?.map((data, idx) => (
                                    <>
                                        <Typography>{data?.name}</Typography>
                                        <Typography sx={{ fontSize: 12 }}
                                            dangerouslySetInnerHTML={{ __html: data?.value }} />
                                    </>
                                ))
                            }
                        </Stack>
                        <Box>
                            <Typography>Technologies</Typography>
                            <Stack direction={'row'} spacing={1} >
                                {
                                    state?.skills?.map((data, idx, row) => (
                                        <Typography sx={{ fontSize: 14, fontWeight: 700 }} >{data} {idx + 1 === row.length ? "" : ","}</Typography>
                                    ))
                                }
                            </Stack>
                        </Box>
                        <Box>
                            <Typography>Location</Typography>
                            <Stack direction={'row'} spacing={1} >
                                {
                                    state?.location?.map((data, idx, row) => (
                                        <Typography sx={{ fontSize: 14, fontWeight: 700 }} >{data} {idx + 1 === row.length ? "" : ","}</Typography>
                                    ))
                                }
                            </Stack>
                        </Box>
                    </Box>
                    <Box sx={{
                        // bgcolor: 'blue', 
                        width: '30%'
                    }} >
                        <Stack direction={'row'} alignItems={'center'} spacing={2} >
                            <Button variant="outlined"
                                sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                            >Save</Button>
                            <Button variant="blackButton"
                                onClick={() => createApplication()}
                                sx={{ fontSize: 12, width: "110px", height: "30px", bgcolor: 'black', fontWeight: 500, }}
                            >Apply</Button>
                        </Stack>
                        <Box>
                            <Typography>Job Type</Typography>
                            <Typography>{state?.employmentType}</Typography>
                        </Box>
                        <Box>
                            <Typography>Visa sponsorship</Typography>
                            <Typography>{state?.visaSponsorship ? "Available" : "Not Available"}</Typography>
                        </Box>
                        {/* <Box>
                            <Typography>Relocation</Typography>
                            <Typography>{state?.employmentType}</Typography>
                        </Box> */}
                    </Box>
                </Stack>
                {/* 2 */}
                {/* 
                <Stack sx={{ width: '22%', bgcolor: 'gold' }} >
                    <Typography>lfhdss</Typography>
                </Stack> */}

            </Stack>
        </Stack>
    )
}