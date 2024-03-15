import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Chip, CircularProgress, Container, Stack, Typography } from "@mui/material";
import recruiterServices from "../../services/recruiterServices";
import DeleteJobModal from "../../components/deleteJobModal";

export default function RecruiterJobs() {
    const navigate = useNavigate()
    const { user } = useSelector((user) => user.auth)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [jobId, setJobId] = useState('')
    const [jobs, setJobs] = useState([])
    const token = localStorage.getItem('access')

    useEffect(() => {
        if (user?.role !== "RECRUITER" || !token) {
            navigate('/')
        }
    }, [])

    async function getRecruiterJobs() {
        const res = await recruiterServices.getJobRecruiterById(user?._id)
        // setSubmitting(false)
        if (res && res.success) {
            setJobs(res?.data)
            setLoading(false)
        } else {
            console.log('error')
            // enqueueSnackbar('error', {
            //     variant: "error",
            //     anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            // })
        }
    }

    useEffect(() => {
        if (user) {
            getRecruiterJobs()
        }
    }, [])

    return (
        <Container>
            <DeleteJobModal open={open} setOpen={setOpen} jobId={jobId} getRecruiterJobs={getRecruiterJobs} />
            {
                loading ? (
                    <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: "88vh" }} >
                        <CircularProgress />
                    </Stack>
                ) : (
                    <Stack spacing={1} sx={{ mt: 1, mb: 6 }} >
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                            sx={{
                                border: '1px solid #e0e0e0', borderRadius: "8px",
                                p: 2,
                                backgroundImage: "linear-gradient(178deg,#fafafa,#fff 35%)"
                            }}
                        >
                            <Typography>Recruiter Job</Typography>
                            <Button variant="outlined"
                                onClick={() => navigate("/recruiter/create/job")}
                                sx={{ fontSize: 14, width: 120, fontWeight: 500 }} >+Job Post</Button>
                        </Stack>
                        <Stack spacing={1} sx={{ pb: 2 }} >
                            {
                                jobs?.map((job, idx) => (
                                    <Stack direction={{ xs: "column", lg: 'row' }} alignItems={'start'}
                                        justifyContent={'space-between'}
                                        sx={{
                                            width: { xs: "100%", lg: "60%" },
                                            border: '1px solid #e0e0e0', borderRadius: "8px",
                                            p: 1,
                                            backgroundImage: "linear-gradient(178deg,#fafafa,#fff 35%)"
                                        }}
                                    >
                                        <Stack sx={{ width: { xs: "100%", lg: "60%" } }} flexWrap={"wrap"} spacing={1.4} >
                                            <Typography sx={{ fontSize: 16, fontWeight: 700 }} >{job?.title}</Typography>
                                            {/* <Typography sx={{ fontSize: 12, }} >{job?.jobDescription}</Typography> */}
                                            <Typography sx={{ fontSize: 12 }}
                                                dangerouslySetInnerHTML={{ __html: job?.jobDescription }} />
                                            <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap
                                            >
                                                <Typography sx={{ fontSize: 14, fontWeight: 700 }} >Skills:</Typography>
                                                {
                                                    job?.skills.map((skill, idx) => (
                                                        <Chip label={skill} key={idx} sx={{ borderRadius: "4px" }}
                                                        // onDelete={() => deleteSkill(idx)}
                                                        />
                                                    ))
                                                }
                                            </Stack>
                                        </Stack>
                                        <Stack spacing={1} direction={{ xs: "row", sm: "row", md: "column", lg: "column" }}
                                            sx={{ pt: { xs: 2, sm: 2, md: 0, lg: 0 } }}
                                        >
                                            <Typography
                                                onClick={() => navigate('/recruiter/edit/job', { state: job })}
                                                sx={{
                                                    color: "rgb(20, 63, 205)", fontSize: 14,
                                                    fontWeight: 500,
                                                    "&:hover": {
                                                        textDecoration: 'underline', cursor: "pointer"
                                                    }
                                                }}>Edit</Typography>
                                            <Typography
                                                onClick={() => { setJobId(job?._id); setOpen(true) }}
                                                sx={{
                                                    color: "Red", fontSize: 14,
                                                    fontWeight: 500,
                                                    "&:hover": {
                                                        textDecoration: 'underline', cursor: "pointer"
                                                    }
                                                }}>Remove</Typography>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </Stack>
                )
            }
        </Container>
    )
}