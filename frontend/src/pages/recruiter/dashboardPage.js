import { useState, useEffect } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import recruiterServices from "../../services/recruiterServices";
import { useSelector } from "react-redux";


export default function DashboardPage() {
    const navigate = useNavigate()
    const [applicant, setApplicant] = useState([])
    const [jobs, setJobs] = useState([])
    const { user } = useSelector((user) => user.auth)
    const token = localStorage.getItem('access')

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    async function getRecruiterJobs(id) {
        const res = await recruiterServices.getJobRecruiterById(id)
        // setSubmitting(false)
        if (res && res.success) {
            // console.log('res', res)
            setJobs(res?.data)
        } else {
            console.log('error')
            // enqueueSnackbar('error', {
            //     variant: "error",
            //     anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            // })
        }
    }

    async function getapplicantJob() {
        const id = user?._id
        const res = await recruiterServices.getApplicants(id)
        if (res && res.success) {
            setApplicant(res?.applicants)
        } else {
        }
    }

    useEffect(() => {
        if (user) {
            getRecruiterJobs(user?._id)
            getapplicantJob()
        }
    }, [])

    return (
        <Box>
            <Stack direction={'row'} spacing={4} alignItems={'center'} justifyContent={'center'} sx={{ pt: 10 }} >
                <Stack sx={{ border: "0.5px solid #ccc", width: 200, p: 2, textAlign: 'center', borderRadius: "4px" }} >
                    <Typography variant="companyTitle" >Jobs</Typography>
                    <Divider />
                    <Typography variant="companySubText">Total : {jobs?.length}</Typography>
                </Stack>
                <Stack sx={{ border: "0.5px solid #ccc", width: 200, p: 2, textAlign: 'center', borderRadius: "4px" }} >
                    <Typography variant="companyTitle" >Applicant</Typography>
                    <Divider />
                    <Typography variant="companySubText">Total : {applicant?.length}</Typography>
                </Stack>
            </Stack>
        </Box>
    )
}