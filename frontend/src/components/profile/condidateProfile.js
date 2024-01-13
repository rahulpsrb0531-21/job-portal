import { useEffect, useState } from "react"
import { FormControl, FormLabel, Box, Stack, TextField, Typography, Select, MenuItem, Divider, Button, Chip, FormHelperText } from "@mui/material"
import * as Yup from "yup"
import moment from "moment"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { useSnackbar } from "notistack"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Iconify from "../Iconify"
import candidateServices from "../../services/candidateServices"
import { useSelector } from "react-redux"


export function CandidateProfile() {
    // const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { candidate } = useSelector((state) => state.auth)
    const [workExperienceData, setWorkExperienceData] = useState([{}])

    const candidateProfileSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        location: Yup.string().required("location is required"),
        primaryRole: Yup.string().required("Primary Role is required"),
        experience: Yup.string().required("Experience is required"),
        bio: Yup.string(),
        websiteLink: Yup.string(),
        twitterLink: Yup.string(),
        linkedinLink: Yup.string(),
        gitHubLink: Yup.string(),
        work: Yup.array().of(
            Yup.object().shape({
                company: Yup.string().required("Company is required"),
                title: Yup.string().required("Title is required"),
                startDate: Yup.date().required("Start Date is required"),
                endDate: Yup.date().required("End Date is required"),
                description: Yup.string()
            })),
        education: Yup.array().of(
            Yup.object().shape({
                education: Yup.string().required("Education is required"),
                // graduation: dayjs(Date.now()),
                graduation: Yup.date().required("Graduation is required"),
                degreeAndMajor: Yup.string().required("Degree And Major is required"),
                // degree: Yup.string().required("Degree is required"),
                gpa: Yup.string(),
                gpaMax: Yup.string()
            })),
        skills: Yup.array(),
        newSkill: Yup.string(),
        achivements: Yup.string().max(1000, 'Upto 1000 characters')
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            location: "",
            primaryRole: "",
            experience: "",
            bio: "",
            websiteLink: "",
            twitterLink: "",
            linkedinLink: "",
            gitHubLink: "",
            work: [],
            education: [],
            skills: [],
            newSkill: "",
            achivements: "",
        },
        validationSchema: candidateProfileSchema,
        onSubmit: (v) => {
            // console.log('v >>>>>', v)
            const educationData = v?.education?.map((data) => ({
                ...data, graduation: (data?.graduation).startOf('day').unix()
            }))
            const workData = v?.work?.map((data) => ({
                ...data, startDate: (data?.startDate).startOf('day').unix(),
                endDate: (data?.endDate).startOf('day').unix()
            }))
            const data = {
                candidateName: v?.name,
                location: v?.location,
                primaryRole: v?.primaryRole,
                yearsOfExperience: v?.experience,
                bio: v?.bio,
                website: v?.websiteLink,
                linkedin: v?.linkedinLink,
                twitter: v?.twitterLink,
                gitHub: v?.gitHubLink,
                workExperience: workData,
                // workExperience: v?.work,
                eduction: educationData,
                // eduction: v?.education,
                skills: v?.skills,
                achivements: v?.achivements,
                role: "CONDIDATE"
            }
            console.log(data)
            updateCandidate(data)
        }
    })

    async function updateCandidate(data) {
        const id = candidate?._id
        const res = await candidateServices.updateCandidate({ data, id })
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    async function getCandidateById(data) {
        const id = candidate?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            console.log('candidate', res?.candidate)
            setFieldValue("name", res?.candidate?.candidateName)
            setFieldValue("location", res?.candidate?.location)
            setFieldValue("primaryRole", res?.candidate?.primaryRole)
            setFieldValue("experience", res?.candidate?.yearsOfExperience)
            setFieldValue("websiteLink", res?.candidate?.website)
            setFieldValue("twitterLink", res?.candidate?.twitter)
            setFieldValue("linkedinLink", res?.candidate?.linkedin)
            setFieldValue("gitHubLink", res?.candidate?.gitHub)
            const educationData = await res?.candidate?.eduction?.map((data, idx) => (
                {
                    ...data,
                    graduation: (moment.unix(data?.graduation))
                }
            ))
            setFieldValue("education", educationData)
            const workData = await res?.candidate?.workExperience?.map((data, idx) => (
                {
                    ...data,
                    startDate: (moment.unix(data?.startDate)),
                    endDate: (moment.unix(data?.endDate))
                }
            ))
            // setWorkExperienceData(res?.candidate?.workExperience)
            setFieldValue("work", workData)
            // skills
            setFieldValue("skills", res?.candidate?.skills)
            setFieldValue("achivements", res?.candidate?.achivements)
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }
    useEffect(() => {
        getCandidateById()
    }, [])

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

    const primaryRoleOption = [
        "Software Engineer", "Mobile Developer", "Android Developer", "iOS Developer", "Frontend Engineer", "Backend Engineer",
        "Full-Stack Enginner", "Sotware Architect", "Machine Learning Engineer", "Embedded Engineer", "Data Engineer", "DevOps",
        "Engineeting Manager", "QA Engineer", "Data Scientist", "Designer", "UI/UX Designer", "User Researcher", "Visual Designer",
        "Creative Director", "Graphic Designer", "Product Designer", "Product Manager", "Operations", "Finance/Accounting", "H.R.",
        "Office Manager", "Recruiter", "Customer Service", "Operations Manager", "Sales", "Business Development", "Sales Development Representative",
        "Account Executive", "BD Manager", "Account Manager", "Sales Manager", "Customer Success Manager", "Marketing", "Growth Hacker",
        "Marketing Manager", "Content Creator", "Copywriter", "Social Media Manager", "Management", "CEO", "CFO", "CMO", "COO", "CTO",
        "Other Engineering", "Hardware Engineer", "Mechanical Engineer", "Systems Engineer", "Other", "Business Analyst", "Project Manager",
        "Attorney", "Data Analyst", "Investor", "Founder"
    ]

    const experienceData = [
        "< 1 Year", "1 Year", "2 Year", "3 Year", "4 Year", "5 Year", "6 Year", "7 Year", "8 Year", "9 Year", "10+ Year",
    ]

    const degreeData = [
        "Associate's Degree", "Bachelor of Arts (BA)", "Bachelor of Business Administration (BBA)", "Bachelor of Engineering (BEng)", "Bachelor of Fine Arts (BFA)", "Bachlor of Science (BS)", "Bachelor's Degree", "Engineer's Degree", "Master of Arts (MA)", "Master of Business Administration (MBA)", "Master of Fine Arts (MFA)", "Master of Science (MS)", "Master's Degree", "Doctor of Philosophy (PhD)", "Doctor of Medicine (MD)", "juris Doctor (JD)", "High School Diploma", "Non-Degree Program (eg. Coursera certificate)", "Other"
    ]

    const onKeyDown = (e) => {
        e.preventDefault();
    }

    const deleteSkill = (idx) => {
        setFieldValue('skills', values.skills.filter((skill, i) => i !== idx))
    }

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box>
                    <Stack direction={'row'} justifyContent={'space-between'} >
                        <Box>
                            <Stack>
                                <Typography variant="profilePageTitle" >About</Typography>
                                <Typography variant="profilePageSubText" >Tell us about yourself so startups know who you are.</Typography>
                            </Stack>
                        </Box>
                        {/* about us  */}
                        <Stack sx={{ width: "60%" }} spacing={1} >
                            <FormControl>
                                <Typography variant="profilePageTitle">Your name*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                    {...getFieldProps("name")}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography variant="profilePageTitle" >Where are you based?*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                    {...getFieldProps("location")}
                                    error={Boolean(touched.location && errors.location)}
                                    helperText={touched.location && errors.location}
                                />
                            </FormControl>
                            {/* select option */}
                            <Stack direction={'row'} spacing={2} >
                                <FormControl sx={{ width: '72%' }} >
                                    <Typography variant="profilePageTitle" >Select your primary role*</Typography>
                                    <Select sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
                                        value={values.primaryRole} {...getFieldProps('primaryRole')} >
                                        {
                                            primaryRoleOption?.map((data, idx) => (
                                                <MenuItem key={idx} value={data} >{data}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <FormHelperText>{touched.primaryRole && errors.primaryRole}</FormHelperText>
                                </FormControl>
                                <FormControl >
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
                                </FormControl>
                            </Stack>
                            <FormControl>
                                <Typography>Your Bio</Typography>
                                <TextField multiline={true} rows={5}
                                    {...getFieldProps("bio")}
                                    error={Boolean(touched.bio && errors.bio)}
                                    helperText={touched.bio && errors.bio}
                                />
                            </FormControl>
                            <Button size="small" variant="blackButton" type="submit"
                                onClick={() => console.log(values)}
                                sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                    <Divider sx={{ py: 1 }} />
                    {/* SocialLink*/}
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
                        <Box>
                            <Stack>
                                <Typography variant="profilePageTitle" >Social Profiles</Typography>
                                <Typography variant="profilePageSubText" >Where can people find you online?</Typography>
                            </Stack>
                        </Box>
                        <Stack sx={{ width: "60%" }} spacing={1} >
                            <FormControlCompoment
                                errors={errors} touched={touched} values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps}
                                title="websiteLink" />
                            <FormControlCompoment
                                errors={errors} touched={touched} values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps}
                                title="linkedinLink" />
                            <FormControlCompoment
                                errors={errors} touched={touched} values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps}
                                title="twitterLink" />
                            <FormControlCompoment
                                errors={errors} touched={touched} values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps}
                                title="gitHubLink" />
                            <Button size="small" variant="blackButton" type="submit"
                                onClick={() => console.log(values)}
                                sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                            >Save</Button>
                        </Stack>
                    </Stack>
                    <Divider sx={{ py: 1 }} />
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
                        <Box>
                            <Stack>
                                <Typography variant="profilePageTitle" >Your work experience</Typography>
                                <Typography variant="profilePageSubText" >What other positions have you held?</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ width: "60%" }} >
                            {/* <Stack direction={'row'} justifyContent={'space-between'} sx={{
                                bgcolor: 'rgb(255, 255, 255)',
                                p: 2, borderRadius: "4px",
                                border: "1px solid rgb(224, 224, 224)",
                                borderLeftColor: "rgb(224, 224, 224)",
                                borderBottomColor: "rgb(224, 224, 224)"
                            }} >
                                <Stack direction={'row'} spacing={1}>
                                    <Iconify icon={"bx:building"}
                                        sx={{ width: 32, height: 32, border: "1px solid rgb(224, 224, 224)", borderRadius: '4px' }} />
                                    <Stack>
                                        <Typography variant="profilePageTitle">Full Stack Developer</Typography>
                                        <Typography variant="profilePageSubText">CreativeWebo</Typography>
                                    </Stack>
                                </Stack>
                                <Typography variant="profilePageSubText">Edit</Typography>
                            </Stack> */}
                            {
                                values?.work?.map((data, idx) => (
                                    <Stack direction={'row'} justifyContent={'space-between'} sx={{
                                        bgcolor: 'rgb(255, 255, 255)',
                                        p: 2, borderRadius: "4px",
                                        border: "1px solid rgb(224, 224, 224)",
                                        borderLeftColor: "rgb(224, 224, 224)",
                                        borderBottomColor: "rgb(224, 224, 224)"
                                    }} >
                                        <Stack direction={'row'} spacing={1}>
                                            <Iconify icon={"bx:building"}
                                                sx={{ width: 32, height: 32, border: "1px solid rgb(224, 224, 224)", borderRadius: '4px' }} />
                                            <Stack>
                                                <Typography variant="profilePageTitle">{data?.title}</Typography>
                                                <Typography variant="profilePageSubText">{data?.company}</Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography variant="profilePageSubText">Edit</Typography>
                                    </Stack>
                                ))
                            }
                            <Typography
                                sx={{
                                    fontSize: 14, pt: 1,
                                    fontWeight: 500, cursor: "pointer"
                                    , color: 'rgb(15, 111, 255)'
                                }}
                                onClick={() => {
                                    // const temp = values?.work
                                    const temp = workExperienceData
                                    temp.push({
                                        company: "",
                                        title: "",
                                        startDate: null,
                                        endDate: null,
                                        description: ""
                                        // currentWorkHere: ""
                                    })
                                    setWorkExperienceData(temp)
                                    // setFieldValue("work", temp)
                                }}
                            >+Add work experience</Typography>

                            {/* form  */}
                            <Stack spacing={2} >
                                {
                                    workExperienceData?.map((e, i) => {

                                        // if (i > 0) {
                                        return (
                                            <Stack spacing={2} >
                                                {/* <Stack direction={'row'} justifyContent={'space-between'} sx={{
                                                    bgcolor: 'rgb(255, 255, 255)',
                                                    p: 2, borderRadius: "4px",
                                                    border: "1px solid rgb(224, 224, 224)",
                                                    borderLeftColor: "rgb(224, 224, 224)",
                                                    borderBottomColor: "rgb(224, 224, 224)"
                                                }} >
                                                    <Stack direction={'row'} spacing={1}>
                                                        <Iconify icon={"bx:building"}
                                                            sx={{ width: 32, height: 32, border: "1px solid rgb(224, 224, 224)", borderRadius: '4px' }} />
                                                        <Stack>
                                                            <Typography variant="profilePageTitle">{values.work[i].title}</Typography>
                                                            <Typography variant="profilePageSubText">{values.work[i].company}</Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Typography variant="profilePageSubText">Edit</Typography>
                                                </Stack> */}

                                                {
                                                    <Stack sx={{ bgcolor: "rgb(250, 250, 250)", p: 1.4, borderRadius: "4px" }} spacing={1} >
                                                        <FormControl>
                                                            <Typography variant="profilePageTitle">Company</Typography>
                                                            <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                                                onChange={(value) => setWorkExperienceData(workExperienceData[i]?.company)}
                                                            // {...getFieldProps(`work[${i}].company`)}
                                                            // error={Boolean(getIn(touched, `work[${i}].company`) &&
                                                            //     getIn(errors, `work[${i}].company`)
                                                            // )}
                                                            // helperText={
                                                            //     getIn(touched, `work[${i}].company`) &&
                                                            //     getIn(errors, `work[${i}].company`)
                                                            // }
                                                            />
                                                        </FormControl>
                                                        <FormControl>
                                                            <Typography variant="profilePageTitle">Title</Typography>
                                                            <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                                                {...getFieldProps(`work[${i}].title`)}
                                                                error={Boolean(getIn(touched, `work[${i}].title`) &&
                                                                    getIn(errors, `work[${i}].title`)
                                                                )}
                                                                helperText={
                                                                    getIn(touched, `work[${i}].title`) &&
                                                                    getIn(errors, `work[${i}].title`)
                                                                }
                                                            />
                                                        </FormControl>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                                                <FormControl>
                                                                    <Typography variant="profilePageTitle">Start Date*</Typography>
                                                                    <DatePicker
                                                                        sx={{ ".css-zqoy3u-MuiInputBase-input-MuiOutlinedInput-input": { p: 1.4 } }}
                                                                        inputFormat="DD/MM/YYYY"
                                                                        views={['year', 'month', 'day']}
                                                                        value={values?.work[i]?.startDate}
                                                                        {...getFieldProps(`work[${i}].startDate`)}
                                                                        onChange={(value) => {
                                                                            setFieldValue(`work[${i}].startDate`, value)
                                                                        }}
                                                                        error={Boolean(getIn(touched, `work[${i}].startDate`) &&
                                                                            getIn(errors, `work[${i}].startDate`)
                                                                        )}
                                                                        helperText={
                                                                            getIn(touched, `work[${i}].startDate`) &&
                                                                            getIn(errors, `work[${i}].startDate`)
                                                                        }
                                                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} fullWidth {...params} />}
                                                                    />
                                                                </FormControl>
                                                                <FormControl>
                                                                    <Typography variant="profilePageTitle">End Date*</Typography>
                                                                    <DatePicker
                                                                        sx={{ ".css-zqoy3u-MuiInputBase-input-MuiOutlinedInput-input": { p: 1.4 } }}
                                                                        inputFormat="DD/MM/YYYY"
                                                                        views={['year', 'month', 'day']}
                                                                        value={values?.work[i]?.endDate}
                                                                        {...getFieldProps(`work[${i}].endDate`)}
                                                                        onChange={(value) => {
                                                                            setFieldValue(`work[${i}].endDate`, value)
                                                                        }}
                                                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} fullWidth {...params} />}
                                                                    />
                                                                </FormControl>
                                                                {/* <FormControl>
                                                            <Typography variant="profilePageTitle">End Date*</Typography>
                                                            <DatePicker
                                                                sx={{ ".css-zqoy3u-MuiInputBase-input-MuiOutlinedInput-input": { p: 1.4 } }}
                                                                inputFormat="DD/MM/YYYY"
                                                                views={['year', 'month', 'day']}
                                                                value={values?.work[i]?.endDate}
                                                                {...getFieldProps(`work[${i}].graduation`)}
                                                                onChange={(value) => {
                                                                    setFieldValue(`education[${i}].graduation`, value)
                                                                }}
                                                                error={Boolean(getIn(touched, `education[${i}].graduation`) &&
                                                                    getIn(errors, `education[${i}].graduation`)
                                                                )}
                                                                helperText={
                                                                    getIn(touched, `education[${i}].graduation`) &&
                                                                    getIn(errors, `education[${i}].graduation`)
                                                                }
                                                                renderInput={(params) => <TextField onKeyDown={onKeyDown} fullWidth {...params} />}
                                                            />
                                                        </FormControl> */}
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                        <FormControl>
                                                            <Typography variant="profilePageTitle">Description</Typography>
                                                            <TextField multiline={true} rows={4}
                                                                {...getFieldProps(`work[${i}].description`)}
                                                                error={Boolean(getIn(touched, `work[${i}].description`) &&
                                                                    getIn(errors, `work[${i}].description`)
                                                                )}
                                                                helperText={
                                                                    getIn(touched, `work[${i}].description`) &&
                                                                    getIn(errors, `work[${i}].description`)
                                                                }
                                                            />
                                                        </FormControl>
                                                        <Stack direction={'row'} justifyContent={'end'} alignContent={'center'} spacing={1} >
                                                            <Button variant="outlined"
                                                                onClick={() => {
                                                                    const temp = values?.work;
                                                                    temp.splice(i, 1);
                                                                    setFieldValue('work', temp);
                                                                }}
                                                            >Cancel</Button>
                                                            <Button variant="blackButton" sx={{ letterSpacing: 2 }} type="submit"
                                                                onClick={() => console.log(errors)}
                                                            >Save</Button>
                                                        </Stack>
                                                    </Stack>
                                                }
                                            </Stack>
                                        )
                                        // }
                                    })
                                }
                            </Stack>
                        </Box>
                    </Stack>
                    <Divider sx={{ py: 1 }} />
                    {/* Education */}
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
                        <Box>
                            <Stack>
                                <Typography variant="profilePageTitle" >Education</Typography>
                                <Typography variant="profilePageSubText" >What schools have you studied at?</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ width: "60%" }} >
                            {console.log(moment.unix(values?.education[0]))}
                            <Stack direction={'row'} justifyContent={'space-between'} sx={{
                                bgcolor: 'rgb(255, 255, 255)',
                                p: 2, borderRadius: "4px",
                                border: "1px solid rgb(224, 224, 224)",
                                borderLeftColor: "rgb(224, 224, 224)",
                                borderBottomColor: "rgb(224, 224, 224)"
                            }} >
                                <Stack direction={'row'} spacing={1}
                                >
                                    <Iconify icon={"fluent-mdl2:education"}
                                        sx={{ width: 32, height: 32, border: "1px solid rgb(224, 224, 224)", borderRadius: '4px' }} />
                                    <Stack>
                                        <Typography variant="profilePageTitle">
                                            Guru Nanak Khalsa College Of Arts, Science & Commerce</Typography>
                                        <Typography variant="profilePageSubText">Computer Science, Bachelor's</Typography>
                                    </Stack>
                                </Stack>
                                <Typography variant="profilePageSubText">Edit</Typography>
                            </Stack>
                            <Typography
                                sx={{
                                    fontSize: 14, pt: 1,
                                    fontWeight: 500, cursor: "pointer"
                                    , color: 'rgb(15, 111, 255)'
                                }}
                                onClick={() => {
                                    const temp = values?.education
                                    temp.push({
                                        education: '',
                                        graduation: null,
                                        degreeAndMajor: '',
                                        gpa: '',
                                        gpaMax: ''
                                    })
                                    setFieldValue("education", temp)
                                }}
                            >+Add work education</Typography>

                            {/* form  */}
                            {
                                values?.education?.map((e, i) => (
                                    <Stack sx={{ bgcolor: "rgb(250, 250, 250)", p: 1.4, borderRadius: "4px" }} spacing={1} >
                                        <FormControl>
                                            <Typography variant="profilePageTitle">Education*</Typography>
                                            <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                                {...getFieldProps(`education[${i}].education`)}
                                                error={Boolean(getIn(touched, `education[${i}].education`) &&
                                                    getIn(errors, `education[${i}].education`)
                                                )}
                                                helperText={
                                                    getIn(touched, `education[${i}].education`) &&
                                                    getIn(errors, `education[${i}].education`)
                                                }
                                            />
                                        </FormControl>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <FormControl>
                                                <Typography variant="profilePageTitle">Graduation</Typography>
                                                <DatePicker
                                                    sx={{ ".css-zqoy3u-MuiInputBase-input-MuiOutlinedInput-input": { p: 1.4 } }}
                                                    inputFormat="DD/MM/YYYY"
                                                    views={['year', 'month', 'day']}
                                                    value={values?.education[i]?.graduation}
                                                    {...getFieldProps(`education[${i}].graduation`)}
                                                    onChange={(value) => {
                                                        setFieldValue(`education[${i}].graduation`, value)
                                                    }}
                                                    error={Boolean(getIn(touched, `education[${i}].graduation`) &&
                                                        getIn(errors, `education[${i}].graduation`)
                                                    )}
                                                    helperText={
                                                        getIn(touched, `education[${i}].graduation`) &&
                                                        getIn(errors, `education[${i}].graduation`)
                                                    }
                                                    renderInput={(params) => <TextField onKeyDown={onKeyDown} fullWidth {...params} />}
                                                />
                                            </FormControl>
                                        </LocalizationProvider>
                                        <FormControl sx={{ width: '72%' }} >
                                            <Typography variant="profilePageTitle" >Degree</Typography>
                                            <Select sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
                                                value={values?.education[i]?.degreeAndMajor}
                                                {...getFieldProps(`education[${i}].degreeAndMajor`)}
                                                onChange={(value) => {
                                                    setFieldValue(`education[${i}].degreeAndMajor`, value?.target?.value)
                                                }}
                                                error={Boolean(getIn(touched, `education[${i}].degreeAndMajor`) &&
                                                    getIn(errors, `education[${i}].degreeAndMajor`)
                                                )}
                                                helperText={
                                                    getIn(touched, `education[${i}].degreeAndMajor`) &&
                                                    getIn(errors, `education[${i}].degreeAndMajor`)
                                                }
                                            >
                                                {
                                                    degreeData?.map((data, idx) => (
                                                        <MenuItem key={idx} value={data}>{data}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            {/* <FormHelperText>{touched.primaryRole && errors.primaryRole}</FormHelperText> */}
                                        </FormControl>
                                        <Box>
                                            <Typography>GPA</Typography>
                                            <Stack direction={'row'} spacing={1} >
                                                <FormControl>
                                                    <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                                        placeholder="GPA"
                                                        {...getFieldProps(`education[${i}].gpa`)}
                                                        error={Boolean(getIn(touched, `education[${i}].gpa`) &&
                                                            getIn(errors, `education[${i}].gpa`)
                                                        )}
                                                        helperText={
                                                            getIn(touched, `education[${i}].gpa`) &&
                                                            getIn(errors, `education[${i}].gpa`)
                                                        }
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                                        placeholder="MAX"
                                                        {...getFieldProps(`education[${i}].gpaMax`)}
                                                        error={Boolean(getIn(touched, `education[${i}].gpaMax`) &&
                                                            getIn(errors, `education[${i}].gpaMax`)
                                                        )}
                                                        helperText={
                                                            getIn(touched, `education[${i}].gpaMax`) &&
                                                            getIn(errors, `education[${i}].gpaMax`)
                                                        }
                                                    />
                                                </FormControl>
                                            </Stack>
                                        </Box>
                                        <Stack direction={'row'} justifyContent={'end'} alignContent={'center'} spacing={1} >
                                            <Button variant="outlined" >Cancel</Button>
                                            <Button variant="blackButton" type="submit" sx={{ letterSpacing: 2 }}  >Save</Button>
                                        </Stack>
                                    </Stack>
                                ))
                            }
                        </Box>
                    </Stack >
                    <Divider sx={{ py: 1 }} />
                    {/* <Skills /> */}
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
                        <Box>
                            <Stack>
                                <Typography variant="profilePageTitle" >Your Skills</Typography>
                                <Typography variant="profilePageSubText" >This will help startups hone in on your strengths.</Typography>
                            </Stack>
                        </Box>
                        <Stack sx={{ width: "60%" }} spacing={1} >
                            <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap >
                                {
                                    values?.skills.map((skill, idx) => (
                                        <Chip label={skill} key={idx} sx={{ borderRadius: "4px" }}
                                            onDelete={() => deleteSkill(idx)}
                                        />
                                    ))
                                }
                            </Stack>
                            <FormControl>
                                <Field name="newSkill">
                                    {({ field }) => (
                                        <TextField
                                            sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                            {...field}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    setFieldValue("skills", [...values.skills, e.target.value]);
                                                    setFieldValue('newSkill', ''); // Clear the TextField after adding the skill
                                                }
                                            }}
                                        />
                                    )}
                                </Field>
                                <Button variant="blackButton" type="submit" sx={{ letterSpacing: 2, textAlign: "right", width: 100, mt: 0.6 }}  >Save</Button>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <Divider sx={{ py: 1 }} />
                    {/* <Achievements /> */}
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
                        <Box>
                            <Stack>
                                <Typography variant="profilePageTitle" >Achievements</Typography>
                                <Typography variant="profilePageSubText" >Sharing more details about yourself will help you stand out more.</Typography>
                            </Stack>
                        </Box>
                        <Stack sx={{ width: "60%" }} spacing={1} >
                            <FormControl>
                                <TextField multiline={true} rows={6}
                                    sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                    placeholder="It's OK to brag - e.g. I launched 3 successful Facebook apps which in total reached 2M+ users and generated $100k+ in revenue. I built everything from the front-end to the back-end and everything in between."
                                    {...getFieldProps("achivements")}
                                    error={Boolean(touched.achivements && errors.achivements)}
                                    helperText={touched.achivements && errors.achivements}
                                />
                                <Button variant="blackButton" type="submit" sx={{ letterSpacing: 2, width: 100, mt: 0.6 }}  >Save</Button>
                            </FormControl>
                        </Stack>
                    </Stack>
                </Box>
            </Form >
        </FormikProvider >
    )
}

const FormControlCompoment = ({ title, link, errors, touched, values, getFieldProps }) => {
    return (
        <FormControl>
            <Typography variant="profilePageTitle">{title}</Typography>
            <TextField variant="outlined" value={values?.title}
                sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                {...getFieldProps(title)}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
            />
        </FormControl>
    )
}

// const Achievements = () => {
//     return (
//         <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
//             <Box>
//                 <Stack>
//                     <Typography variant="profilePageTitle" >Achievements</Typography>
//                     <Typography variant="profilePageSubText" >Sharing more details about yourself will help you stand out more.</Typography>
//                 </Stack>
//             </Box>
//             <Stack sx={{ width: "60%" }} spacing={1} >
//                 <FormControl>
//                     <TextField multiline={true} rows={6}
//                         sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
//                         placeholder="It's OK to brag - e.g. I launched 3 successful Facebook apps which in total reached 2M+ users and generated $100k+ in revenue. I built everything from the front-end to the back-end and everything in between."
//                     />
//                     <Button variant="blackButton" sx={{ letterSpacing: 2, width: 100, mt: 0.6 }}  >Save</Button>
//                 </FormControl>
//             </Stack>
//         </Stack>
//     )
// }