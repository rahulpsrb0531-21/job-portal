import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Stack, Tab, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import Iconify from '../../components/Iconify'
import recruiterServices from '../../services/recruiterServices'
import { useNavigate } from 'react-router-dom'
import ApplicantApproveModal from '../../components/applicantApproveModal'
import { server } from '../../utils/server'

export default function ApplicantPage() {
    const [value, setValue] = useState('1')
    const navigate = useNavigate()
    const token = localStorage.getItem('access')
    const { user } = useSelector((state) => state.auth)
    const [applicantJob, setApplicantJob] = useState([])

    const [applicationId, setApplicationId] = useState('')
    const [job, setjob] = useState({})
    const [candidate, setCandidate] = useState({})
    const [open, setOpen] = useState(false)


    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        if (user?.role !== "RECRUITER" && !token) {
            navigate('/')
        }
    }, [])


    async function getapplicantJob() {
        const id = user?._id
        const res = await recruiterServices.getApplicants(id)
        if (res && res.success) {
            setApplicantJob(res?.applicants)
        } else {
        }
    }
    useEffect(() => {
        getapplicantJob()
    }, [user])

    const handleDownload = async (candidate) => {
        // console.log("cadidate", candidate)
        const id = candidate?._id
        try {
            const response = await server.get(`api/candidate/upload/resume/${id}/${"resume"}`, { responseType: 'blob' })
            console.log("response", response)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${candidate?.candidateName} ${candidate?.candidateName}.pdf`)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    }

    return (
        <Container>
            <ApplicantApproveModal
                open={open}
                setOpen={setOpen}
                candidate={candidate}
                job={job}
                applicationId={applicationId}
                getapplicantJob={getapplicantJob}
            />
            <Box sx={{ width: '100%', pt: 6 }}>
                {
                    applicantJob?.length === 0 ? (
                        <Box sx={{
                            width: '60%',
                            border: '1px solid #e0e0e0',
                            borderRadius: "4px", p: 1,
                        }} >
                            <Typography sx={{ fontSize: 26, fontWeight: 700 }} >No applicant applied</Typography>
                        </Box>
                    ) : (
                        <Box>
                            <Typography>Applicants</Typography>
                            <Stack spacing={1} >
                                {
                                    applicantJob?.map((data, idx) => {
                                        // console.log(data?._id)
                                        return (
                                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={"start"}
                                                sx={{
                                                    width: { xs: "100%", lg: "40%" },
                                                    border: '1px solid #e0e0e0', borderRadius: "4px", p: 2,
                                                    ":hover": { boxShadow: 1 }
                                                }}
                                            >
                                                <Stack spacing={1} >
                                                    <Box>
                                                        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{data?.name}</Typography>
                                                        <Typography sx={{ fontSize: 14, fontWeight: 400 }}>{data?.email}</Typography>

                                                    </Box>
                                                    {
                                                        data?.status === 'approve' && (
                                                            <Stack direction={'row'} alignItems={'center'} spacing={2} onClick={() => handleDownload(data?.candidate)}
                                                                sx={{
                                                                    border: '0.4px solid #ccc', width: '100%',
                                                                    p: 0.6, borderRadius: '4px'
                                                                }}
                                                            >
                                                                <Iconify icon={"ph:file-pdf-bold"} sx={{ width: { xs: 22, lg: 22 }, color: "blue" }} />
                                                                <Typography
                                                                    sx={{ fontSize: 14, fontWeight: 700, cursor: "pointer" }}
                                                                // onClick={handleDownload}
                                                                >Download {data?.candidate?.candidateName}</Typography>
                                                            </Stack>
                                                        )
                                                    }
                                                    {
                                                        data?.sentApproveRequest === true ? (
                                                            <Button
                                                                variant="contained"
                                                                sx={{
                                                                    fontSize: 14, width: "80px", height: "30px",
                                                                    bgcolor: '#00FF7F',
                                                                    fontWeight: 900,
                                                                    color: "white",
                                                                    ":hover": {
                                                                        bgcolor: '#00FF7F',
                                                                    }
                                                                }}

                                                            >
                                                                {data?.status}
                                                            </Button>
                                                        ) : (
                                                            <Button variant="blackButton"
                                                                sx={{ fontSize: 12, width: "176px", height: "30px", bgcolor: 'black', fontWeight: 500, }}
                                                                onClick={() => {
                                                                    setCandidate(data?.candidate);
                                                                    setjob(data?.job);
                                                                    setApplicationId(data?._id);
                                                                    setOpen(true)
                                                                }}
                                                            >
                                                                send Request to Admin
                                                            </Button>
                                                        )
                                                    }
                                                </Stack>
                                                <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 16, height: 16, transform: "rotate(180deg)" }} />
                                            </Stack>
                                        )
                                    })
                                }
                            </Stack>
                        </Box>
                    )
                }
            </Box>
        </Container>
    )
}