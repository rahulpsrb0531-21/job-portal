import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { Box, Button, Chip, FormControl, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { employmentTypeData, experienceData } from "../../utils/basicData";
import candidateServices from '../../services/candidateServices';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';


export default function PreferencesPage() {
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useSelector((state) => state.auth)
    const [skillValues, setSkillValues] = useState([])
    const [newSkillValue, setNewSkillValue] = useState('')
    const [locations, setLocations] = useState([])
    const [newLocation, setNewLocation] = useState('')

    const addSkill = () => {
        if (newSkillValue?.length !== 0) {
            setSkillValues([...skillValues, newSkillValue])
            setNewSkillValue('')
        }
    }

    const removeSkill = (index) => {
        const updatedSkills = skillValues.filter((_, i) => i !== index);
        setSkillValues(updatedSkills);
    }

    const addLocation = () => {
        if (newLocation?.length !== 0) {
            setLocations([...locations, newLocation])
            setNewLocation('')
        }
    }

    const removeLocation = (index) => {
        const updatedLocation = locations.filter((_, i) => i !== index);
        setLocations(updatedLocation);
    }

    const preferenceSchema = Yup.object().shape({
        experience: Yup.string().required("Experience is required"),
        location: Yup.array().required("Location is required"),
        newLocation: Yup.string(),
        skills: Yup.array(),
        newSkill: Yup.string(),
        employmentType: Yup.string().required("Employment Typee is required")
    })
    const formik = useFormik({
        initialValues: {
            experience: "",
            location: [],
            newLocation: "",
            skills: [],
            newSkill: "",
            employmentType: "",
        },
        validationSchema: preferenceSchema,
        onSubmit: (v) => {
            console.log('v>>>>>>', v)
            const data = {
                id: user?._id,
                experience: v?.experience,
                locations: locations,
                skills: skillValues,
                employmentType: v?.employmentType
            }
            // console.log(data)
            preferenceUpdate(data)
        }
    })

    // useEffect(() => {
    //     if (state) {
    //         console.log('state>>>>>>', state)
    //         // setFieldValue("title", state?.title)
    //         setFieldValue("experience", state?.experience)
    //         // setFieldValue("salaryMin", state?.salaryRange?.minimum)
    //         // setFieldValue("salaryMax", state?.salaryRange?.maximum)
    //         setFieldValue("currencyName", state?.salaryCurrency?.name)
    //         setFieldValue("currencySymbol", state?.salaryCurrency?.symbol)
    //         setLocations(state?.location)
    //         setSkillValues(state?.skills)
    //         setFieldValue("employmentType", state?.employmentType)

    //     }
    // }, [state])

    async function preferenceUpdate(data) {
        const id = user?._id
        const res = await candidateServices.updatePreference({ data, id })
        console.log(res, 'sdfhls')
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
        } else {
            enqueueSnackbar('error', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setSubmitting,
        setFieldValue
    } = formik

    const deleteSkill = (idx) => {
        setFieldValue('skills', values.skills.filter((data, i) => i !== idx))
    }

    const deleteLocation = (idx) => {
        setFieldValue('location', values.location.filter((data, i) => i !== idx))
    }

    useEffect(() => {
        getCandidateById()
    }, [])

    async function getCandidateById(data) {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            console.log("res", res?.candidate)
            // setFieldValue("name", res?.candidate?.candidateName)
            // setFieldValue("location", res?.candidate?.location)
            // setFieldValue("primaryRole", res?.candidate?.primaryRole)
            // setFieldValue("experience", res?.candidate?.yearsOfExperience)
            // setFieldValue("Website", res?.candidate?.website)
            // setFieldValue("Twitter", res?.candidate?.twitter)
            // setFieldValue("bio", res?.candidate?.bio)
            // setFieldValue("LinkedIn", res?.candidate?.linkedin)
            // setFieldValue("GitHub", res?.candidate?.gitHub)
            // setFieldValue("work", res?.candidate?.workExperience || [])
            // setFieldValue("education", res?.candidate?.eduction || [])
            // // skills
            // setSkillValues(res?.candidate?.skills || [])
            // // setFieldValue("skills", res?.candidate?.skills || [])
            // setFieldValue("achivements", res?.candidate?.achivements)
        } else {
            console.log("error")
            // enqueueSnackbar(res?.data?.message || "server is not working", {
            //     variant: "error",
            //     anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            // })
        }
    }

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack
                    sx={{
                        // width: '100%',
                        // border: '1px solid #e0e0e0',
                        borderRadius: "8px",
                        p: 2
                    }}
                    spacing={4}
                >

                    {/* <Skills /> */}
                    <Stack direction={{ xs: "column", lg: 'row' }}
                        sx={{
                            borderBottom: "1px solid #eee",
                            height: 160
                        }}
                        spacing={4}>
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "30%", lg: "30%" }
                            }}
                        >
                            <Typography sx={{ fontSize: 18, fontWeight: 600 }} >Your Skills*</Typography>
                        </Box>
                        <Stack sx={{ width: { xs: "94%", sm: "94%", sm: "70%", lg: "70%" } }}
                            spacing={2} >
                            <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap >
                                {
                                    skillValues.map((skill, idx) => (
                                        <Chip label={skill} key={idx} sx={{ borderRadius: "4px" }}
                                            onDelete={() => removeSkill(idx)}
                                        />
                                    ))
                                }
                            </Stack>
                            <FormControl>
                                <TextField
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 }
                                    }}
                                    label="Skill*"
                                    value={newSkillValue}
                                    onChange={(e) => setNewSkillValue(e.target.value)}
                                    error={Boolean(touched.skills && errors.skills)}
                                    helperText={touched.skills && errors.skills}
                                />
                                <Button size="small"
                                    // type="submit"
                                    variant="contained"
                                    sx={{
                                        width: 120,
                                        fontWeight: 400,
                                        borderRadius: 8,
                                        letterSpacing: 0.4, mt: 1
                                    }}
                                    onClick={() => addSkill()}
                                >Add Skill</Button>
                            </FormControl>
                        </Stack>
                    </Stack>

                    {/* <Location /> */}
                    <Stack direction={{ xs: "column", lg: 'row' }}
                        sx={{
                            borderBottom: "1px solid #eee",
                            height: 160
                        }}
                        spacing={4}>
                        <Box
                            sx={{
                                width: { xs: "100%", sm: "100%", md: "30%", lg: "30%" }
                            }}
                        >
                            <Typography sx={{ fontSize: 18, fontWeight: 600 }} >What locations do you want to work in?*</Typography>
                        </Box>
                        <Stack sx={{ width: { xs: "94%", sm: "94%", sm: "70%", lg: "70%" } }}
                            spacing={2} >
                            <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap sx={{ pb: 1 }} >
                                {
                                    locations.map((location, idx) => (
                                        <Chip label={location} key={idx} sx={{ borderRadius: "4px" }}
                                            onDelete={() => removeLocation(idx)}
                                        />
                                    ))
                                }
                            </Stack>
                            <FormControl>
                                <TextField
                                    // sx={{
                                    //     ".MuiInputBase-root": { borderRadius: '4px' }
                                    // }}
                                    //     value={newLocation}
                                    //     onChange={(e) => setNewLocation(e.target.value)}
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 }
                                    }}
                                    label="Location*"
                                    value={newLocation}
                                    onChange={(e) => setNewLocation(e.target.value)}
                                    error={Boolean(touched.location && errors.location)}
                                    helperText={touched.location && errors.location}

                                />
                                <Button size="small"
                                    // type="submit"
                                    variant="contained"
                                    sx={{
                                        width: 142,
                                        fontWeight: 400,
                                        borderRadius: 8,
                                        letterSpacing: 0.4,
                                        mt: 1
                                    }}
                                    onClick={() => addLocation()}
                                >Add Location</Button>
                            </FormControl>
                        </Stack>
                    </Stack>

                    {/* job type  */}
                    <Stack direction={{ xs: "column", lg: 'row' }} sx={{
                        // pt: 4,
                        borderBottom: "1px solid #eee",
                        height: 160
                    }} spacing={4} >
                        <Stack sx={{ width: { xs: "100%", sm: "100%", md: "30%", lg: "30%" } }} spacing={0.1} >
                            <Typography
                                sx={{ fontSize: 18, fontWeight: 600 }}
                            >What type of job are you interested in? *</Typography>
                        </Stack>

                        <Stack
                            sx={{ width: { xs: "94%", sm: "94%", sm: "70%", lg: "70%" } }}
                            spacing={2.6} >
                            <TextField
                                select
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                    width: '100%'
                                }}
                                label="Select type of job*"
                                value={values.employmentType}
                                {...getFieldProps('employmentType')}
                            >
                                {
                                    employmentTypeData?.map((data, idx) => (
                                        <MenuItem key={idx} value={data} >{data}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Stack>
                    </Stack>

                    {/* experience type  */}
                    <Stack direction={{ xs: "column", lg: 'row' }}
                        sx={{
                            // pt: 4, 
                            borderBottom: "1px solid #eee",
                            height: 160
                        }} spacing={4} >
                        <Stack sx={{ width: { xs: "100%", sm: "100%", md: "30%", lg: "30%" } }} spacing={0.1} >
                            <Typography
                                sx={{ fontSize: 18, fontWeight: 600 }}
                            >What is your experience?*</Typography>
                        </Stack>
                        <Stack
                            sx={{ width: { xs: "94%", sm: "94%", sm: "70%", lg: "70%" } }}
                            spacing={2.6} >
                            <TextField
                                select
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    '& > :not(style)': { m: 0 },
                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                    width: '100%'
                                }}
                                label="Years of experience*"
                                value={values.experience} {...getFieldProps('experience')}
                            >
                                {
                                    experienceData?.map((data, idx) => (
                                        <MenuItem key={idx} value={data} >{data}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Stack>
                    </Stack>

                    <Box sx={{ width: '100%', textAlign: "right" }} >
                        <Button size="small"
                            type="submit"
                            variant="contained"

                            sx={{
                                width: 120,
                                fontWeight: 400,
                                borderRadius: 8,
                                letterSpacing: 0.4, mt: 1
                            }}
                            oClick={() => console.log("errro", errors)}
                        >Update</Button>
                    </Box>
                </Stack>
            </Form>
        </FormikProvider>
    )
}