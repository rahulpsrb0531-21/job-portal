import { Box, CircularProgress, Divider, Link, Stack, Typography } from "@mui/material"
import Iconify from "../../components/Iconify"
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useState, useEffect, useCallback } from "react"
import candidateServices from "../../services/candidateServices"
import { useSnackbar } from "notistack"

// asserts
import Men from '../../assets/Creative-team-rafiki.svg'
import notAcceptedDot from '../../assets/circle-dot-not-accept.svg'
import pendingDot from '../../assets/circle-dot-pending.svg'
import acceptedDot from '../../assets/circle-dot-accepted.svg'
import blankUser from '../../assets/nopic.webp'


import { useDropzone } from "react-dropzone"
import { server } from "../../utils/server"
import jobServices from "../../services/jobServices"
import applicationServices from "../../services/applicationServices"
import moment from "moment"
import { formatDateWithMonth, getApplicationAgo } from "../../utils/function"

const HomePage = () => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useSelector((state) => state.auth)
    const [candidate, setCandidate] = useState({})
    // console.log("candidate", candidate)
    const [loading, setLoading] = useState(true)
    const [recommendedList, setRecommendedList] = useState([])
    // console.log("recommendedList", recommendedList)
    const [applicationList, setApplicationList] = useState([])
    // console.log("applicationList", applicationList)
    const token = localStorage.getItem('access')
    const [updatePage, setUpdatePage] = useState(false)
    const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]


    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('logo', file);
        server.post(`uploadLogo/${user?._id}`, formData)
            .then(res => {
                // setUpload(res?.data?.filePath)
                // getCandidateById()
            })
            .catch(err => {
                return null
            })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.pdf, .doc, .docx', // Accept only specific file types
        maxFiles: 1,
    })

    const dropzoneStyles = {
        border: '1px dashed #cccccc',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: '4px',
        padding: '20px',
        // textAlign: 'center',
        cursor: 'pointer',
        // backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '160px',
    }


    useEffect(() => {
        if (user) {
            getCandidateById()
            // getRecommendedList()
        }
    }, [])

    useEffect(() => {
        if (token === null) {
            navigate('/')
        }
    }, [token])

    async function getCandidateById(data) {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            setCandidate(res?.candidate)
            getRecommendedList()
            getApplicationsByUserId()
            setLoading(false)
        } else {
            enqueueSnackbar('Something went wrong', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    async function getApplicationsByUserId(data) {
        const id = user?._id
        const res = await applicationServices.getApplicationsByUserId(id)
        if (res && res.success) {
            // console.log('res', res?.data)
            setApplicationList(res?.data)
            // setLoading(false)
        } else {
            enqueueSnackbar('Something went wrong', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    async function getRecommendedList() {
        const id = user?._id
        const res = await jobServices.getRecommendedJobs(id)
        if (res && res.success) {
            setRecommendedList(res?.data)
        } else {
            console.log("error")
            // enqueueSnackbar('Something went wrong', {
            //     variant: "error",
            //     anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            // })
        }
    }

    return (
        <Stack sx={{ width: { xs: '96%', lg: '96%' }, }}>
            {
                loading === true ? (
                    <Box>
                        <Stack justifyContent='center' alignItems='center' minHeight={'80vh'}>
                            <CircularProgress />
                        </Stack>
                    </Box>

                ) : (
                    <Stack
                        alignItems={'start'}
                        justifyContent={'space-between'}
                        sx={{
                            // width: '100%', 
                            // border: '1px solid #e0e0e0',
                            borderRadius: "8px",
                            p: 2
                        }}
                        spacing={4}
                    >
                        <Stack direction={'row'} alignItems={'start'} spacing={1.6} >
                            <Box
                                component={'img'}
                                src={blankUser}
                                // src={`http://localhost:3000/${candidate?.candidateImage}`}
                                // alt={candidate?.candidateImage} 
                                sx={{
                                    width: 80, borderRadius: 50,
                                    objectFit: "cover"
                                }}
                            />
                            {/* <Box>
                        <div>
                            <div {...getRootProps()} style={dropzoneStyles}>
                                <input {...getInputProps()} />
                                {!uploadedImage &&
                                    <p>Upload Logo</p>
                                }
                            </div>
                        </div>
                    </Box> */}

                            <Stack spacing={1.4} >
                                <Typography
                                    sx={{ fontSize: 34, color: 'rgb(5, 12, 38)', fontWeight: 500, textTransform: "capitalize" }}
                                >{candidate?.candidateName}</Typography>
                                <Box>
                                    <Typography
                                        sx={{ fontSize: 14, color: 'rgb(5, 12, 38)', fontWeight: 700, textTransform: "capitalize", letterSpacing: 0.6, lineHeight: '20px' }}
                                    >{candidate?.primaryRole}</Typography>
                                    <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: "20px" }} >{candidate?.location}</Typography>
                                </Box>
                                {/* <Box> */}
                                {/* <Stack direction={'row'} alignItems={'center'} spacing={2} >
                                <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgb(5, 12, 38)', width: 60 }} >Email</Typography>
                                <Typography sx={{ fontSize: 14, color: "rgb(113, 117, 132)" }} >{candidate?.email}</Typography>
                            </Stack> */}
                                {/* <Stack direction={'row'} alignItems={'center'} spacing={2} >
                                <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgb(5, 12, 38)', width: 60 }} >Location</Typography>
                                <Typography sx={{ fontSize: 14, color: "rgb(113, 117, 132)" }} >{candidate?.location}</Typography>
                            </Stack> */}
                                {/* <Stack direction={'row'} alignItems={'center'} spacing={2} >
                                <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'rgb(5, 12, 38)', width: 60 }} >Website</Typography>
                                <Link
                                    target="_blank"
                                    href={candidate?.website}
                                    rel="noopener noreferrer"
                                    sx={{
                                        fontSize: 14, color: 'blue',
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}
                                >{candidate?.website}</Link>
                            </Stack> */}
                                {/* </Box> */}
                            </Stack>
                        </Stack>
                        <Stack
                            sx={{
                                width: "100%",
                                pt: 4,
                                // bgcolor: "blue"
                            }}
                            spacing={0}
                        >
                            <Stack direction={'row'} justifyContent={"space-between"}>
                                <Box>
                                    <Typography
                                        sx={{ fontSize: 22, lineHeight: "16px", fontWeight: 600 }}
                                    >Recommended Jobs</Typography>
                                    <Typography
                                        variant="profilePageSubText"
                                    >Jobs where you're a top applicant based on your profile job search</Typography>
                                </Box>
                                <Typography
                                    variant="profilePageSubText"
                                    sx={{
                                        color: "blue",
                                        ":hover": {
                                            textDecoration: "underline",
                                            cursor: "pointer"
                                        }
                                    }}
                                >Change job preferences</Typography>
                            </Stack>
                            <Box sx={{ pt: 3.2 }} >
                                {
                                    recommendedList?.length === 0 ? (
                                        <Box sx={{
                                            width: '100%',
                                            borderBottom: "1px solid #eee"
                                            , textAlign: "center"
                                        }} >
                                            <Box
                                                component={'img'}
                                                src={Men}
                                                sx={{ width: 380 }}
                                            />
                                        </Box>
                                    ) : (
                                        <Stack spacing={2.8} >
                                            {
                                                recommendedList?.map((data, idx) => (
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
                                                        <Box sx={{ width: 60, maxHeight: 60, bgcolor: 'blue', borderRadius: "4px" }} />
                                                        <Stack direction={'row'}
                                                            justifyContent={'space-between'}
                                                            sx={{ height: 142, }}
                                                        >
                                                            <Box>
                                                                <Stack sx={{ pb: 1 }} >
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 16, fontWeight: 600,
                                                                            lineHeight: "20px",
                                                                            textTransform: "capitalize",
                                                                            ":hover": {
                                                                                cursor: "pointer",
                                                                                textDecoration: "underline"
                                                                            }
                                                                        }}
                                                                    >{data?.title}</Typography>
                                                                    <Typography variant="profilePageSubText"
                                                                        sx={{
                                                                            textTransform: "capitalize",
                                                                            ":hover": {
                                                                                cursor: "pointer",
                                                                                textDecoration: "underline"
                                                                            }
                                                                        }}
                                                                    >{data?.company?.companyName}</Typography>
                                                                    <Box>

                                                                        {
                                                                            data?.location?.map((data, idx, row) => (
                                                                                <Typography variant="profilePageSubText"
                                                                                    sx={{ textTransform: "capitalize" }} >{data} {idx + 1 === row.length ? "" : ","}</Typography>
                                                                            ))
                                                                        }
                                                                    </Box>
                                                                </Stack>
                                                                <Typography sx={{ fontSize: 14, lineHeight: '20px', pb: 0.8, fontWeight: 500 }} >
                                                                    {data?.salaryCurrency?.symbol}{data?.salaryRange?.minimum} - {data?.salaryCurrency?.symbol}{data?.salaryRange?.maximum}
                                                                    {/* $4L - $8L */}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: 12, lineHeight: '20px', fontWeight: 500 }} >Posted:{getApplicationAgo(data?.created_at)}</Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                ))
                                            }
                                        </Stack>
                                    )
                                }
                            </Box>
                            <Box sx={{
                                borderBottom: "1px solid #eee",
                                py: 2.4,
                                textAlign: "center"
                            }} >
                                <Typography
                                    sx={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color: "#143fcd",
                                        ":hover": {
                                            cursor: "pointer",
                                            textDecoration: "underline"
                                        }
                                    }}
                                    onClick={() => navigate("/candidate/lists")}
                                >See more jobs</Typography>
                            </Box>
                        </Stack>
                        <Stack
                            sx={{
                                width: "100%",
                                pt: 4
                                // bgcolor: "red"
                            }}
                        >
                            <Typography
                                sx={{ fontSize: 22, lineHeight: "24px", fontWeight: 500 }}
                            >Recently Applied Jobs</Typography>
                            <Box sx={{ pt: 3.2 }} >
                                {
                                    candidate?.jobsApplied?.length === 0 ? (
                                        <Box sx={{ width: '100%', borderBottom: "1px solid #eee", textAlign: "center" }} >
                                            <Box
                                                component={'img'}
                                                src={Men}
                                                sx={{ width: 380 }}
                                            />
                                        </Box>
                                    ) : (
                                        <Stack spacing={2.8} >
                                            {
                                                applicationList?.map((data, idx) => (
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
                                    )
                                }
                            </Box>
                            <Box sx={{
                                borderBottom: "1px solid #eee",
                                py: 2.4,
                                textAlign: "center"
                            }} >
                                <Typography
                                    sx={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color: "#143fcd",
                                        ":hover": {
                                            cursor: "pointer",
                                            textDecoration: "underline"
                                        }
                                    }}
                                    onClick={() => navigate("/candidate/applications")}
                                >See all applied jobs</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                )
            }
        </Stack >
    )
}
export default HomePage

// const dropzoneStyles = {
//     border: '1px dashed #cccccc',
//     display: "flex",
//     justifyContent: "center",
//     alignItems: 'center',
//     borderRadius: '4px',
//     padding: '20px',
//     // textAlign: 'center',
//     cursor: 'pointer',
//     // backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     height: '160px',
// }
