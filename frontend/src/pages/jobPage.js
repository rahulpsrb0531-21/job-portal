import React, { useEffect, useState } from 'react'
import { NavLink as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Button, Tab, Stack, Typography } from "@mui/material"
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Overview from '../components/profile/overview'
import { BrowseAllJobs } from '../components/job/browseAllJobs'
import jobServices from '../services/jobServices'
import { useSnackbar } from 'notistack'
import Iconify from '../components/Iconify'
import { useSelector } from 'react-redux'
import SavedJobPage from '../components/job/savedJobcard'

export default function JobPage() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [value, setValue] = useState('1')
    const [jobsData, setJobsData] = useState([])
    const { user } = useSelector((state) => state.auth)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    useEffect(() => {
        getJobs()
    }, [])

    async function getJobs() {
        const res = await jobServices.getAllJobs()
        if (res && res.success) {
            // console.log("res>>>>>>>>>>", res)
            setJobsData(res?.job)
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    async function savedJob(job) {
        const data = {
            candidateId: user?._id,
            job
        }
        const res = await jobServices.savedJob(data)
        // console.log(res)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1300
            })
            // navigate()
            setValue('2')
        } else {
            enqueueSnackbar("error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1300
            })
        }
    }

    return (
        <Box sx={{ width: '100%', pt: 2 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Browse all " value="1" />
                        <Tab label="Saved" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Stack spacing={1} >
                        {
                            jobsData?.map((data, idx) => (
                                <Stack sx={{
                                    border: '1px solid #e0e0e0', borderRadius: "8px",
                                    p: 2,
                                    backgroundImage: "linear-gradient(178deg,#fafafa,#fff 35%)"
                                }} >
                                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ px: 1 }} >
                                        <Stack direction={'row'} spacing={1} >
                                            <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 42, height: 42 }} />
                                            <Box>
                                                <Typography
                                                    // component={RouterLink}
                                                    // to={`/company/${data?.companyName}`, }
                                                    onClick={() => navigate(`/company/${data?.companyName}`,
                                                        { state: data })}
                                                    sx={{ color: 'rgb(14, 17, 17)', fontSize: 18, fontWeight: 500, cursor: "pointer" }}
                                                >{data?.companyName}</Typography>
                                                <Typography
                                                    sx={{ fontSize: 14 }}
                                                >{data?.companyDescription}</Typography>
                                                {/* <Typography
                                                    sx={{ fontSize: 11, fontWeight: 500, color: 'rgb(158, 158, 158)' }}
                                                >1-10 EMPLOYEES</Typography> */}
                                            </Box>
                                        </Stack>
                                        <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 16, height: 16, transform: "rotate(180deg)" }} />
                                    </Stack>
                                    <Stack spacing={0.4} sx={{
                                        borderRadius: '4px', p: 2
                                    }} >
                                        {
                                            data?.jobs.map((job, idx) => (
                                                <Stack direction={'row'} justifyContent={'space-between'} sx={{
                                                    p: 1, border: "1px solid rgb(238, 238, 238)", borderRadius: '4px',
                                                    ":hover": {
                                                        border: "1px solid rgb(5, 12, 38, 0.4)"
                                                    }
                                                }} >
                                                    <Box>
                                                        <Stack direction={'row'} spacing={2}>
                                                            <Typography
                                                                sx={{ fontSize: 14, fontWeight: 500, color: 'rgb(14, 17, 17)' }}
                                                            >{job?.title}</Typography>
                                                            <Typography
                                                                sx={{ fontSize: 14, color: 'rgb(82, 87, 105)' }}
                                                            >{job?.location}</Typography>
                                                            <Typography sx={{ fontSize: 14, color: 'rgb(82, 87, 105)' }}>{job?.salaryRange?.min}- {job?.salaryRange?.max}</Typography>
                                                        </Stack>
                                                        <Typography
                                                            sx={{ fontSize: 14, color: 'rgb(82, 87, 105)' }}
                                                        >{job?.salaryCurrency?.symbol}{job?.salaryRange?.minimum} - {job?.salaryCurrency?.symbol}{job?.salaryRange?.maximum}</Typography>
                                                    </Box>
                                                    <Stack direction={'row'} spacing={1} >
                                                        <Button size="small" variant="outlined"
                                                            sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                                                            onClick={() => savedJob(job)}
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button variant="blackButton"
                                                            onClick={() => navigate(`/jobs/${job?.title}`, { state: job })}
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
                    </Stack>
                </TabPanel>
                <TabPanel value="2" >
                    <SavedJobPage />
                </TabPanel>
            </TabContext>
        </Box>
    );
}