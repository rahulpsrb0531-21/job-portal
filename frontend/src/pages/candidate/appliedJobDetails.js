import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";



export default function AppliedJobDetails() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const token = localStorage.getItem('access')
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user?.role !== "CANDIDATE" && !token) {
            navigate('/')
        }
    }, [])

    const data = [
        {
            title: "Job Overview",
            value: state?.jobOverview[0]
        },
        {
            title: "Job Requirements",
            value: state?.jobRequirements[0]
        },
        {
            title: "Job Responsibilities",
            value: state?.jobResponsibilities[0]
        },
        {
            title: "Qualifications",
            value: state?.qualifications[0]
        },
    ]
    return (
        <Stack
            sx={{
                width: { xs: "96%", lg: '60%' }, borderRadius: "4px", p: { xs: 1, lg: 4 }, ml: { xs: 0, lg: 2 }, mt: 1,
                border: "1px solid rgb(238, 238, 238)",
                bgcolor: '#f7f7f7', boxShadow: "0px 2px 6px #0000000A"
            }}
        >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} >
                <Typography sx={{ fontSize: 18, fontWeight: 600 }} >{state?.title}</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 400, border: "1px solid", p: 0.2, px: 1, borderRadius: "8px", bgcolor: "#4BB543", color: "white" }} >Applied</Typography>
            </Stack>
            <Stack spacing={2} my={2} >
                {
                    data?.map((data, idx) => (
                        <Stack>
                            <Typography sx={{ fontSize: 18, fontWeight: 600 }} >{data?.title}</Typography>
                            <Typography sx={{ fontSize: 14 }}
                                dangerouslySetInnerHTML={{ __html: data?.value }} />
                        </Stack>
                    ))
                }
            </Stack>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Job Type - {state?.employmentType}</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >{state?.salaryCurrency?.symbol}{state?.salaryRange?.minimum} - {state?.salaryCurrency?.symbol}{state?.salaryRange?.maximum}</Typography>
        </Stack>
    )
}