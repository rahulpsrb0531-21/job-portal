import React, { useEffect, useState } from 'react'
import { Box, Container, Stack, Tab, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import Iconify from '../../components/Iconify'
import recruiterServices from '../../services/recruiterServices'

export default function ApplicantPage() {
    const [value, setValue] = useState('1')
    const [applicantJob, setApplicantJob] = useState([])
    console.log(applicantJob)
    const { user } = useSelector((state) => state.auth)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }


    async function getapplicantJob() {
        const id = user?._id
        const res = await recruiterServices.getApplicants(id)
        // console.log(res)
        if (res && res.success) {
            setApplicantJob(res?.applicants)
        } else {
        }
    }
    useEffect(() => {
        getapplicantJob()
    }, [user])
    return (
        <Container>
            <Box sx={{ width: '100%', pt: 6 }}>
                <Stack spacing={1} >
                    {
                        applicantJob?.map((data, idx) => {
                            console.log(data)
                            return (
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={"start"}
                                    sx={{
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
                                            >{data?.name}</Typography>
                                            <Typography
                                                sx={{ fontSize: 20, fontWeight: 500 }}
                                            >{data?.email}</Typography>
                                            <Typography
                                                sx={{ fontSize: 16, color: 'rgb(97, 97, 97)', bgcolor: "blue", width: 70, textAlign: 'center', p: 0.2, borderRadius: '8px' }}
                                            >{"Resume"}</Typography>
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
            </Box>
        </Container>
    )
}