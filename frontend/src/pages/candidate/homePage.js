import { Box, Divider, Link, Stack, Typography } from "@mui/material"
import Iconify from "../../components/Iconify"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import candidateServices from "../../services/candidateServices"
import { useSnackbar } from "notistack"

const HomePage = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useSelector((state) => state.auth)
    const [candidate, setCandidate] = useState({})
    const token = localStorage.getItem('access')
    useEffect(() => {
        if (user) {
            getCandidateById()
        }
    }, [])

    useEffect(() => {
        if (user?.role !== "CANDIDATE" && !token) {
            navigate('/')
        }
    }, [token])

    async function getCandidateById(data) {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            setCandidate(res?.candidate)
        } else {
            enqueueSnackbar('Something went wrong', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    return (
        <Stack sx={{
            bgcolor: 'rgb(255, 255, 255)', width: { xs: '96%', lg: '60%' },
            borderRadius: 0.4, p: 1, pt: 4
        }} spacing={1} >
            {/* <Typography sx={{ fontSize: 16, fontWeight: 500, textAlign: 'right' }} >Profile last updated on: Jan 9, 2024</Typography> */}
            <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}
                sx={{ width: '100%', border: '1px solid #e0e0e0', borderRadius: "8px", p: 1 }}
            >
                <Stack direction={'row'} alignItems={'start'} >
                    <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 42, height: 42 }} />
                    <Stack spacing={1} >
                        <Box>
                            <Typography
                                sx={{ fontSize: 24, color: 'rgb(5, 12, 38)', fontWeight: 500 }}
                            >{candidate?.candidateName}</Typography>
                            <Typography
                                sx={{ fontSize: 14, color: 'rgb(5, 12, 38)', fontWeight: 700 }}
                            >{candidate?.primaryRole}</Typography>
                        </Box>
                        <Stack direction={'row'} alignItems={'center'} spacing={2} >
                            <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'rgb(5, 12, 38)', width: 60 }} >Email</Typography>
                            <Typography sx={{ fontSize: 14, color: 'rgb(5, 12, 38)' }} >{candidate?.email}</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={2} >
                            <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'rgb(5, 12, 38)', width: 60 }} >Location</Typography>
                            <Typography sx={{ fontSize: 14, color: 'rgb(5, 12, 38)' }} >{candidate?.location}</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={2} >
                            <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'rgb(5, 12, 38)', width: 60 }} >Website</Typography>
                            <Link
                                target="_blank"
                                href={candidate?.website}
                                rel="noopener noreferrer"
                                sx={{
                                    fontSize: 12, color: 'blue',
                                    textDecoration: "underline", cursor: "pointer"
                                }}
                            >{candidate?.website}</Link>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack >
    )
}
export default HomePage