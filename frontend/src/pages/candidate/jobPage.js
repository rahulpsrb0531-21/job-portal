import React, { useEffect, useState } from 'react'
import { NavLink as RouterLink, useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { Box, Button, Tab, Stack, Typography, TextField, Autocomplete, Chip, Select, MenuItem, Divider, InputLabel, FormControl } from "@mui/material"
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Overview from '../../components/profile/overview'
import { BrowseAllJobs } from '../../components/job/browseAllJobs'
import jobServices from '../../services/jobServices'
import { useSnackbar } from 'notistack'
import Iconify from '../../components/Iconify'
import { useSelector } from 'react-redux'
import SavedJobPage from '../../components/job/savedJobcard'
import { employmentTypeData, experienceData } from '../../utils/basicData'

export default function JobPage() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [value, setValue] = useState('1')
    const [jobsData, setJobsData] = useState([])
    const token = localStorage.getItem('access')
    const { user } = useSelector((state) => state.auth)
    const [designations, setDesignations] = useState('')
    const [locations, setLocations] = useState('')
    const [experience, setExperience] = useState('')
    const [jobType, setJobType] = useState('')

    const { getRootProps, getInputProps } = useDropzone({
        // onDrop,
        accept: 'image/*',
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
        backgroundImage: 'none',
        // backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '160px',
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        getJobs()
    }, [])

    async function getJobs() {
        const res = await jobServices.getAllJobs()
        if (res && res.success) {
            // console.log()
            setJobsData(res?.jobs)
        } else {
            enqueueSnackbar(
                // res?.data?.message
                'error'
                , {
                    variant: "error",
                    anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
                })
        }
    }

    async function savedJob(job) {
        const data = {
            candidateId: user?._id,
            job
        }
        const res = await jobServices.savedJob(data)
        console.log(res)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1300
            })
            setValue('2')
        } else {
            enqueueSnackbar(res?.data?.message, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1300
            })
        }
    }

    async function searchJob(job) {
        if (designations?.length !== 0 || locations?.length !== 0 || experience?.length !== 0 || jobType?.length !== 0) {
            const data = {
                designations: designations,
                locations: locations,
                experience: experience?.length !== 0 ? experience : "",
                jobType: jobType
            }
            // console.log('datra', data)
            const res = await jobServices.searchJob(data)
            // console.log(res)
            if (res && res.success) {
                // console.log("res>>>>", res)
                setJobsData(res?.jobs)
            } else {
                enqueueSnackbar("error", {
                    variant: "error",
                    anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1300
                })
            }
        } else {
            enqueueSnackbar("Enter keywords to search relevant jobs", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1300
            })
        }
    }

    useEffect(() => {
        if (token === null) {
            navigate('/')
        }
    }, [])

    const handlerClearAll = () => {
        setDesignations("");
        setLocations("");
        setExperience("");
        getJobs()
    }

    return (
        <Box sx={{ width: '100%', pb: 6 }} >
            <Box >
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Jobs " value="1" />
                            <Tab label="Saved Jobs" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel sx={{ "&.MuiTabPanel-root": { p: 0 } }} value="1">
                        <Box sx={{
                            width: { xs: '98%', lg: "90%" }, border: '1px solid #e0e0e0', borderRadius: "8px", p: 1, mt: 1
                            // position: 'fixed', bgcolor: '#fff', zIndex: 9999
                        }} >
                            <Typography sx={{ fontSize: { xs: 18, lg: 24 }, fontWeight: 600, py: 1 }} >Search for jobs</Typography>
                            <Stack direction={{ xs: 'column', lg: 'row' }} flexWrap={'wrap'} rowGap={1} columnGap={1} >
                                <TextField
                                    sx={{ ".MuiInputBase-root": { borderRadius: "4px" }, width: { xs: "100%", lg: "40%" } }}
                                    onChange={(e) => setDesignations(e.target.value)}
                                    value={designations}
                                    placeholder='Job Title'
                                />
                                <Select
                                    sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 2 }, borderRadius: "4px", width: { xs: "100%", sm: "100%", md: "40%", lg: "40%" } }}
                                    value={jobType}
                                    displayEmpty
                                >
                                    <MenuItem value="" >
                                        <p style={{ fontSize: 12 }} >Job Type</p>
                                    </MenuItem>
                                    {
                                        employmentTypeData?.map((data, idx) => (
                                            <MenuItem key={idx} value={data}
                                                onClick={() => setJobType(data)}
                                            >{data}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <Select sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 2 }, borderRadius: "4px", width: { xs: "100%", sm: "100%", md: "40%", lg: "40%" } }}
                                    value={experience}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <p style={{ fontSize: 12 }} >Experience</p>
                                    </MenuItem>
                                    {
                                        experienceData?.map((data, idx) => (
                                            <MenuItem key={idx} value={data}
                                                onClick={() => setExperience(data)}
                                            >{data}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <TextField
                                    sx={{ ".MuiInputBase-root": { borderRadius: "4px" }, width: { xs: "100%", lg: "40%" } }}
                                    value={locations}
                                    onChange={(e) => setLocations(e.target.value)}
                                    placeholder='Location'
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={1} mt={1} >
                                <Button variant='outlined'
                                    // sx={{ width: '40%' }}
                                    sx={{
                                        width: 130,
                                        fontWeight: 400,
                                        borderRadius: 8,
                                        letterSpacing: 0.4
                                    }}
                                    onClick={() => handlerClearAll()}
                                >Clear All</Button>
                                <Button
                                    // variant='blackButton' sx={{ width: '40%' }}
                                    variant="contained"
                                    sx={{
                                        width: 130,
                                        fontWeight: 400,
                                        borderRadius: 8,
                                        letterSpacing: 0.4
                                    }}
                                    onClick={() => searchJob()}
                                >Search</Button>
                            </Stack>
                        </Box>
                        <Stack spacing={2} sx={{ my: 2 }} >
                            {
                                jobsData?.map((data, idx) => (
                                    <Stack sx={{
                                        width: { xs: "96%", sm: "96%", md: "60%", lg: "60%" },
                                        border: '1px solid #e0e0e0', borderRadius: "8px",
                                        p: 2,
                                        backgroundImage: "linear-gradient(178deg,#fafafa,#fff 35%)"
                                    }} spacing={2} >

                                        <Stack direction={'row'}
                                            alignItems={'center'}
                                            spacing={2.6}
                                        >
                                            {/* {console.log("djfhkhddsf", data?.company?.companyLogo)} */}
                                            <Box
                                                component={'img'}
                                                // src={'/images/logo.png'}
                                                src={'https://photos.wellfound.com/startups/i/7742654-5243f3c8796feda0a98a2491d5a82572-medium_jpg.jpg?buster=1591174010'}
                                                sx={{
                                                    width: 48,
                                                    objectFit: "cover",
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: "4px",
                                                }}

                                            />
                                            <Stack spacing={0.8} >
                                                <Typography
                                                    sx={{
                                                        fontSize: 18,
                                                        fontWeight: 500,
                                                        color: "#0e1111",
                                                        mr: '20px'
                                                    }}

                                                >{data?.company?.companyName}</Typography>
                                                <Stack direction={'row'} spacing={1} >
                                                    <Iconify icon={"el:group"}
                                                        sx={{ width: 14, color: "#9e9e9e" }} />
                                                    <Typography
                                                        sx={{
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            color: "#9e9e9e",
                                                            textTransform: "uppercase",
                                                            letterSpacing: 0.25
                                                        }}
                                                    >
                                                        {data?.company?.companySize} employees
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>

                                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} >
                                            <span style={{ fontWeight: 400 }} >Position - </span>
                                            {data?.title}</Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} >
                                            <span style={{ fontWeight: 400 }} >Job Type - </span> {data?.employmentType}</Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight: 600 }} >
                                            <span style={{ fontWeight: 400 }} >Salary - </span>
                                            {data?.salaryCurrency?.symbol}{data?.salaryRange?.minimum} - {data?.salaryCurrency?.symbol}{data?.salaryRange?.maximum}</Typography>
                                        <Stack direction={'row'} spacing={0.4} alignItems={'center'} >
                                            <Iconify icon={"carbon:location"} />
                                            <span style={{ fontWeight: 400, fontSize: 14 }} >Location - </span>
                                            {
                                                data?.location?.map((data, idx, row) => (
                                                    <Typography sx={{ fontSize: 14, fontWeight: 700 }} >{data} {idx + 1 === row.length ? "" : ","}</Typography>
                                                ))
                                            }
                                        </Stack>
                                        <Stack direction={'row'} spacing={1} sx={{ mt: 1 }} >
                                            <Button size="small" variant="outlined"
                                                // sx={{ fontSize: 14, width: "58px",
                                                //  height: "30px", fontWeight: 500 }}
                                                sx={{
                                                    width: 128,
                                                    fontWeight: 500,
                                                    borderRadius: 8,
                                                    letterSpacing: 0.4,
                                                    // height: "30px"
                                                }}
                                                onClick={() => savedJob(data)}
                                            >
                                                Save
                                            </Button>
                                            <Button variant="contained"
                                                sx={{
                                                    width: 128,
                                                    // height: "38px",
                                                    fontWeight: 400,
                                                    borderRadius: 8,
                                                    letterSpacing: 0.4
                                                }}
                                                onClick={() => navigate(`/candidate/${data?.title}`, { state: data })}
                                            // sx={{ fontSize: 12, width: 120,
                                            //      height: "30px", bgcolor: 'black', fontWeight: 500, }}
                                            >
                                                Learn more
                                            </Button>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </TabPanel>
                    <TabPanel sx={{ "&.MuiTabPanel-root": { p: 0 } }} value="2" >
                        <SavedJobPage />
                    </TabPanel>
                </TabContext>
            </Box>
        </Box >
    );
}