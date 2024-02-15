import { useEffect, useState } from "react"
import { FormControl, FormLabel, Box, Stack, TextField, Typography, Select, MenuItem, Divider, Button, Chip, FormHelperText } from "@mui/material"
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import moment from "moment"
import { useSnackbar } from "notistack"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Iconify from "../Iconify"
import candidateServices from "../../services/candidateServices"
import { useSelector } from "react-redux"
import ExperienceFormModal from "../modal/experienceFormModal"
import EditExperienceFormModal from "../modal/graduationFormModal"
import GraduationExperienceFormModal from "../modal/graduationFormModal"


export function CandidateProfile() {
    // const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { user } = useSelector((state) => state.auth)
    const [workExperienceData, setWorkExperienceData] = useState([{}])
    const [openExperience, setOpenExperienceForm] = useState(false)
    const [openGraduation, setOpenGraduation] = useState(false)
    // const [id, setId] = useState('')

    const [skillValues, setSkillValues] = useState([])
    const [newSkillValue, setNewSkillValue] = useState('')

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
            // const educationData = v?.education?.map((data) => ({
            //     ...data, graduation: (data?.graduation).startOf('day').unix()
            // }))
            // const workData = v?.work?.map((data) => ({
            //     ...data, startDate: (data?.startDate).startOf('day').unix(),
            //     endDate: (data?.endDate).startOf('day').unix()
            // }))
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
                // workExperience: workData,
                workExperience: v?.work,
                // eduction: educationData,
                eduction: v?.education,
                skills: skillValues,
                // skills: v?.skills,
                achivements: v?.achivements,
                role: "CONDIDATE"
            }
            // console.log(data)
            updateCandidate(data)
        }
    })

    async function updateCandidate(data) {
        const id = user?._id
        const res = await candidateServices.updateCandidate({ data, id })
        setSubmitting(false)
        if (res && res.success) {
            // enqueueSnackbar(res?.message, {
            //     variant: "success",
            //     anchorOrigin: { horizontal: "right", vertical: "top" },
            //     autoHideDuration: 1000
            // })
            // setFieldValue('newSkill', '')
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    async function getCandidateById(data) {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            setFieldValue("name", res?.candidate?.candidateName)
            setFieldValue("location", res?.candidate?.location)
            setFieldValue("primaryRole", res?.candidate?.primaryRole)
            setFieldValue("experience", res?.candidate?.yearsOfExperience)
            setFieldValue("websiteLink", res?.candidate?.website)
            setFieldValue("twitterLink", res?.candidate?.twitter)
            setFieldValue("bio", res?.candidate?.bio)
            setFieldValue("linkedinLink", res?.candidate?.linkedin)
            setFieldValue("gitHubLink", res?.candidate?.gitHub)
            setFieldValue("work", res?.candidate?.workExperience || [])
            setFieldValue("education", res?.candidate?.eduction || [])
            // skills
            setSkillValues(res?.candidate?.skills || [])
            // setFieldValue("skills", res?.candidate?.skills || [])
            setFieldValue("achivements", res?.candidate?.achivements)
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    async function deleteWork(id) {
        const deleteWorkData = {
            candidateId: user?._id,
            workId: id
        }
        const res = await candidateServices.deleteWokrExp(deleteWorkData)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            getCandidateById()
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    async function deleteEducation(id) {
        const deleteWorkData = {
            candidateId: user?._id,
            educationId: id
        }
        const res = await candidateServices.deleteEducation(deleteWorkData)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            getCandidateById()
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

    const deleteSkill = (idx) => {
        setFieldValue('skills', values.skills.filter((skill, i) => i !== idx))
    }



    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <ExperienceFormModal open={openExperience} setOpen={setOpenExperienceForm}
                    candidateData={values} getCandidateById={getCandidateById}
                />
                <GraduationExperienceFormModal open={openGraduation} setOpen={setOpenGraduation}
                    candidateData={values} getCandidateById={getCandidateById} />
                <Box>
                    <Stack direction={{ xs: "column", lg: 'row' }} justifyContent={'space-between'} >
                        <Box>
                            <Stack>
                                <Typography variant="profilePageTitle" >About</Typography>
                                <Typography variant="profilePageSubText" >Tell us about yourself so startups know who you are.</Typography>
                            </Stack>
                        </Box>
                        {/* about us  */}
                        <Stack sx={{ width: { xs: "98%", lg: "60%" } }} spacing={1} >
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
                            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} >
                                <FormControl sx={{ width: { xs: "100%", lg: '50%' } }} >
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
                                <Stack sx={{ width: { xs: "100%", lg: '50%' } }} >
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
                            <FormControl>
                                <Typography>Your Bio</Typography>
                                <TextField multiline={true} rows={5}
                                    {...getFieldProps("bio")}
                                    error={Boolean(touched.bio && errors.bio)}
                                    helperText={touched.bio && errors.bio}
                                />
                            </FormControl>
                            <Button size="small" variant="blackButton" type="submit"
                                // onClick={() => console.log(values)}
                                sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                    <Divider sx={{ py: 1 }} />
                    {/* SocialLink*/}
                    <Stack direction={{ xs: "column", lg: 'row' }} justifyContent={'space-between'} sx={{ pt: 2 }} >
                        <Box>
                            <Stack>
                                <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Social Profiles</Typography>
                                <Typography variant="profilePageSubText" >Where can people find you online?</Typography>
                            </Stack>
                        </Box>
                        <Stack sx={{ width: { xs: "100%", lg: "60%" } }} spacing={1} >
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
                                // onClick={() => console.log(values)}
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
                            <Stack spacing={1} >
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
                                            <Typography variant="profilePageSubText"
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => deleteWork(data?._id)}
                                            >Remove</Typography>
                                        </Stack>
                                    ))
                                }
                            </Stack>
                            <Typography
                                sx={{
                                    fontSize: 14, pt: 1,
                                    fontWeight: 500, cursor: "pointer"
                                    , color: 'rgb(15, 111, 255)'
                                }}
                                onClick={() => setOpenExperienceForm(true)}
                            >+Add work experience</Typography>
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
                        <Stack spacing={1} sx={{ width: "60%" }} >
                            {/* {console.log(values?.education)} */}
                            {
                                values?.education.map((data, idx) => (
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
                                                    {data?.education}</Typography>
                                                {/* <Typography variant="profilePageSubText">{data?.title}s</Typography> */}
                                            </Stack>
                                        </Stack>
                                        <Typography variant="profilePageSubText"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => deleteEducation(data?._id)}
                                        >Remove</Typography>
                                    </Stack>
                                ))
                            }
                            <Typography
                                sx={{
                                    fontSize: 14, pt: 1,
                                    fontWeight: 500, cursor: "pointer"
                                    , color: 'rgb(15, 111, 255)'
                                }}
                                onClick={() => setOpenGraduation(true)}
                            >+Add work education</Typography>
                        </Stack>
                    </Stack >
                    <Divider sx={{ py: 1 }} />

                    {/* <Skills /> */}

                    <Stack direction={{ xs: "column", lg: 'row' }} justifyContent={'space-between'} sx={{ pt: 2 }} spa >
                        <Box>
                            <Stack>
                                <Typography variant="profilePageTitle" >Your Skills</Typography>
                                <Typography variant="profilePageSubText" >This will help startups hone in on your strengths.</Typography>
                            </Stack>
                        </Box>
                        <Stack sx={{ width: { xs: "100%", lg: "60%" } }} spacing={1} >
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
                                <Typography variant="profilePageTitle" >Skills?*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                    value={newSkillValue}
                                    onChange={(e) => setNewSkillValue(e.target.value)}
                                    error={Boolean(touched.skills && errors.skills)}
                                    helperText={touched.skills && errors.skills}
                                />
                                <Button variant="blackButton" type="submit" sx={{ letterSpacing: 2, textAlign: "right", width: 122, mt: 0.6 }}
                                    onClick={() => addSkill()}
                                >Add Skill</Button>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <Divider sx={{ py: 1 }} />
                    {/* <Achievements /> */}
                    <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent={'space-between'} sx={{ pt: 2 }} >
                        <Box>
                            <Stack>
                                <Typography variant="profilePageTitle" >Achievements</Typography>
                                <Typography variant="profilePageSubText" >Sharing more details about yourself will help you stand out more.</Typography>
                            </Stack>
                        </Box>
                        <Stack sx={{ width: { xs: "100%", lg: "60%" } }} spacing={1} >
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