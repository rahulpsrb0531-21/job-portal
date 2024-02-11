import { useCallback, useEffect, useState } from "react"
import { server } from "../../../utils/server"
import { currencyData, experienceDatam, experienceData } from "../../../utils/basicData"
import { useDropzone } from 'react-dropzone'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { Box, Button, MenuItem, Stack, TextField, Typography, Select, Chip, Autocomplete, FormHelperText, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomDescription from "../../../components/customDescription"
import 'react-quill/dist/quill.snow.css'
import recruiterServices from "../../../services/recruiterServices"
import adminServices from "../../../services/adminServices"


export default function CreateJobByAdmin() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [uploadedImage, setUploadedImage] = useState(null)
    const [recruiters, setRecruiters] = useState([])
    const [companies, setCompanies] = useState([])
    const { user } = useSelector((state) => state.auth)
    const onDrop = useCallback((acceptedFiles) => {
        const imageFile = acceptedFiles[0]
        setUploadedImage(URL.createObjectURL(imageFile))
        const formData = new FormData();
        formData.append('image', imageFile);
        server.post(`upload-image`, formData)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return null
            })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
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
        backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '160px',
    }

    const createJobSchema = Yup.object().shape({
        // company :
        // recruiterId
        recruiter: Yup.object().nullable(),
        title: Yup.string().required("Title is required"),
        experience: Yup.string().required("Experience is required"),
        jobOverview: Yup.string().required("Job Overview is required"),
        qualifications: Yup.string().required("Qualifications is required"),
        jobRequirements: Yup.string().required("Job Requirements is required"),
        jobResponsibilities: Yup.string().required("Job Responsibilities is required"),
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
        reLocation: Yup.boolean().required("Re Location is required")
    })
    const formik = useFormik({
        initialValues: {
            title: "",
            experience: "",
            jobOverview: "",
            qualifications: "",
            jobRequirements: "",
            jobResponsibilities: "",
            salaryMin: 0,
            salaryMax: 0,
            recruiter: null,
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
        validationSchema: createJobSchema,
        onSubmit: (v) => {
            const data = {
                company: { racruiterName: v?.recruiter?.label, ...v?.recruiter },
                recruiterId: v?.recruiter?._id,
                title: (v?.title).charAt(0).toUpperCase() + (v?.title).substring(1),
                experience: v?.experience,
                jobOverview: v?.jobOverview,
                qualifications: v?.qualifications,
                jobRequirements: v?.jobRequirements,
                jobResponsibilities: v?.jobResponsibilities,
                salaryRange: {
                    minimum: v?.salaryMin,
                    maximum: v?.salaryMax
                },
                salaryCurrency: {
                    name: v?.currencyName,
                    symbol: v?.currencySymbol
                },
                location: v?.location,
                skills: v?.skills,
                employmentType: v?.employmentType,
                visaSponsorship: (v?.visaSponsorship === "true" ? true : false),
                reLocation: (v?.reLocation === "true" ? true : false),
            }
            console.log('data>>>>', data)
            CreateJob(data)
        }
    })

    async function CreateJob(data) {
        const res = await adminServices.createJob(data)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            // handleNext()
            navigate('/admin/jobs')

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

    useEffect(() => {
        if (user?.role === "ADMIN") {
            getAllRecruiter()
        }
    }, [user])

    async function getAllRecruiter() {
        const res = await recruiterServices.getAllRecruiter()
        // console.log(res)
        if (res && res.data.length > 0) {
            setRecruiters(
                res.data.map(({ recruiterName: label, ...rest }) => (
                    {
                        label,
                        ...rest
                    }))
            )
        } else {
            setRecruiters([])
            setFieldValue("recruiter", null)
            // enqueueSnackbar("No Projects Availble",{variant:"error",anchorOrigin:{horizontal:"right",vertical:"top"}})
        }
    }

    const deleteSkill = (idx) => {
        setFieldValue('skills', values.skills.filter((data, i) => i !== idx))
    }

    const deleteLocation = (idx) => {
        setFieldValue('location', values.location.filter((data, i) => i !== idx))
    }

    const employmentTypeData = ["Full-Time", "Part-Time", "Contract"]
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack justifyContent={'space-between'} direction={'row'}
                // sx={{ "& .css-pis1bl": { p: 0 } }}
                >
                    <Box sx={{ width: "80%" }} >
                        <Stack spacing={1.6} sx={{
                            width: '50%',
                            bgcolor: 'rgb(255, 255, 255)',
                            borderRadius: 0.4
                        }} >
                            <Typography variant="companyTitle" >Let's create job</Typography>
                            <Stack>
                                <Typography variant="profilePageTitle" >Name*</Typography>
                                <Autocomplete
                                    fullWidth
                                    disableClearable
                                    options={recruiters}
                                    id="combo-box-demo"
                                    value={values.recruiter}
                                    onChange={(event, value) => { setFieldValue("recruiter", value) }}
                                    ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            sx={{ "& .MuiOutlinedInput-root": { p: 0, pl: 1 } }}
                                            placeholder="Recruiter Name"
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >title*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("title")}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                            </Stack>
                            <Stack spacing={6.8} >
                                <Stack>
                                    <Typography variant="profilePageTitle">Job Overview*</Typography>
                                    <CustomDescription value={values.jobOverview} setFieldValue={(value) => setFieldValue("jobOverview", value === "<p><br></p>" ? '' : value)}
                                        error={touched.jobOverview && errors.jobOverview} />
                                </Stack>
                                <Stack >
                                    <Typography variant="profilePageTitle" >Qualifications*</Typography>
                                    <CustomDescription value={values.qualifications} setFieldValue={(value) => setFieldValue("qualifications", value === "<p><br></p>" ? '' : value)}
                                        error={touched.qualifications && errors.qualifications} />
                                </Stack>
                                <Stack>
                                    <Typography variant="profilePageTitle" >Job Requirements*</Typography>
                                    <CustomDescription value={values.jobRequirements} setFieldValue={(value) => setFieldValue("jobRequirements", value === "<p><br></p>" ? '' : value)}
                                        error={touched.jobRequirements && errors.jobRequirements} />
                                </Stack>
                                <Stack>
                                    <Typography variant="profilePageTitle" >Job Responsibilities*</Typography>
                                    <CustomDescription value={values.jobResponsibilities} setFieldValue={(value) => setFieldValue("jobResponsibilities", value === "<p><br></p>" ? '' : value)}
                                        error={touched.jobResponsibilities && errors.jobResponsibilities} />
                                </Stack>
                                <Stack>
                                    <Typography variant="profilePageTitle" >Years of experience*</Typography>
                                    <Select
                                        sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
                                        value={values.experience} {...getFieldProps('experience')}
                                    >
                                        {
                                            experienceData?.map((data, idx) => (
                                                <MenuItem key={idx} value={data} >{data}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{touched.experience && errors.experience}</FormHelperText>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Location*</Typography>
                                <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap sx={{ pb: 1 }} >
                                    {
                                        values?.location.map((data, idx) => (
                                            <Chip label={data} key={idx} sx={{ borderRadius: "4px" }}
                                                onDelete={() => deleteLocation(idx)}
                                            />
                                        ))
                                    }
                                </Stack>
                                <Field name="newLocation">
                                    {({ field }) => (
                                        <TextField
                                            sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                            {...field}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    setFieldValue("location", [...values.location, e.target.value])
                                                    setFieldValue('newLocation', '')
                                                }
                                            }}
                                        />
                                    )}
                                </Field>
                            </Stack>
                            <Typography variant="profilePageTitle">Salary</Typography>
                            <Stack spacing={1} >
                                <Typography variant="profilePageTitle" >Currency*</Typography>
                                <Select
                                    sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
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
                                </Select>
                                <Stack>
                                    <Typography variant="profilePageTitle" >Salary Range</Typography>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1} >
                                        <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                            {...getFieldProps("salaryMin")}
                                            error={Boolean(touched.salaryMin && errors.salaryMin)}
                                            helperText={touched.salaryMin && errors.salaryMin}
                                        />
                                        <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                            {...getFieldProps("salaryMax")}
                                            error={Boolean(touched.salaryMax && errors.salaryMax)}
                                            helperText={touched.salaryMax && errors.salaryMax}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Type of position**</Typography>
                                <Select
                                    sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
                                    value={values.employmentType} {...getFieldProps('employmentType')}
                                >
                                    {
                                        employmentTypeData?.map((data, idx) => (
                                            <MenuItem key={idx} value={data} >{data}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Skills*</Typography>
                                <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap sx={{ pb: 1 }} >
                                    {
                                        values?.skills.map((skill, idx) => (
                                            <Chip label={skill} key={idx} sx={{ borderRadius: "4px" }}
                                                onDelete={() => deleteSkill(idx)}
                                            />
                                        ))
                                    }
                                </Stack>
                                <Field name="newSkill">
                                    {({ field }) => (
                                        <TextField
                                            sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                            {...field}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    setFieldValue("skills", [...values.skills, e.target.value])
                                                    setFieldValue('newSkill', '')
                                                }
                                            }}
                                        />
                                    )}
                                </Field>
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
                            {/* <Stack>
                                <Typography variant="profilePageTitle" >Phone*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("phone")}
                                    error={Boolean(touched.phone && errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                />
                            </Stack> */}
                            <Button size="small" variant="outlined" type="submit"
                                onClick={() => console.log(errors)}
                                sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                            >Save</Button>
                        </Stack>
                    </Box>
                </Stack>
            </Form>
        </FormikProvider>
    )
}


// const dropzoneStyles = {
//     border: '2px dashed #cccccc',
//     borderRadius: '4px',
//     padding: '20px',
//     textAlign: 'center',
//     cursor: 'pointer',
// };

// const imagePreviewStyles = {
//     marginTop: '20px',
//     maxWidth: '200px', // Adjust the maximum width of the preview as needed
//     maxHeight: '200px', // Adjust the maximum height of the preview as needed
// };