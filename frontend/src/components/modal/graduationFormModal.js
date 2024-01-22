import React, { useEffect } from 'react';
import * as Yup from "yup"
import Dialog from '@mui/material/Dialog';
import { Box, Button, CardContent, FormControl, FormLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Iconify from "../Iconify";
import { useSnackbar } from "notistack"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik, Form, FormikProvider } from "formik"
import candidateServices from '../../services/candidateServices';
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function GraduationExperienceFormModal({ open, setOpen, candidateData, id, getCandidateById }) {
    // console.log("candidate", candidateData)
    const { user } = useSelector((state) => state.auth)
    // console.log(user)
    const { enqueueSnackbar } = useSnackbar();
    const experienceSchema = Yup.object().shape({
        education: Yup.string().required("Education is required"),
        graduation: Yup.date().required("Graduation is required"),
        degreeAndMajor: Yup.string().required("Degree And Major is required"),
        gpa: Yup.string(),
        gpaMax: Yup.string()
    })
    const formik = useFormik({
        initialValues: {
            education: "",
            graduation: null,
            degreeAndMajor: "",
            gpa: "",
            gpaMax: ""
        },
        validationSchema: experienceSchema,
        onSubmit: (v) => {
            // const workExp = [...candidateData?.work, {
            //     company: v?.company,
            //     title: v?.title,
            //     startDate: v.startDate.startOf('day').unix(),
            //     endDate: v.endDate.startOf('day').unix(),
            //     description: v?.description
            // }]
            const data = {
                candidateName: candidateData?.name,
                location: candidateData?.location,
                primaryRole: candidateData?.primaryRole,
                yearsOfExperience: candidateData?.experience,
                bio: candidateData?.bio,
                website: candidateData?.websiteLink,
                linkedin: candidateData?.linkedinLink,
                twitter: candidateData?.twitterLink,
                gitHub: candidateData?.gitHubLink,
                workExperience: candidateData?.work,
                eduction: [...candidateData?.education, {
                    education: v?.education,
                    graduation: v?.graduation,
                    degreeAndMajor: v?.degreeAndMajor,
                    gpa: v?.gpa,
                    gpaMax: v?.gpaMax
                }],
                skills: candidateData?.skills,
                achivements: candidateData?.achivements,
                role: "CONDIDATE"
            }
            console.log('data>>>>>', data)
            addExperience(data)
            // addReferral(data)
        },
    })

    const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik

    const onKeyDown = (e) => {
        e.preventDefault();
    }

    const onClose = () => {
        setOpen(false);
        resetForm()
    }

    async function addExperience(data) {
        const id = user?._id
        console.log('final data', data, id)
        const res = await candidateServices.updateCandidate({ data, id })
        // setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            onClose()
            getCandidateById()
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    const degreeData = [
        "Associate's Degree", "Bachelor of Arts (BA)", "Bachelor of Business Administration (BBA)", "Bachelor of Engineering (BEng)", "Bachelor of Fine Arts (BFA)", "Bachlor of Science (BS)", "Bachelor's Degree", "Engineer's Degree", "Master of Arts (MA)", "Master of Business Administration (MBA)", "Master of Fine Arts (MFA)", "Master of Science (MS)", "Master's Degree", "Doctor of Philosophy (PhD)", "Doctor of Medicine (MD)", "juris Doctor (JD)", "High School Diploma", "Non-Degree Program (eg. Coursera certificate)", "Other"
    ]

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth={'xs'}
        >
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    {/* <CardContent > */}
                    <Stack spacing={2} sx={{ p: 2 }}  >
                        <Stack direction={'row'} justifyContent='space-between' alignItems={'center'} >
                            <Typography variant="h4" color={"#2D2F39"}>Add Work Experience</Typography>
                            <Iconify
                                icon={"fluent-emoji-high-contrast:cross-mark"}
                                sx={{ width: 14, height: 14, color: '#818E94', cursor: "pointer", float: 'right' }}
                                onClick={() => onClose()}
                            />
                        </Stack>
                        <Stack spacing={1} >
                            <Stack >
                                <Typography variant="profilePageTitle">Education*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                    {...getFieldProps("education")}
                                    error={Boolean(touched.education && errors.education)}
                                    helperText={touched.education && errors.education}
                                />
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle">StartDate*</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{ ".css-zqoy3u-MuiInputBase-input-MuiOutlinedInput-input": { p: 1.4 } }}
                                        inputFormat="DD/MM/YYYY"
                                        views={['year', 'month', 'day']}
                                        onChange={(value) => {
                                            setFieldValue("graduation", value)
                                        }}
                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <Stack >
                                <Typography variant="profilePageTitle" >Degree</Typography>
                                <Select sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
                                    value={values?.degreeAndMajor}
                                    onChange={(value) => {
                                        setFieldValue(`degreeAndMajor`, value?.target?.value)
                                    }}
                                >
                                    {
                                        degreeData?.map((data, idx) => (
                                            <MenuItem key={idx} value={data}>{data}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Box>
                                <Typography>GPA</Typography>
                                <Stack direction={'row'} spacing={1} >
                                    {/* <FormControl> */}
                                    <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                        placeholder="GPA"
                                        {...getFieldProps("gpa")}
                                        error={Boolean(touched.gpa && errors.gpa)}
                                        helperText={touched.gpa && errors.gpa}
                                    />
                                    {/* </FormControl> */}
                                    {/* <FormControl> */}
                                    <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                        placeholder="MAX"
                                        {...getFieldProps("gpaMax")}
                                        error={Boolean(touched.gpaMax && errors.gpaMax)}
                                        helperText={touched.gpaMax && errors.gpaMax}
                                    />
                                    {/* </FormControl> */}
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} spacing={1} >
                            <Button variant="outlined" sx={{ width: 80 }}
                                onClick={() => onClose()}
                            >Cancel</Button>
                            <Button variant="blackButton" sx={{ letterSpacing: 2 }} type="submit"
                                onClick={() => console.log('>>>>', errors)}
                            >Save</Button>
                        </Stack>
                    </Stack>
                    {/* </CardContent> */}
                </Form>
            </FormikProvider>
        </Dialog>
    );
}
