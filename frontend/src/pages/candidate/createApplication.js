import React, { useCallback, useState, useEffect } from 'react';
import * as Yup from "yup"
import Dialog from '@mui/material/Dialog';
import { Box, Button, CardContent, Divider, FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Iconify from "../../components/Iconify";
import { useSnackbar } from "notistack"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik, Form, FormikProvider, getIn } from "formik"
import candidateServices from '../../services/candidateServices';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Axios from "axios"
import { useDropzone } from 'react-dropzone';
import { server } from '../../utils/server';
import { useLocation, useNavigate } from 'react-router-dom';
import applicationServices from '../../services/applicationServices';
import { experienceData } from '../../utils/basicData';

export default function CreateApplication({ open, setOpen, candidateData }) {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [candidate, setCandidate] = useState({})
    const { user } = useSelector((state) => state.auth)
    const { enqueueSnackbar } = useSnackbar();
    const experienceSchema = Yup.object().shape({
        totalYearExp: Yup.string().required("Total Years Experience"),
        relavantWork: Yup.string().required("Write relevant work experience")
    })
    const formik = useFormik({
        initialValues: {
            totalYearExp: "",
            relavantWork: ""
        },
        validationSchema: experienceSchema,
        onSubmit: (v) => {
            const data = {
                totalYearExp: v?.totalYearExp,
                relavantWork: v?.relavantWork,
                candidateId: user?._id,
                jobId: state,
                resume: candidate?.resume
            }
            // console.log('data>>>>>', data)
            if (candidate?.resume?.length !== 0) {
                createApplication(data)
                // console.log("fine")
            } else {
                enqueueSnackbar("Please Upload Resume ", {
                    variant: "error",
                    anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
                })
            }
        },
    })

    const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik

    const onKeyDown = (e) => {
        e.preventDefault();
    }

    async function createApplication(data) {
        const res = await applicationServices.create(data)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            navigate('/jobs/applications')
        } else {
            enqueueSnackbar(res?.data?.message, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    useEffect(() => {
        getCandidateById()
    }, [])

    async function getCandidateById(data) {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            setCandidate(res?.candidate)
        } else {
            console.log(res?.data)
            enqueueSnackbar('Something went wrong', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }


    return (
        <Box sx={{
            bgcolor: 'rgb(255, 255, 255)',
            width: { xs: '96%' },
            borderRadius: 0.4, mt: 4,
            border: '1px solid #e0e0e0', borderRadius: "8px"
        }}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    {/* <CardContent > */}
                    <Stack spacing={2} sx={{ p: 2 }}  >
                        <Typography variant="h4" color={"#2D2F39"}>Create Application</Typography>

                        <Stack spacing={0.6}>
                            <Typography variant="profilePageTitle" >Total work experience*</Typography>
                            <Select
                                sx={{
                                    ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 },
                                    width: { xs: "98%", lg: '58%' }
                                }}
                                value={values.totalYearExp} {...getFieldProps('totalYearExp')}
                            >
                                {
                                    experienceData?.map((data, idx) => (
                                        <MenuItem key={idx} value={data} >{data}</MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>{touched.totalYearExp && errors.totalYearExp}</FormHelperText>
                        </Stack>
                        <Stack spacing={0.6}>
                            <Typography variant="profilePageTitle" >Write relevant work experience?*</Typography>
                            <TextField
                                multiline={true}
                                rows={4}
                                sx={{
                                    ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 },
                                    width: { xs: "98%", lg: '58%' }
                                }}
                                placeholder='Write a note to Dkrin to let them know why you think you’d be a good fit.'
                                {...getFieldProps("relavantWork")}
                                error={Boolean(touched.relavantWork && errors.relavantWork)}
                                helperText={touched.relavantWork && errors.relavantWork}


                            />
                        </Stack>
                        <Divider />
                        <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} spacing={1} >
                            <Button variant="outlined" sx={{ width: 80 }}
                            // onClick={() => onClose()}
                            >Cancel</Button>
                            <Button variant="blackButton" sx={{ letterSpacing: 2 }} type="submit"
                                onClick={() => console.log(values)}
                            >Save</Button>
                        </Stack>
                    </Stack>
                </Form>
            </FormikProvider>
        </Box>
    )
}