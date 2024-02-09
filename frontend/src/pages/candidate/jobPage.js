import React, { useEffect, useState } from 'react'
import { NavLink as RouterLink, useNavigate } from 'react-router-dom'
import { Box, Button, Tab, Stack, Typography, TextField, Autocomplete, Chip, Select, MenuItem, Divider } from "@mui/material"
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
import { experienceData } from '../../utils/basicData'

export default function JobPage() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [value, setValue] = useState('1')
    const [jobsData, setJobsData] = useState([])
    // console.log(jobsData)
    const token = localStorage.getItem('access')
    const { user } = useSelector((state) => state.auth)
    const [designations, setDesignations] = useState([])
    const [locations, setLocations] = useState([])
    const [experience, setExperience] = useState('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        getJobs()
    }, [])

    async function getJobs() {
        const res = await jobServices.getAllJobs()
        if (res && res.success) {
            // console.log("res>>>>>>>>>>", res)
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
        // console.log(res)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1300
            })
            // navigate()
            setValue('2')
        } else {
            enqueueSnackbar("error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1300
            })
        }
    }

    async function searchJob(job) {
        if (designations?.length !== 0 || locations?.length !== 0 || experience?.length !== 0) {
            const data = {
                designations: designations,
                locations: locations,
                experience: experience?.length !== 0 ? experience : ""
            }
            console.log('datra', data)
            const res = await jobServices.searchJob(data)
            // console.log(res)
            if (res && res.success) {
                console.log("res>>>>", res)
                enqueueSnackbar(res?.message, {
                    variant: "success",
                    anchorOrigin: { horizontal: "right", vertical: "top" },
                    autoHideDuration: 1300
                })
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
        if (user?.role !== "CANDIDATE" && token) {
            navigate('/login')
        }
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            {/* <Box sx={{
                width: { xs: '94%', lg: "90%" }, border: '1px solid #e0e0e0', borderRadius: "8px", p: 1, mt: 1,
                // position: 'fixed', bgcolor: '#fff', zIndex: 9999
            }} >
                <Typography sx={{ fontSize: { xs: 18, lg: 24 }, fontWeight: 600 }} >Search for jobs</Typography>
                <Stack direction={{ xs: 'column', lg: 'row' }} flexWrap={'wrap'} rowGap={1} columnGap={1} >
                    <Autocomplete
                        multiple
                        sx={{ width: { xs: "90%", lg: '40%' } }}
                        id="tags-filled"
                        // options={jobsData.map((option) => option.jobs[0]?.title)}
                        options={[]}
                        freeSolo
                        renderTags={(value, getTagProps) => {
                            setDesignations(value)
                            return value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                // label="freeSolo"
                                placeholder="Designation"
                            />
                        )}
                    />
                    <Select
                        sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 2 }, width: { xs: "90%", lg: "40%" } }}
                        value={experience}
                    >
                        {
                            experienceData?.map((data, idx) => (
                                <MenuItem key={idx} value={data}
                                    onChange={() => setExperience(data)}
                                >{data}</MenuItem>
                            ))
                        }
                    </Select>
                    <Autocomplete
                        multiple
                        sx={{ width: { xs: "90%", lg: '40%' } }}
                        id="tags-filled"
                        // options={jobsData.map((option) => option.jobs[0]?.title)}
                        options={[]}
                        freeSolo
                        renderTags={(value, getTagProps) => {
                            setDesignations(value)
                            return value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                // label="freeSolo"
                                placeholder="Locations..."
                            />
                        )}
                    />
                </Stack>
                <Button variant='blackButton' sx={{ width: '80%', mt: 1 }}
                    onClick={() => searchJob()}
                >Search</Button>
            </Box> */}
            <Box sx={{ mt: 0.8 }} >
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Browse all " value="1" />
                            <Tab label="Saved" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel sx={{ "&.MuiTabPanel-root": { p: 0 } }} value="1">
                        <Box sx={{
                            width: { xs: '100%', lg: "90%" }, border: '1px solid #e0e0e0', borderRadius: "8px", p: 1,
                            // position: 'fixed', bgcolor: '#fff', zIndex: 9999
                        }} >
                            <Typography sx={{ fontSize: { xs: 18, lg: 24 }, fontWeight: 600 }} >Search for jobs</Typography>
                            <Stack direction={{ xs: 'column', lg: 'row' }} flexWrap={'wrap'} rowGap={1} columnGap={1} >
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" }, width: "81%" }}
                                    onChange={(e) => setDesignations(e.target.value)}
                                    placeholder='Desinagation'
                                />
                                {/* <Autocomplete
                                    multiple
                                    sx={{ width: { xs: "90%", lg: '40%' } }}
                                    id="tags-filled"
                                    // options={jobsData.map((option) => option.jobs[0]?.title)}
                                    options={[]}
                                    freeSolo
                                    renderTags={(value, getTagProps) => {
                                        setDesignations(value)
                                        return value.map((option, index) => (
                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            // label="freeSolo"
                                            placeholder="Designation"
                                        />
                                    )}
                                /> */}
                                <Select
                                    sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 2 }, width: { xs: "90%", lg: "40%" } }}
                                    value={experience}
                                >
                                    {
                                        experienceData?.map((data, idx) => (
                                            <MenuItem key={idx} value={data}
                                                onClick={() => setExperience(data)}
                                            >{data}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <TextField sx={{ width: { lg: "40%" } }}
                                    onChange={(e) => setLocations(e.target.value)}
                                    placeholder='Location'
                                />
                                {/* <Autocomplete
                                    multiple
                                    sx={{ width: { xs: "90%", lg: '40%' } }}
                                    id="tags-filled"
                                    // options={jobsData.map((option) => option.jobs[0]?.title)}
                                    options={[]}
                                    freeSolo
                                    renderTags={(value, getTagProps) => {
                                        setLocations(value)
                                        return value.map((option, index) => (
                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            // label="freeSolo"
                                            placeholder="Locations..."
                                        />
                                    )}
                                /> */}

                            </Stack>
                            <Stack direction={'row'} spacing={1} mt={1} >
                                <Button variant='outlined' sx={{ width: '40%' }}
                                // onClick={() => searchJob()}
                                >Clear All</Button>
                                <Button variant='blackButton' sx={{ width: '40%' }}
                                    onClick={() => searchJob()}
                                >Search</Button>
                            </Stack>
                        </Box>
                        <Stack spacing={1} sx={{ my: 2 }} >
                            {
                                jobsData?.map((data, idx) => (
                                    <Stack sx={{
                                        width: "60%",
                                        border: '1px solid #e0e0e0', borderRadius: "8px",
                                        p: 2,
                                        backgroundImage: "linear-gradient(178deg,#fafafa,#fff 35%)"
                                    }} >
                                        {console.log(data)}
                                        <Typography
                                            onClick={() => navigate(`/company/${data?.company?.companyName}`,
                                                { state: data })}
                                            sx={{ color: 'rgb(14, 17, 17)', fontSize: 18, fontWeight: 500, cursor: "pointer" }}
                                        >{data?.company?.companyName}</Typography>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                        >{data?.company?.oneLinePitch}</Typography>
                                        <Divider />
                                        <Typography>{data?.title}</Typography>
                                        <Typography>{data?.salaryCurrency?.symbol}{data?.salaryRange?.minimum} - {data?.salaryCurrency?.symbol}{data?.salaryRange?.maximum}</Typography>
                                        <Stack direction={'row'} spacing={0.4} alignItems={'center'} >
                                            <Iconify icon={"carbon:location"} sx={{ width: 16 }} />
                                            {
                                                data?.location?.map((data, idx, row) => (
                                                    <Typography sx={{ fontSize: 14, fontWeight: 700 }} >{data} {idx + 1 === row.length ? "" : ","}</Typography>
                                                ))
                                            }
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </TabPanel>
                    <TabPanel value="2" >
                        <SavedJobPage />
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}

{/* {
                                jobsData?.map((data, idx) => (
                                    <Stack sx={{
                                        width: "60%",
                                        border: '1px solid #e0e0e0', borderRadius: "8px",
                                        p: 2,
                                        backgroundImage: "linear-gradient(178deg,#fafafa,#fff 35%)"
                                    }} >
                                        <Stack direction={'row'} justifyContent={'space-between'} sx={{ px: 1 }} >
                                            <Stack direction={'row'} spacing={1} >
                                                <Iconify icon={"mingcute:user-4-fill"} sx={{ width: 42, height: 42 }} />
                                                <Box>
                                                    <Typography
                                                        onClick={() => navigate(`/company/${data?.companyName}`,
                                                            { state: data })}
                                                        sx={{ color: 'rgb(14, 17, 17)', fontSize: 18, fontWeight: 500, cursor: "pointer" }}
                                                    >{data?.companyName}</Typography>
                                                    <Typography
                                                        sx={{ fontSize: 14 }}
                                                    >{data?.companyDescription}</Typography>
                                                </Box>
                                            </Stack>
                                            <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 16, height: 16, transform: "rotate(180deg)" }} />
                                        </Stack>
                                        <Stack spacing={0.4} sx={{
                                            borderRadius: '4px', p: 2
                                        }} >
                                            {
                                                data?.jobs.map((job, idx) => (
                                                    <Stack direction={'row'} justifyContent={'space-between'} sx={{
                                                        p: 1, border: "1px solid rgb(238, 238, 238)", borderRadius: '4px',
                                                        ":hover": {
                                                            border: "1px solid rgb(5, 12, 38, 0.4)"
                                                        }
                                                    }} >
                                                        <Box>
                                                            <Stack direction={'row'} spacing={2}>
                                                                <Typography
                                                                    sx={{ fontSize: 14, fontWeight: 500, color: 'rgb(14, 17, 17)' }}
                                                                >{job?.title}</Typography>
                                                                <Typography
                                                                    sx={{ fontSize: 14, color: 'rgb(82, 87, 105)' }}
                                                                >{job?.location}</Typography>
                                                                <Typography sx={{ fontSize: 14, color: 'rgb(82, 87, 105)' }}>{job?.salaryRange?.min}- {job?.salaryRange?.max}</Typography>
                                                            </Stack>
                                                            <Typography
                                                                sx={{ fontSize: 14, color: 'rgb(82, 87, 105)' }}
                                                            >{job?.salaryCurrency?.symbol}{job?.salaryRange?.minimum} - {job?.salaryCurrency?.symbol}{job?.salaryRange?.maximum}</Typography>
                                                        </Box>
                                                        <Stack direction={'row'} spacing={1} >
                                                            <Button size="small" variant="outlined"
                                                                sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                                                                onClick={() => savedJob(job)}
                                                            >
                                                                Save
                                                            </Button>
                                                            <Button variant="blackButton"
                                                                onClick={() => navigate(`/jobs/${job?.title}`, { state: job })}
                                                                sx={{ fontSize: 12, width: "110px", height: "30px", bgcolor: 'black', fontWeight: 500, }}
                                                            >
                                                                Learn more
                                                            </Button>
                                                        </Stack>
                                                    </Stack>
                                                ))
                                            }
                                        </Stack>
                                    </Stack>
                                ))
                            } */}