import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Stack, Tab, Typography } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import { useNavigate } from 'react-router-dom'
import TabPanel from '@mui/lab/TabPanel'
import Iconify from '../../components/Iconify'
import candidateServices from '../../services/candidateServices'
import { useSelector } from 'react-redux'

// asserts
import Men from '../../assets/Creative-team-rafiki.svg'
import notAcceptedDot from '../../assets/circle-dot-not-accept.svg'
import pendingDot from '../../assets/circle-dot-pending.svg'
import acceptedDot from '../../assets/circle-dot-accepted.svg'
import blankUser from '../../assets/nopic.webp'
import moment from "moment"
import { formatDateWithMonth, getApplicationAgo } from "../../utils/function"

export default function AppliedPage() {
    const [value, setValue] = useState('1')
    const navigate = useNavigate()
    const [appliedJob, setAppliedJob] = useState([])
    const [loading, setLoading] = useState(true)
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
            setLoading(false)
        } else {
        }
    }
    useEffect(() => {
        getAppliedJob()
    }, [user])

    useEffect(() => {
        if (user?.role !== "CANDIDATE" && !token) {
            navigate('/')
        }
    }, [])
    return (
        <Box sx={{ width: '100%', pt: 2 }}>
            {
                loading === true ? (
                    <Box>
                        <Stack justifyContent='center' alignItems='center' minHeight={'80vh'}>
                            <CircularProgress />
                        </Stack>
                    </Box>

                ) : (
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Applied Jobs" value="1" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{ "&.MuiTabPanel-root": { p: 0 } }} value="1">
                            <Stack spacing={2.8} mt={4} >
                                {
                                    appliedJob?.map((data, idx) => (
                                        <Stack
                                            sx={{
                                                borderRadius: "8px",
                                                p: 1,
                                                borderBottom: "1px solid #eee"
                                                // bgcolor: "red",
                                                // height: 140

                                            }}
                                            direction={"row"}
                                            spacing={2}
                                        >
                                            <Box sx={{ width: 60, maxHeight: 60, bgcolor: 'red', borderRadius: "4px" }} />
                                            <Stack direction={'row'}
                                                justifyContent={'space-between'}
                                                sx={{
                                                    height: 142
                                                }}
                                            >
                                                <Box>
                                                    <Stack sx={{ pb: 1.6 }} >
                                                        <Typography
                                                            sx={{
                                                                fontSize: 20, fontWeight: 600,
                                                                lineHeight: "20px"
                                                            }}
                                                        >{data?.job?.title}</Typography>
                                                        <Typography variant="profilePageSubText"
                                                            sx={{ textTransform: "capitalize" }}
                                                        >{data?.job?.company?.companyName}</Typography>
                                                        <Box>

                                                            {
                                                                data?.job?.location?.map((data, idx, row) => (
                                                                    <Typography variant="profilePageSubText"
                                                                        sx={{ textTransform: "capitalize" }} >{data} {idx + 1 === row.length ? "" : ","}</Typography>
                                                                ))
                                                            }
                                                        </Box>
                                                    </Stack>
                                                    <Stack direction={'row'}
                                                        alignItems={"center"}
                                                        spacing={0.6}
                                                    >
                                                        <Box
                                                            component={'img'}
                                                            src={data?.status === "Pending" ? pendingDot :
                                                                data?.status === "Accepted" ? acceptedDot :
                                                                    data?.status === "Not Accepted" ? notAcceptedDot : ""
                                                            }
                                                            sx={{ width: 8 }}
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontSize: 12,
                                                                fontWeight: 700,
                                                                textTransform: "capitalize",
                                                                color: "rgb(5, 12, 38)"
                                                            }}
                                                        >{data?.status}</Typography>
                                                        <Typography
                                                            sx={{
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                color: 'rgb(158, 158, 158)'
                                                            }}
                                                        >{formatDateWithMonth(data?.created_at)}</Typography>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    ))
                                }
                            </Stack>
                        </TabPanel>
                    </TabContext>
                )
            }
        </Box >
    )
}