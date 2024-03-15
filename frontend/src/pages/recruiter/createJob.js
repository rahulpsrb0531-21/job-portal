import { Children, useCallback, useEffect, useState } from "react"
import { server } from "../../utils/server"
import { useDropzone } from 'react-dropzone'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { Box, Button, MenuItem, Stack, TextField, Typography, Select, Chip, FormHelperText, FormControl, RadioGroup, FormControlLabel, Radio, Container } from "@mui/material";
import recruiterServices from "../../services/recruiterServices"
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomDescription from "../../components/customDescription"
import 'react-quill/dist/quill.snow.css'
import jobServices from "../../services/jobServices"
import { currencyData, employmentTypeData, experienceData } from "../../utils/basicData"


export default function CreateJob() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [uploadedImage, setUploadedImage] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const token = localStorage.getItem('access')
    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])

    const [skillValues, setSkillValues] = useState([])
    const [newSkillValue, setNewSkillValue] = useState('')
    const [locations, setLocations] = useState([])
    const [newLocation, setNewLocation] = useState('')

    const addSkill = () => {
        // console.log('newSkillValue', newSkillValue?.length)
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


    const createJobSchema = Yup.object().shape({
        // company 
        // recruiterId
        title: Yup.string().required("Title is required"),
        experience: Yup.string().required("Experience is required"),
        jobDescription: Yup.string().required("Job Description is required"),
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
        employmentType: Yup.string().required("Employment Type is required"),
        visaSponsorship: Yup.boolean().required("Visa Sponsorship Name is required"),
        reLocation: Yup.boolean().required("Relocation is required")
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
            // salaryCurrency: "",
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
            // console.log('v>>>>>>', v)
            const data = {
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
                visaSponsorship: (v?.visaSponsorship === "true" ? true : false),
                reLocation: (v?.reLocation === "true" ? true : false),
            }
            // console.log('data>>>>', data)
            CreateJob(data)
        }
    })

    async function CreateJob(data) {
        const res = await jobServices.createJob(data)
        setSubmitting(false)
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior for Enter key
        }
    };


    return (
        <Container maxWidth='xl' >
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack
                    // spacing={3.6} 
                    // sx={{ width: "100%" }} 
                    >
                        {/* <Stack direction={{ xs: "column", lg: 'row' }} sx={{
                            pt: 4, borderBottom: "1px solid #eee",
                            height: { xs: 200, lg: 120 }
                        }} spacing={{ xs: 2, lg: 4 }} >
                            <Stack sx={{ width: { xs: "100%", sm: "100%", md: "30%", lg: "30%" } }} spacing={0.1} >
                                <Typography
                                    sx={{ fontSize: 22, fontWeight: 600 }}
                                >Job Title</Typography>
                                <Typography variant="profilePageSubText" sx={{ pb: 0.8 }} >Tell us about yourself so startups know who you are.</Typography>
                            </Stack>
                            <Stack
                                sx={{ width: { xs: "94%", sm: "94%", md: "60%", lg: "60%" } }}
                                spacing={2.6} >
                                <TextField
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                    }}
                                    {...getFieldProps("title")}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                    label="Title*"
                                />
                            </Stack>
                        </Stack> */}
                        <Wrapper header={"Job Title"} subText={"A job Title must describe one position only."}
                            Children={(
                                <TextField
                                    sx={{
                                        ".MuiInputBase-root": { borderRadius: '4px' },
                                        '& > :not(style)': { m: 0 },
                                        "& .MuiInputLabel-root": { fontSize: 15 },
                                    }}
                                    {...getFieldProps("title")}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                    label="Title*"
                                />
                            )}
                        />

                        <Wrapper header={"Job description"} subText={"Provide a short job overview about the job,Keep it short and to the point."}
                            Children={(
                                <CustomDescription
                                    // placeholder="Job Overview*" 
                                    value={values.jobDescription} setFieldValue={(value) => setFieldValue("jobDescription", value === "<p><br></p>" ? '' : value)}
                                    error={touched.jobDescription && errors.jobDescription} />
                            )}
                        />
                        {/* <CustomDescription placeholder="Job Overview*" value={values.jobOverview} setFieldValue={(value) => setFieldValue("jobOverview", value === "<p><br></p>" ? '' : value)}
                                    error={touched.jobOverview && errors.jobOverview} />
                                <CustomDescription placeholder="Qualifications*" value={values.qualifications} setFieldValue={(value) => setFieldValue("qualifications", value === "<p><br></p>" ? '' : value)}
                                    error={touched.qualifications && errors.qualifications} />
                                <CustomDescription placeholder="Job Requirements*" value={values.jobRequirements} setFieldValue={(value) => setFieldValue("jobRequirements", value === "<p><br></p>" ? '' : value)}
                                    error={touched.jobRequirements && errors.jobRequirements} />
                                <CustomDescription placeholder="Job Responsibilities*" value={values.jobResponsibilities} setFieldValue={(value) => setFieldValue("jobResponsibilities", value === "<p><br></p>" ? '' : value)}
                                    error={touched.jobResponsibilities && errors.jobResponsibilities} /> */}

                        {/* <TextField
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
                                /> */}
                        {/* <TextField
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
                                /> */}
                        {/* <TextField
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
                                /> */}
                        {/* <TextField
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
                                /> */}


                        {/* <Stack>
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
                                </Stack> */}
                        <Wrapper
                            header={"Experience"} subText={""}
                            Children={(
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
                            )}
                        />

                        {/* locations */}
                        <Wrapper
                            header={"Locations"} subText={""}
                            Children={(
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
                                            label="Location"
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
                            )}
                        />
                        {/* skills  */}
                        <Wrapper
                            header={"Skills"} subText={""}
                            Children={(
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
                                            label="skill"
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
                            )}
                        />


                        {/* Currency   */}
                        <Wrapper
                            header={"Currency"} subText={""}
                            Children={(
                                <Stack>
                                    <FormControl>
                                        <TextField select sx={{
                                            ".MuiInputBase-root": { borderRadius: '4px' },
                                            '& > :not(style)': { m: 0 },
                                            "& .MuiInputLabel-root": { fontSize: 15 },
                                            width: '100%'
                                        }}
                                            label="Currency"
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
                                    <Stack direction={'row'} alignItems={'center'} spacing={1}
                                    // sx={{ pt: 2 }}
                                    >
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
                            )}
                        />


                        {/* Type of position  */}
                        <Wrapper
                            header={"Type of position"} subText={""}
                            Children={(
                                <Stack>
                                    <TextField
                                        select
                                        sx={{
                                            ".MuiInputBase-root": { borderRadius: '4px' },
                                            '& > :not(style)': { m: 0 },
                                            "& .MuiInputLabel-root": { fontSize: 15 },
                                            width: '100%'
                                        }}
                                        label="Type of position"
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
                            )}
                        />

                        {/* visa Sponsorship   */}
                        <Wrapper
                            header={"Visa Sponsorship"} subText={""}
                            Children={(
                                <Box>
                                    <FormControl>
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
                                    <FormHelperText>{touched.visaSponsorship && errors.visaSponsorship}</FormHelperText>
                                </Box>
                            )}
                        />

                        {/* visa Sponsorship   */}
                        <Wrapper
                            header={"Relocated"} subText={""}
                            Children={(
                                <Box>
                                    <FormControl>
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
                                    <FormHelperText>{touched.reLocation && errors.reLocation}</FormHelperText>
                                </Box>
                            )}
                        />



                        {/* <Stack>
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
                                            onChange={(e) => setNewLocation(e.target.value)}
                                            error={Boolean(touched.location && errors.location)}
                                            helperText={touched.location && errors.location}
                                        />
                                        <Button size="small"
                                            type="submit"
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
                                </Stack> */}

                        {/* <Stack>
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
                                            onChange={(e) => setNewSkillValue(e.target.value)}
                                            error={Boolean(touched.skills && errors.skills)}
                                            helperText={touched.skills && errors.skills}
                                        />
                                        <Button size="small"
                                            type="submit"
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
                                </Stack> */}

                        {/* <Stack spacing={2}>
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
                                        <FormHelperText>{touched.visaSponsorship && errors.visaSponsorship}</FormHelperText>
                                    </Box>
                                    <Box>
                                        <FormControl>
                                            <Typography variant="profilePageTitle" >Relocated*</Typography>
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
                                        <FormHelperText>{touched.reLocation && errors.reLocation}</FormHelperText>
                                    </Box>
                                </Stack> */}

                        <Button size="small" variant="outlined" type="submit"
                            onClick={() => console.log(errors)}
                            sx={{ fontSize: 14, width: "124px", fontWeight: 500 }}
                        >Save</Button>

                    </Stack>
                    {/* </Box> */}
                    {/* </Stack> */}
                </Form>
            </FormikProvider>
        </Container>
    )
}

const Wrapper = ({ header, subText, Children }) => {
    return (
        <Stack direction={{ xs: "column", lg: 'row' }} sx={{
            pt: 0, borderBottom: "1px solid #eee",
            // height: { xs: 200, lg: 120 }
            pb: 2.8
        }} spacing={{ xs: 2, lg: 4 }} >
            <Stack sx={{ width: { xs: "100%", sm: "100%", md: "30%", lg: "30%" } }} spacing={0.1} >
                <Typography
                    sx={{ fontSize: 22, fontWeight: 600 }}
                >{header}</Typography>
                <Typography variant="profilePageSubText" sx={{ pb: 0.8 }} >{subText}</Typography>
            </Stack>
            <Stack
                sx={{ width: { xs: "94%", sm: "94%", md: "60%", lg: "60%" } }}
                spacing={2.6} >
                {Children}
            </Stack>
        </Stack>
    )
}