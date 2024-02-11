import { useCallback, useEffect, useState } from "react"
import { server } from "../../utils/server"
import { useDropzone } from 'react-dropzone'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { Box, Button, MenuItem, Stack, TextField, Typography, Select, Chip, FormHelperText } from "@mui/material";
import recruiterServices from "../../services/recruiterServices"
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomDescription from "../../components/customDescription"
import 'react-quill/dist/quill.snow.css'
import jobServices from "../../services/jobServices"


export default function CreateJob() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [uploadedImage, setUploadedImage] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const token = localStorage.getItem('access')
    useEffect(() => {
        if (user?.role !== "RECRUITER" && token) {
            navigate('/login')
        }
    }, [])

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
        employmentType: Yup.string().required("Employment Typee is required"),
        // visaSponsorship: Yup.boolean().required("Visa Sponsorship Name is required"),
        // reLocation: Yup.boolean().required("Visa Sponsorship Name is required")
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
            // visaSponsorship: false,
            // reLocation: false
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
                location: v?.location,
                skills: v?.skills,
                employmentType: v?.employmentType,
                visaSponsorship: false,
                reLocation: false,
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

    const deleteSkill = (idx) => {
        setFieldValue('skills', values.skills.filter((data, i) => i !== idx))
    }

    const deleteLocation = (idx) => {
        setFieldValue('location', values.location.filter((data, i) => i !== idx))
    }

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

    const experienceData = [
        "< 1 Year", "1 Year", "2 Year", "3 Year", "4 Year", "5 Year", "6 Year", "7 Year", "8 Year", "9 Year", "10+ Year",
    ]

    const employmentTypeData = ["Full-Time", "Part-Time", "Contract"]
    return (
        <Box>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack justifyContent={'space-between'} direction={'row'}
                    // sx={{ "& .css-pis1bl": { p: 0 } }}
                    >
                        <Box sx={{ bgcolor: 'black', width: '18%', textAlign: "center", px: 1 }} >
                            <Typography sx={{ color: "white", fontSize: 18, pt: 4 }} >Set up your account</Typography>
                            <Typography sx={{ color: "white", fontSize: 12 }} >We make it easy for you to connect with high-quality startup talent who are ready for a new challenge.start sourcing today</Typography>
                        </Box>
                        <Box sx={{ width: "80%" }} >
                            <Stack spacing={1.6} sx={{
                                width: '50%',
                                bgcolor: 'rgb(255, 255, 255)',
                                borderRadius: 0.4, p: 1, pt: 4
                            }} >
                                <Typography variant="companyTitle" >Let's create job</Typography>
                                {/* <Stack>
                                <Typography variant="profilePageTitle" >About your Company</Typography>
                                <Typography variant="profilePageSubText" >Keep in mind you can always update this later</Typography>
                            </Stack> */}
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
                                <Stack sx={{ pt: 5 }} >
                                    <Typography variant="profilePageTitle" >Qualifications*</Typography>
                                    <CustomDescription value={values.qualifications} setFieldValue={(value) => setFieldValue("qualifications", value === "<p><br></p>" ? '' : value)}
                                        error={touched.qualifications && errors.qualifications} />
                                </Stack>
                                <Stack sx={{ pt: 5 }}>
                                    <Typography variant="profilePageTitle" >Job Requirements*</Typography>
                                    <CustomDescription value={values.jobRequirements} setFieldValue={(value) => setFieldValue("jobRequirements", value === "<p><br></p>" ? '' : value)}
                                        error={touched.jobRequirements && errors.jobRequirements} />
                                </Stack>
                                <Stack sx={{ pt: 5 }}>
                                    <Typography variant="profilePageTitle" >Job Responsibilities*</Typography>
                                    <CustomDescription value={values.jobResponsibilities} setFieldValue={(value) => setFieldValue("jobResponsibilities", value === "<p><br></p>" ? '' : value)}
                                        error={touched.jobResponsibilities && errors.jobResponsibilities} />
                                </Stack>
                                <Stack sx={{ pt: 5 }}>
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
                                        // onChange={(value) => console.log(value.target)}
                                        // {...getFieldProps('salaryCurrency')}
                                        onChange={(e) => {
                                            // handleChange(e);
                                            const selectedCurrency = currencyData.find(currency => currency.name === e.target.value);
                                            if (selectedCurrency) {
                                                setFieldValue("currencyName", selectedCurrency?.name)
                                                setFieldValue("currencySymbol", selectedCurrency?.symbol)
                                                //   handleChange({ target: { name: 'currSymbol', value: selectedCurrency.currencySymbol } });
                                            }
                                        }}
                                    >
                                        {
                                            currencyData?.map((data, idx) => (
                                                <MenuItem key={idx} value={data?.name} >{data?.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <Stack sx={{ pt: 1. }}>
                                        <Typography variant="profilePageTitle">Salary Range</Typography>
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