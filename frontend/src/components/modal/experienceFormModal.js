import React from 'react';
import * as Yup from "yup"
import Dialog from '@mui/material/Dialog';
import { Box, Button, CardContent, FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material';
import Iconify from "../Iconify";
import { useSnackbar } from "notistack"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik, Form, FormikProvider } from "formik"
import candidateServices from '../../services/candidateServices';
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function ExperienceFormModal({ open, setOpen, candidateData, getCandidateById }) {

    const { user } = useSelector((state) => state.auth)
    const { enqueueSnackbar } = useSnackbar();
    const experienceSchema = Yup.object().shape({
        company: Yup.string().required("Company is required"),
        title: Yup.string().required("Title is required"),
        description: Yup.string(),
    })
    const formik = useFormik({
        initialValues: {
            company: "",
            title: "",
            startDate: null,
            endDate: null,
            description: '',
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
                workExperience: [...candidateData?.work, {
                    company: v?.company,
                    title: v?.title,
                    startDate: v.startDate,
                    // startDate: (v.startDate).startOf('day').unix(),
                    // endDate: (v.endDate).startOf('day').unix(),
                    endDate: v.endDate,
                    description: v?.description
                }],
                eduction: candidateData?.education,
                skills: candidateData?.skills,
                achivements: candidateData?.achivements,
                role: "CONDIDATE"
            }
            // console.log('data>>>>>', data)
            addExperience(data)
        },
    })

    const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik


    const handleStartDate = (newValue) => {
        setFieldValue('expiryDate', newValue);
    }

    const handleEndDate = (newValue) => {
        setFieldValue('expiryDate', newValue);
    }

    const onKeyDown = (e) => {
        e.preventDefault();
    }

    const onClose = () => {
        setOpen(false);
        resetForm()
    }

    async function addExperience(data) {
        const id = user?._id
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
                                <Typography variant="profilePageTitle">Company*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                    {...getFieldProps("company")}
                                    error={Boolean(touched.company && errors.company)}
                                    helperText={touched.company && errors.company}
                                />
                            </Stack>
                            <Stack >
                                <Typography variant="profilePageTitle">title*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                    {...getFieldProps("title")}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
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
                                            setFieldValue("startDate", value)
                                        }}
                                        renderInput={(params) => <TextField onKeyDown={onKeyDown} fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <Stack >
                                <Typography variant="profilePageTitle">End Date*</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        inputFormat="DD/MM/YYYY"
                                        views={['year', 'month', 'day']}
                                        onChange={(value) => {
                                            setFieldValue("endDate", value)
                                        }}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <Box>
                                <Typography variant="profilePageTitle">Description</Typography>
                                <TextField multiline={true} rows={4}
                                    fullWidth
                                    size="small"
                                    type="text"
                                    {...getFieldProps("description")}
                                />
                            </Box>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} spacing={1} >
                            <Button variant="outlined" sx={{ width: 80 }}
                                onClick={() => onClose()}
                            >Cancel</Button>
                            <Button variant="blackButton" sx={{ letterSpacing: 2 }} type="submit"
                                onClick={() => console.log(values)}
                            >Save</Button>
                        </Stack>
                    </Stack>
                    {/* </CardContent> */}
                </Form>
            </FormikProvider>
        </Dialog>
    );
}
