import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Chip, Container, Stack, Typography } from "@mui/material";
import recruiterServices from "../../services/recruiterServices";

export default function RecruiterJobs() {
    const navigate = useNavigate()
    const { user } = useSelector((user) => user.auth)
    const [jobs, setJobs] = useState([])

    async function getRecruiterJobs(id) {
        const res = await recruiterServices.getJobRecruiterById(id)
        // setSubmitting(false)
        if (res && res.success) {
            console.log('res', res)
            setJobs(res?.data)
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
            getRecruiterJobs(user?._id)
        }
    }, [])
    console.log(jobs)

    return (
        <Container>
            <Stack spacing={1} sx={{ mt: 4 }} >
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
                        sx={{ fontSize: 14, width: "114px", height: "30px", fontWeight: 500 }} >+Job Post</Button>
                </Stack>

                <Stack spacing={1} >
                    {
                        jobs?.map((job, idx) => (
                            <Stack sx={{
                                width: "60%",
                                border: '1px solid #e0e0e0', borderRadius: "8px",
                                p: 2,
                                backgroundImage: "linear-gradient(178deg,#fafafa,#fff 35%)"
                            }}>
                                <Typography sx={{ fontSize: 16, fontWeight: 700 }} >{job?.title}</Typography>
                                <Typography sx={{ fontSize: 12 }}
                                    dangerouslySetInnerHTML={{ __html: job?.jobOverview[0] }} />
                                <Stack direction={'row'} alignItems={'center'} spacing={0.8} >
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
                        ))
                    }
                </Stack>

            </Stack>
        </Container>
    )
}