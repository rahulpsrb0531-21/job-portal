import React, { useEffect, useState } from 'react'
import { Box, Button, Tab, Stack, Typography, Divider } from "@mui/material"
import { useSnackbar } from 'notistack'
import Iconify from '../Iconify';
import candidateServices from '../../services/candidateServices';
import { useSelector } from 'react-redux';
import jobServices from '../../services/jobServices'

export default function SavedJobPage() {
    // console.log('Here>>>>>>>>>>>')
    // const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    // const [value, setValue] = useState('1')
    const [candidateData, setCandidateData] = useState([])
    const { user } = useSelector((state) => state.auth)

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // }
    // useEffect(() => {
    //     getJobs()
    // }, [])

    async function getCandidateById() {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            // console.log('candidate', res?.candidate)
            setCandidateData(res?.candidate)
        } else {
            enqueueSnackbar("something went wrong ", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }
    useEffect(() => {
        getCandidateById()
    }, [user])
    // console.log(candidate)

    async function deleteSavedJob(job) {
        const data = {
            candidateId: user?._id,
            job
        }
        const res = await jobServices.deleteSavedJob(data)
        console.log(res)
        if (res && res.success) {
            getCandidateById()
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1300
            })
            // navigate()
            // setValue('2')
        } else {
            enqueueSnackbar("error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1300
            })
        }
    }

    return (
        <Box sx={{ width: '100%', pt: 1 }}>
            <Stack spacing={1} >
                {
                    candidateData?.jobsSaved?.map((data, idx) => (
                        <Stack sx={{
                            width: { xs: "96%", lg: "60%" },
                            border: '1px solid #e0e0e0', borderRadius: "8px",
                            p: 2,
                            backgroundImage: "linear-gradient(178deg,#fafafa,#fff 35%)"
                        }} >
                            <Stack direction={"row"} alignItems={'center'}
                                justifyContent={'space-between'}
                            >
                                <Box>
                                    <Typography
                                        // onClick={() => navigate(`/company/${data?.company?.companyName}`,
                                        //     { state: data })}
                                        sx={{ color: 'rgb(14, 17, 17)', fontSize: 18, fontWeight: 500, cursor: "pointer" }}
                                    >{data?.company?.companyName}</Typography>
                                    <Typography
                                        sx={{ fontSize: 12 }}
                                    >{data?.company?.oneLinePitch}</Typography>
                                </Box>
                            </Stack>
                            <Divider />
                            <Typography sx={{ fontSize: 14 }} >{data?.title}</Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 700 }} >{data?.salaryCurrency?.symbol}{data?.salaryRange?.minimum} - {data?.salaryCurrency?.symbol}{data?.salaryRange?.maximum}</Typography>
                            <Stack direction={'row'} spacing={0.4} alignItems={'center'} >
                                <Iconify icon={"carbon:location"} sx={{ width: 16 }} />
                                {
                                    data?.location?.map((data, idx, row) => (
                                        <Typography sx={{ fontSize: 14, fontWeight: 700 }} >{data} {idx + 1 === row.length ? "" : ","}</Typography>
                                    ))
                                }
                            </Stack>
                            <Stack direction={'row'} spacing={1} sx={{ mt: 1 }} >
                                {/* <Button variant="blackButton"
                                    // onClick={() => navigate(`/jobs/${data?.title}`, { state: data })}
                                    sx={{ fontSize: 12, width: "110px", height: "30px", bgcolor: 'black', fontWeight: 500, }}
                                >
                                    Apply
                                </Button> */}
                                <Button variant="outlined"
                                    onClick={() => deleteSavedJob(data)}
                                    sx={{ fontSize: 12, width: "110px", height: "30px", fontWeight: 500, }}
                                >
                                    Remove
                                </Button>
                            </Stack>
                        </Stack>
                    ))
                }
            </Stack>
        </Box>
    );
}