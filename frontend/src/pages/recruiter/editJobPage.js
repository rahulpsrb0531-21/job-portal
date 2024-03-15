import { useCallback, useEffect, useState } from "react"
import { server } from "../../utils/server"
import { useDropzone } from 'react-dropzone'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { Box, Button, MenuItem, Stack, TextField, Typography, Select, Chip, FormHelperText, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import recruiterServices from "../../services/recruiterServices"
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import CustomDescription from "../../components/customDescription"
import 'react-quill/dist/quill.snow.css'
import jobServices from "../../services/jobServices"
import { currencyData, employmentTypeData, experienceData } from "../../utils/basicData"


export default function EditJob() {
    const navigate = useNavigate()
    const { state } = useLocation()
    // console.log("state", state)
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useSelector((state) => state.auth)
    const token = localStorage.getItem('access')

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

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])

    const editJobSchema = Yup.object().shape({
        // company 
        // recruiterId
        title: Yup.string().required("Title is required"),
        experience: Yup.string().required("Experience is required"),
        jobDescription: Yup.string().required("Job Overview is required"),
        // jobOverview: Yup.string().required("Job Overview is required"),
        // qualifications: Yup.string().required("Qualifications is required"),
        // jobRequirements: Yup.string().required("Job Requirements is required"),
        // jobResponsibilities: Yup.string().required("Job Responsibilities is required"),
        salaryMin: Yup.number().required("Salary Minimum is required"),
        salaryMax: Yup.number().required("Salary Maximum is required"),
        // salaryCurrency: Yup.string().required("Salary Currency is required"),
        currencyName: Yup.string().required("Salary Currency is required"),
        currencySymbol: Yup.string(),
        location: Yup.array().required("Location is required"),
        newLocation: Yup.string(),
        skills: Yup.array(),
        newSkill: Yup.string(),
        employmentType: Yup.string().required("Employment Typee is required"),
        visaSponsorship: Yup.boolean().required("Visa Sponsorship Name is required"),
        reLocation: Yup.boolean().required("Visa Sponsorship Name is required")
    })
    const formik = useFormik({
        initialValues: {
            title: "",
            experience: "",
            jobDescription: "",
            // jobOverview: "",
            // qualifications: "",
            // jobRequirements: "",
            // jobResponsibilities: "",
            salaryMin: 0,
            salaryMax: 0,
            currencyName: "",
            currencySymbol: "",
            location: [],
            newLocation: "",
            skills: [],
            newSkill: "",
            employmentType: "",
            visaSponsorship: null,
            reLocation: null
        },
        validationSchema: editJobSchema,
        onSubmit: (v) => {
            // console.log('v>>>>>>', v)
            const data = {
                id: state?._id,
                company: user,
                recruiterId: user?._id,
                title: (v?.title).charAt(0).toUpperCase() + (v?.title).substring(1),
                experience: v?.experience,
                jobDescription: v?.jobDescription,
                // jobOverview: v?.jobOverview,
                // qualifications: v?.qualifications,
                // jobRequirements: v?.jobRequirements,
                // jobResponsibilities: v?.jobResponsibilities,
                salaryRange: {
                    minimum: v?.salaryMin,
                    maximum: v?.salaryMax
                },
                salaryCurrency: {
                    name: v?.currencyName,
                    symbol: v?.currencySymbol
                },
                location: locations,
                skills: skillValues,
                employmentType: v?.employmentType,
                visaSponsorship: v?.visaSponsorship,
                reLocation: v?.reLocation,
            }
            // console.log(data)
            jobUpdate(data)
        }
    })

    useEffect(() => {
        if (state) {
            console.log('state>>>>>>', state)
            setFieldValue("title", state?.title)
            setFieldValue("experience", state?.experience)
            setFieldValue("jobDescription", state?.jobDescription)
            // setFieldValue("jobOverview", state?.jobOverview[0])
            // setFieldValue("qualifications", state?.qualifications[0])
            // setFieldValue("jobRequirements", state?.jobRequirements[0])
            // setFieldValue("jobResponsibilities", state?.jobResponsibilities[0])
            setFieldValue("salaryMin", state?.salaryRange?.minimum)
            setFieldValue("salaryMax", state?.salaryRange?.maximum)
            setFieldValue("currencyName", state?.salaryCurrency?.name)
            setFieldValue("currencySymbol", state?.salaryCurrency?.symbol)
            setLocations(state?.location)
            setSkillValues(state?.skills)
            setFieldValue("employmentType", state?.employmentType)
            setFieldValue("reLocation", state?.reLocation)
            setFieldValue("visaSponsorship", state?.visaSponsorship)

        }
    }, [state])

    async function jobUpdate(data) {
        const res = await jobServices.updateJob(data)
        setSubmitting(false)
        console.log(res, 'sdfhls')
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            navigate('/recruiter/jobs')
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
        setFieldValue, resetForm
    } = formik

    const deleteSkill = (idx) => {
        setFieldValue('skills', values.skills.filter((data, i) => i !== idx))
    }

    const deleteLocation = (idx) => {
        setFieldValue('location', values.location.filter((data, i) => i !== idx))
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior for Enter key
        }
    };


    return (
        <Box sx={{ pb: 6 }}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack justifyContent={'space-between'} direction={'row'}
                    // sx={{ "& .css-pis1bl": { p: 0 } }}
                    >
                        {/* <Box sx={{
                            bgcolor: 'black', width: '18%', textAlign: "center", px: 1,
                            display: { xs: "none", sm: "none", md: "block", lg: "block" }
                        }} >
                        </Box> */}
                        <Box sx={{ width: { xs: '100%', sm: "100%", md: "80%", lg: "80%" } }} >
                            <Stack spacing={2} sx={{
                                width: { xs: "100%", lg: '50%' },
                                bgcolor: 'rgb(255, 255, 255)',
                                borderRadius: 0.4, p: 1, pt: 4
                            }}>
                                <Typography variant="companyTitle" >Update job</Typography>
                                <TextField
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                    }}
                                    {...getFieldProps("title")}
                                    onKeyPress={handleKeyPress}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                    label="Title*"
                                />

                                <TextField
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 }
                                    }}
                                    label="Job Overview*"
                                    multiline={true} rows={8}
                                    onKeyPress={handleKeyPress}
                                    {...getFieldProps("jobOverview")}
                                    error={Boolean(touched.jobOverview && errors.jobOverview)}
                                    helperText={touched.jobOverview && errors.jobOverview}
                                />
                                <TextField
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 }
                                    }}
                                    label="Qualifications*"
                                    multiline={true} rows={8}
                                    onKeyPress={handleKeyPress}
                                    {...getFieldProps("qualifications")}
                                    error={Boolean(touched.qualifications && errors.qualifications)}
                                    helperText={touched.qualifications && errors.qualifications}
                                />
                                <TextField
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 }
                                    }}
                                    label="Job Requirements*"
                                    multiline={true} rows={8}
                                    onKeyPress={handleKeyPress}
                                    {...getFieldProps("jobRequirements")}
                                    error={Boolean(touched.jobRequirements && errors.jobRequirements)}
                                    helperText={touched.jobRequirements && errors.jobRequirements}
                                />
                                <TextField
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 }
                                    }}
                                    label="Job Responsibilities*"
                                    multiline={true} rows={8}
                                    onKeyPress={handleKeyPress}
                                    {...getFieldProps("jobResponsibilities")}
                                    error={Boolean(touched.jobResponsibilities && errors.jobResponsibilities)}
                                    helperText={touched.jobResponsibilities && errors.jobResponsibilities}
                                />


                                <Stack>
                                    <TextField
                                        select
                                        sx={{
                                            ".MuiInputBase-root": { borderRadius: '4px' },
                                            '& > :not(style)': { m: 0 },
                                            "& .MuiInputLabel-root": { fontSize: 15 },
                                            width: '100%'
                                        }}
                                        label="Years of experience*"
                                        value={values.experience}
                                        {...getFieldProps('experience')} >
                                        {
                                            experienceData?.map((data, idx) => (
                                                <MenuItem key={idx} value={data} >{data}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <FormHelperText>{touched.experience && errors.experience}</FormHelperText>
                                </Stack>

                                <Stack>
                                    <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap sx={{ pb: 1 }}  >
                                        {
                                            locations.map((skill, idx) => (
                                                <Chip label={skill} key={idx} sx={{ borderRadius: "4px" }}
                                                    onDelete={() => removeLocation(idx)}
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
                                            label="Location*"
                                            value={newLocation}
                                            onChange={(e) => { setNewLocation(e.target.value) }}
                                            onKeyPress={handleKeyPress}
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
                                                letterSpacing: 0.4, mt: 1
                                            }}
                                            onClick={() => addLocation()}
                                        >Add Location</Button>
                                    </FormControl>
                                </Stack>

                                <Stack>
                                    <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap sx={{ pb: 1 }}  >
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
                                            onKeyPress={handleKeyPress}
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

                                <Stack>
                                    <FormControl>
                                        <TextField select sx={{
                                            ".MuiInputBase-root": { borderRadius: '4px' },
                                            '& > :not(style)': { m: 0 },
                                            "& .MuiInputLabel-root": { fontSize: 15 },
                                            width: '100%'
                                        }}
                                            label="Currency*"
                                            value={values.currencyName}
                                            onChange={(e) => {
                                                const selectedCurrency = currencyData.find(currency => currency.name === e.target.value);
                                                if (selectedCurrency) {
                                                    setFieldValue("currencyName", selectedCurrency?.name)
                                                    setFieldValue("currencySymbol", selectedCurrency?.symbol)
                                                }
                                            }}
                                        >
                                            {
                                                currencyData?.map((data, idx) => (
                                                    <MenuItem key={idx} value={data?.name} >{data?.name}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        <FormHelperText>{touched.currencyName && errors.currencyName}</FormHelperText>
                                    </FormControl>
                                    <Stack sx={{ pt: 2 }} spacing={2} >
                                        <Typography variant="profilePageTitle">Salary Range*</Typography>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1} >
                                            <TextField
                                                sx={{
                                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                                    '& > :not(style)': { m: 0 },
                                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                                }}
                                                {...getFieldProps("salaryMin")}
                                                onKeyPress={handleKeyPress}
                                                error={Boolean(touched.salaryMin && errors.salaryMin)}
                                                helperText={touched.salaryMin && errors.salaryMin}
                                                label="Minimum*"
                                            />
                                            <TextField
                                                sx={{
                                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                                    '& > :not(style)': { m: 0 },
                                                    "& .MuiInputLabel-root": { fontSize: 15 },
                                                }}
                                                {...getFieldProps("salaryMax")}
                                                onKeyPress={handleKeyPress}
                                                error={Boolean(touched.salaryMax && errors.salaryMax)}
                                                helperText={touched.salaryMax && errors.salaryMax}
                                                label="Miximum*"
                                            />
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <TextField
                                        select
                                        sx={{
                                            ".MuiInputBase-root": { borderRadius: '4px' },
                                            '& > :not(style)': { m: 0 },
                                            "& .MuiInputLabel-root": { fontSize: 15 },
                                            width: '100%'
                                        }}
                                        label="Type of position*"
                                        value={values.employmentType}
                                        {...getFieldProps('employmentType')} >
                                        {
                                            employmentTypeData?.map((data, idx) => (
                                                <MenuItem key={idx} value={data} >{data}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                    <FormHelperText>{touched.employmentType && errors.employmentType}</FormHelperText>
                                </Stack>
                                <Box>
                                    <FormControl>
                                        <Typography variant="profilePageTitle" >Visa Sponsorship*</Typography>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={values?.visaSponsorship}
                                            onChange={(e) => setFieldValue("visaSponsorship", e.target.value)}
                                        >
                                            <FormControlLabel
                                                value={true} control={<Radio size="sm" />}
                                                label={<Typography sx={{ fontSize: 14, fontWeight: 600, ml: -0.6 }} >Yes</Typography>}
                                            />
                                            <FormControlLabel value={false} control={<Radio size="sm" />}
                                                label={<Typography sx={{ fontSize: 14, fontWeight: 600, ml: -0.6 }} >No</Typography>}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl>
                                        <Typography variant="profilePageTitle" >Re Located*</Typography>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={values?.reLocation}
                                            onChange={(e) => setFieldValue("reLocation", e.target.value)}
                                        >
                                            <FormControlLabel value={true} control={<Radio size="sm" />}
                                                label={<Typography sx={{ fontSize: 14, fontWeight: 600, ml: -0.6 }} >Yes</Typography>} />
                                            <FormControlLabel value={false} control={<Radio size="sm" />}
                                                label={<Typography sx={{ fontSize: 14, fontWeight: 600, ml: -0.6 }} >No</Typography>}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Button size="small" variant="outlined" type="submit"
                                    onClick={() => console.log(errors)}
                                    sx={{ fontSize: 14, width: "124px", fontWeight: 500 }}
                                >Save</Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Form>
            </FormikProvider>
        </Box>
    )
}
