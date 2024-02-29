import { useCallback, useEffect, useState } from "react"
import { server } from "../../utils/server"
import { useDropzone } from 'react-dropzone'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { Box, Button, MenuItem, Stack, TextField, Typography, Select, Chip, FormHelperText, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import recruiterServices from "../../services/recruiterServices"
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomDescription from "../../components/customDescription"
import 'react-quill/dist/quill.snow.css'
import jobServices from "../../services/jobServices"
import { employmentTypeData, experienceData } from "../../utils/basicData"


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
        employmentType: Yup.string().required("Employment Type is required"),
        visaSponsorship: Yup.boolean().required("Visa Sponsorship Name is required"),
        reLocation: Yup.boolean().required("Relocation is required")
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

    const currencyData = [
        {
            name: "United States Dollar $",
            symbol: "$"
        },
        {
            name: "Euro €",
            symbol: "€"
        },
        {
            name: "Japanese Yen ¥",
            symbol: "¥"
        },
        {
            name: "British Pound Sterling  £",
            symbol: "£"
        },
        {
            name: "Swiss Franc  CHF",
            symbol: "CHF"
        },
        {
            name: "Canadian Dollar  CA$",
            symbol: "CA$"
        },
        {
            name: "Australian Dollar  A$",
            symbol: "A$"
        },
        {
            name: "Chinese Yuan Renminbi ¥",
            symbol: "¥"
        },
        {
            name: "Swedish Krona SEK",
            symbol: "SEK"
        },
        {
            name: "New Zealand Dollar NZ$",
            symbol: "NZ$"
        },
        {
            name: "Norwegian Krone kr",
            symbol: "kr"
        },
        {
            name: "Danish Krone kr",
            symbol: "kr"
        },
        {
            name: "Singapore Dollar S$",
            symbol: "S$"
        },
        {
            name: "Hong Kong Dollar HK$",
            symbol: "HK$"
        },
        {
            name: "South Korean Won ₩",
            symbol: "₩"
        },
        {
            name: "Indian Rupee ₹",
            symbol: "₹"
        },
        {
            name: "Brazilian Real R$",
            symbol: "R$"
        },
        {
            name: "Russian Ruble ₽",
            symbol: "₽"
        },
        {
            name: "South African Rand R",
            symbol: "R"
        },
        {
            name: "Turkish Lira ₺",
            symbol: "₺"
        },
        {
            name: "Mexican Peso $",
            symbol: "$"
        },
        {
            name: "Israeli New Shekel ₪",
            symbol: "₪"
        },
        {
            name: "Emirati Dirham د.إ",
            symbol: "د.إ"
        },
        {
            name: "Saudi Riyal ﷼",
            symbol: "﷼"
        },
        {
            name: "Indonesian Rupiah Rp",
            symbol: "Rp"
        },
        {
            name: "Malaysian Ringgit RM",
            symbol: "RM"
        },
        {
            name: "Thai Baht ฿",
            symbol: "฿"
        },
        {
            name: "Egyptian Pound E£",
            symbol: "E£"
        },
        {
            name: "Polish Złoty zł",
            symbol: "zł"
        },
        {
            name: "Czech Koruna Kč",
            symbol: "Kč"
        }
    ]


    return (
        <Box sx={{ pb: 6 }}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack justifyContent={'space-between'} direction={'row'}
                    >
                        <Box sx={{
                            bgcolor: 'black', width: '18%', textAlign: "center", px: 1,
                            display: { xs: "none", sm: "none", md: "block", lg: "block" }
                        }}>
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: "100%", md: "80%", lg: "80%" }, pt: 1 }} >
                            <Typography variant="companyTitle"
                                sx={{ pl: 1 }}
                            >Let's create job</Typography>
                            <Stack spacing={2} sx={{
                                width: { xs: "100%", lg: '50%' },
                                bgcolor: 'rgb(255, 255, 255)',
                                borderRadius: 0.4, p: 1, pt: 4
                            }} >
                                <Stack>
                                    <Typography variant="profilePageTitle" >title*</Typography>
                                    <TextField
                                        sx={{ ".MuiInputBase-root": { borderRadius: "4px" }, }}
                                        {...getFieldProps("title")}
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={touched.title && errors.title}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography variant="profilePageTitle">Job Overview*</Typography>
                                    <CustomDescription value={values.jobOverview} setFieldValue={(value) => setFieldValue("jobOverview", value === "<p><br></p>" ? '' : value)}
                                        error={touched.jobOverview && errors.jobOverview} />
                                </Stack>
                                <Stack  >
                                    <Typography variant="profilePageTitle" >Qualifications*</Typography>
                                    <CustomDescription value={values.qualifications} setFieldValue={(value) => setFieldValue("qualifications", value === "<p><br></p>" ? '' : value)}
                                        error={touched.qualifications && errors.qualifications} />
                                </Stack>
                                <Stack >
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
                                        sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 2 }, borderRadius: "4px" }}
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
                                <Stack sx={{ width: { xs: "100%", lg: "100%" } }} >
                                    <Typography variant="profilePageTitle" >Locations*</Typography>
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
                                            sx={{ ".MuiInputBase-root": { borderRadius: "4px" } }}
                                            value={newLocation}
                                            onChange={(e) => setNewLocation(e.target.value)}
                                        />
                                        <Button variant="blackButton" sx={{ fontSize: 12, width: 124, bgcolor: 'black', fontWeight: 500, mt: 1 }}
                                            onClick={() => addLocation()}
                                        >Add Location</Button>
                                    </FormControl>
                                </Stack>
                                <Stack>
                                    <Typography variant="profilePageTitle" >Skills*</Typography>
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
                                            sx={{ ".MuiInputBase-root": { borderRadius: "4px" } }}
                                            value={newSkillValue}
                                            onChange={(e) => setNewSkillValue(e.target.value)}
                                            error={Boolean(touched.skills && errors.skills)}
                                            helperText={touched.skills && errors.skills}
                                        />
                                        <Button variant="blackButton" type="submit"
                                            sx={{ fontSize: 12, width: 124, bgcolor: 'black', fontWeight: 500, mt: 1 }}
                                            onClick={() => addSkill()}
                                        >Add Skill</Button>
                                    </FormControl>
                                </Stack>
                                <Stack spacing={2}>
                                    <FormControl>
                                        <Typography variant="profilePageTitle" >Currency*</Typography>
                                        <Select sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 2 }, borderRadius: "4px" }}
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
                                        <FormHelperText>{touched.currencyName && errors.currencyName}</FormHelperText>
                                    </FormControl>
                                    <Stack >
                                        <Typography variant="profilePageTitle">Salary Range*</Typography>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1} >
                                            {/* <FormControl> */}
                                            <TextField sx={{ ".MuiInputBase-root": { borderRadius: "4px" }, width: '50%' }}
                                                {...getFieldProps("salaryMin")}
                                                error={Boolean(touched.salaryMin && errors.salaryMin)}
                                                helperText={touched.salaryMin && errors.salaryMin}
                                            />
                                            <TextField sx={{ ".MuiInputBase-root": { borderRadius: "4px" }, width: '50%' }}
                                                {...getFieldProps("salaryMax")}
                                                error={Boolean(touched.salaryMax && errors.salaryMax)}
                                                helperText={touched.salaryMax && errors.salaryMax}
                                            />
                                        </Stack>
                                    </Stack>
                                    <Stack>
                                        <Typography variant="profilePageTitle" >Type of position*</Typography>
                                        <Select sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 2 }, borderRadius: "4px" }}
                                            value={values.employmentType} {...getFieldProps('employmentType')}
                                        >
                                            {
                                                employmentTypeData?.map((data, idx) => (
                                                    <MenuItem key={idx} value={data} >{data}</MenuItem>
                                                ))
                                            }
                                        </Select>
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
                                </Stack>
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