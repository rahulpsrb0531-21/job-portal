import { useCallback, useEffect, useState } from "react"
import { server } from "../../../utils/server"
import { useDropzone } from 'react-dropzone'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { Box, Button, MenuItem, Stack, TextField, Typography, Select, Chip, FormHelperText, Card, Stepper, Step, StepContent, StepLabel, Accordion, AccordionSummary, Container } from "@mui/material";
import recruiterServices from "../../../services/recruiterServices"
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomDescription from "../../../components/customDescription"
import 'react-quill/dist/quill.snow.css'
import jobServices from "../../../services/jobServices"
import CreateRecruiter from "../../../components/admin/accordion/createRecruiter"
import CreateCompany from "../../../components/admin/accordion/createCompany"
import JobForm from "../../../components/jobForm"


export default function CreateJobByAdmin() {
    const adminUser = "RECRUITER"
    const [activeStep, setActiveStep] = useState(0)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    // const navigate = useNavigate()
    // const { enqueueSnackbar } = useSnackbar()
    // const [uploadedImage, setUploadedImage] = useState(null)
    // const { user } = useSelector((state) => state.auth)
    // const onDrop = useCallback((acceptedFiles) => {
    //     const imageFile = acceptedFiles[0]
    //     setUploadedImage(URL.createObjectURL(imageFile))
    //     const formData = new FormData();
    //     formData.append('image', imageFile);
    //     server.post(`upload-image`, formData)
    //         .then(res => {
    //             return res.data
    //         })
    //         .catch(err => {
    //             return null
    //         })
    // }, [])
    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     accept: 'image/*',
    //     maxFiles: 1,
    // })
    // const dropzoneStyles = {
    //     border: '1px dashed #cccccc',
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: 'center',
    //     borderRadius: '4px',
    //     padding: '20px',
    //     // textAlign: 'center',
    //     cursor: 'pointer',
    //     backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     height: '160px',
    // }

    // const editRecruiterSchema = Yup.object().shape({
    //     // company 
    //     // recruiterId
    //     title: Yup.string().required("Title is required"),
    //     experience: Yup.string().required("Experience is required"),
    //     jobOverview: Yup.string().required("Job Overview is required"),
    //     qualifications: Yup.string().required("Qualifications is required"),
    //     jobRequirements: Yup.string().required("Job Requirements is required"),
    //     jobResponsibilities: Yup.string().required("Job Responsibilities is required"),
    //     salaryMin: Yup.number().required("Salary Minimum is required"),
    //     salaryMax: Yup.number().required("Salary Maximum is required"),
    //     // salaryCurrency: Yup.string().required("Salary Currency is required"),
    //     currencyName: Yup.string().required("Salary Currency is required"),
    //     currencySymbol: Yup.string(),
    //     location: Yup.array().required("Location is required"),
    //     newLocation: Yup.string(),
    //     skills: Yup.array(),
    //     newSkill: Yup.string(),
    //     employmentType: Yup.string().required("Employment Typee is required"),
    //     // visaSponsorship: Yup.boolean().required("Visa Sponsorship Name is required"),
    //     // reLocation: Yup.boolean().required("Visa Sponsorship Name is required")
    // })
    // const formik = useFormik({
    //     initialValues: {
    //         title: "",
    //         experience: "",
    //         jobOverview: "",
    //         qualifications: "",
    //         jobRequirements: "",
    //         jobResponsibilities: "",
    //         salaryMin: 0,
    //         salaryMax: 0,
    //         // salaryCurrency: "",
    //         currencyName: "",
    //         currencySymbol: "",
    //         location: [],
    //         newLocation: "",
    //         skills: [],
    //         newSkill: "",
    //         employmentType: "",
    //         // visaSponsorship: false,
    //         // reLocation: false
    //     },
    //     validationSchema: editRecruiterSchema,
    //     onSubmit: (v) => {
    //         // console.log('v>>>>>>', v)
    //         const data = {
    //             company: user,
    //             recruiterId: user?._id,
    //             title: v?.title,
    //             experience: v?.experience,
    //             jobOverview: v?.jobOverview,
    //             qualifications: v?.qualifications,
    //             jobRequirements: v?.jobRequirements,
    //             jobResponsibilities: v?.jobResponsibilities,
    //             salaryRange: {
    //                 minimum: v?.salaryMin,
    //                 maximum: v?.salaryMax
    //             },
    //             salaryCurrency: {
    //                 name: v?.currencyName,
    //                 symbol: v?.currencySymbol
    //             },
    //             location: v?.location,
    //             skills: v?.skills,
    //             employmentType: v?.employmentType,
    //             visaSponsorship: false,
    //             reLocation: false,
    //         }
    //         // console.log('data>>>>', data)
    //         // CreateJob(data)
    //     }
    // })

    // async function CreateJob(data) {
    //     const res = await jobServices.createJob(data)
    //     setSubmitting(false)
    //     if (res && res.success) {
    //         enqueueSnackbar(res?.message, {
    //             variant: "success",
    //             anchorOrigin: { horizontal: "right", vertical: "top" },
    //             autoHideDuration: 1000
    //         })
    //         navigate('/recruiter/jobs')
    //     } else {
    //         enqueueSnackbar('error', {
    //             variant: "error",
    //             anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
    //         })
    //     }
    // }

    // const {
    //     errors,
    //     touched,
    //     values,
    //     isSubmitting,
    //     handleSubmit,
    //     getFieldProps,
    //     setSubmitting,
    //     setFieldValue, resetForm
    // } = formik

    // const deleteSkill = (idx) => {
    //     setFieldValue('skills', values.skills.filter((data, i) => i !== idx))
    // }

    // const deleteLocation = (idx) => {
    //     setFieldValue('location', values.location.filter((data, i) => i !== idx))
    // }

    // const currencyData = [
    //     {
    //         name: "United States Dollar $",
    //         symbol: "$"
    //     },
    //     {
    //         name: "Euro €",
    //         symbol: "€"
    //     },
    //     {
    //         name: "Japanese Yen ¥",
    //         symbol: "¥"
    //     },
    //     {
    //         name: "British Pound Sterling  £",
    //         symbol: "£"
    //     },
    //     {
    //         name: "Swiss Franc  CHF",
    //         symbol: "CHF"
    //     },
    //     {
    //         name: "Canadian Dollar  CA$",
    //         symbol: "CA$"
    //     },
    //     {
    //         name: "Australian Dollar  A$",
    //         symbol: "A$"
    //     },
    //     {
    //         name: "Chinese Yuan Renminbi ¥",
    //         symbol: "¥"
    //     },
    //     {
    //         name: "Swedish Krona SEK",
    //         symbol: "SEK"
    //     },
    //     {
    //         name: "New Zealand Dollar NZ$",
    //         symbol: "NZ$"
    //     },
    //     {
    //         name: "Norwegian Krone kr",
    //         symbol: "kr"
    //     },
    //     {
    //         name: "Danish Krone kr",
    //         symbol: "kr"
    //     },
    //     {
    //         name: "Singapore Dollar S$",
    //         symbol: "S$"
    //     },
    //     {
    //         name: "Hong Kong Dollar HK$",
    //         symbol: "HK$"
    //     },
    //     {
    //         name: "South Korean Won ₩",
    //         symbol: "₩"
    //     },
    //     {
    //         name: "Indian Rupee ₹",
    //         symbol: "₹"
    //     },
    //     {
    //         name: "Brazilian Real R$",
    //         symbol: "R$"
    //     },
    //     {
    //         name: "Russian Ruble ₽",
    //         symbol: "₽"
    //     },
    //     {
    //         name: "South African Rand R",
    //         symbol: "R"
    //     },
    //     {
    //         name: "Turkish Lira ₺",
    //         symbol: "₺"
    //     },
    //     {
    //         name: "Mexican Peso $",
    //         symbol: "$"
    //     },
    //     {
    //         name: "Israeli New Shekel ₪",
    //         symbol: "₪"
    //     },
    //     {
    //         name: "Emirati Dirham د.إ",
    //         symbol: "د.إ"
    //     },
    //     {
    //         name: "Saudi Riyal ﷼",
    //         symbol: "﷼"
    //     },
    //     {
    //         name: "Indonesian Rupiah Rp",
    //         symbol: "Rp"
    //     },
    //     {
    //         name: "Malaysian Ringgit RM",
    //         symbol: "RM"
    //     },
    //     {
    //         name: "Thai Baht ฿",
    //         symbol: "฿"
    //     },
    //     {
    //         name: "Egyptian Pound E£",
    //         symbol: "E£"
    //     },
    //     {
    //         name: "Polish Złoty zł",
    //         symbol: "zł"
    //     },
    //     {
    //         name: "Czech Koruna Kč",
    //         symbol: "Kč"
    //     }
    // ]

    // const experienceData = [
    //     "< 1 Year", "1 Year", "2 Year", "3 Year", "4 Year", "5 Year", "6 Year", "7 Year", "8 Year", "9 Year", "10+ Year",
    // ]

    const adminSteps = [
        {
            title: "Reacuiter Create Account",
            component: <CreateRecruiter handleNext={handleNext} />,
            activeIndex: 0
        },
        {
            title: "Create Company",
            component: <CreateCompany handleNext={handleNext} />,
            activeIndex: 1
        },
        {
            title: "Create Job",
            component: <JobForm handleNext={handleNext} />,
            activeIndex: 2
        },
    ]

    const employmentTypeData = ["Full-Time", "Part-Time", "Contract"]
    return (
        <>
            {/* <Form autoComplete="off" noValidate onSubmit={handleSubmit}> */}
            {/* <Card sx={{
                    bgcolor: 'rgb(255, 255, 255)', width: '60%',
                    borderRadius: 0.4, p: 2,
                    border: '1px solid #e0e0e0', borderRadius: "8px"
                }}> */}
            {/* <Stack spacing={1} sx={{
                        width: '80%',
                        bgcolor: 'rgb(255, 255, 255)',
                        borderRadius: 0.4, p: 1, pt: 0
                    }} >
                        <Typography variant="companyTitle" >Let's create Job</Typography>
                        <Stack>
                            <Typography variant="profilePageTitle" >title*</Typography>
                            <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
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
                        <Stack>
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
                        <Typography>Salary</Typography>
                        <Stack>
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
                                <Typography>Salary Range</Typography>
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
                        <Button size="small" variant="outlined" type="submit"
                            onClick={() => console.log(errors)}
                            sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                        >Save</Button>
                    </Stack> */}
            <Container>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {
                        adminSteps?.map((data, idx) => {
                            return (
                                <Step key={idx} >
                                    <StepLabel sx={{ "& .MuiSvgIcon-root.Mui-completed": { color: '#35BB59' }, "& .MuiSvgIcon-root.Mui-active": { color: '#35BB59' } }} >
                                        <Typography
                                            sx={{ fontSize: 26, fontWeight: 700, color: 'gb(6, 6, 6)' }}
                                        >{data?.title}</Typography>
                                    </StepLabel>
                                    <StepContent>
                                        {data?.component}
                                    </StepContent>
                                </Step>
                            )
                        })
                    }
                </Stepper>
            </Container>
            {/* </Card> */}
            {/* </Form> */}
        </>
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