import React, { useEffect, useState } from 'react'
import { Box, Stack, Tab, Typography } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { useNavigate } from 'react-router-dom'
import TabPanel from '@mui/lab/TabPanel'
import Overview from '../components/profile/overview'
import { BrowseAllJobs } from '../components/job/browseAllJobs'
import Iconify from '../components/Iconify'
import candidateServices from '../services/candidateServices'
import { useSelector } from 'react-redux'

export default function AppliedPage() {
    const [value, setValue] = useState('1')
    const navigate = useNavigate()
    const [appliedJob, setAppliedJob] = useState([])
    const token = localStorage.getItem('access')
    const { user } = useSelector((state) => state.auth)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }


    async function getAppliedJob() {
        const id = user?._id
        const res = await candidateServices.getAppliedJobCandidateById(id)
        if (res && res.success) {
            setAppliedJob(res?.appliedJobs)
        } else {
        }
    }
    useEffect(() => {
        getAppliedJob()
    }, [user])

    useEffect(() => {
        if (user?.role !== "CANDIDATE" && token) {
            navigate('/login')
        }
    }, [])
    return (
        <Box sx={{ width: '100%', pt: 2 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Ongoing " value="1" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Stack spacing={1} >
                        {
                            appliedJob?.map((data, idx) => {
                                console.log(data)
                                return (
                                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={"start"}
                                        sx={{
                                            width: "60%",
                                            border: '1px solid #e0e0e0', borderRadius: "4px", p: 1,
                                            ":hover": { boxShadow: 1 }
                                        }}
                                    >
                                        <Stack direction={'row'} spacing={1} >
                                            {/* <Typography>Logo</Typography> */}
                                            {/* <Box
                                            component={'img'}
                                            src={data?.job?.company?.companyLogo}
                                            alt={data?.job?.company?.companyName}
                                            width={100}
                                            height={100}
                                        /> */}
                                            <Box>
                                                <Typography
                                                    sx={{ fontSize: 20, fontWeight: 500 }}
                                                >{data?.job?.company?.companyName}</Typography>
                                                <Typography
                                                    sx={{ fontSize: 16, color: 'rgb(97, 97, 97)' }}
                                                >{data?.job?.title}</Typography>
                                                <Typography
                                                    sx={{ fontSize: 12, fontWeight: 600 }}
                                                >{data?.status}</Typography>
                                            </Box>
                                        </Stack>
                                        <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 16, height: 16, transform: "rotate(180deg)" }} />
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                </TabPanel>
            </TabContext>
        </Box>
    )
}