import React, { useCallback, useState } from 'react';
import * as Yup from "yup"
import Dialog from '@mui/material/Dialog';
import { Box, Button, CardContent, FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material';
import Iconify from "../components/Iconify";
import { useSnackbar } from "notistack"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik, Form, FormikProvider } from "formik"
import candidateServices from '../services/candidateServices';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Axios from "axios"
import { useDropzone } from 'react-dropzone';
import { server } from '../utils/server';
import { useLocation, useNavigate } from 'react-router-dom';
import applicationServices from '../services/applicationServices';

export default function CreateApplication({ open, setOpen, candidateData }) {
    const { state } = useLocation()
    const navigate = useNavigate()
    // console.log('state', state)
    const { user } = useSelector((state) => state.auth)
    const { enqueueSnackbar } = useSnackbar();
    const experienceSchema = Yup.object().shape({
        resume: Yup.mixed(),
        coverLetter: Yup.mixed(),
        academicCertificates: Yup.mixed(),
        professionalCertificates: Yup.mixed(),
        proofOfIdentity: Yup.mixed(),
        proofOfAddress: Yup.mixed(),
        workPermits: Yup.mixed(),
        righttoWorkDocumentation: Yup.mixed(),
        drivingLicense: Yup.mixed(),
        dbs: Yup.mixed(),
        healthDeclaration: Yup.mixed(),
        offerLetter: Yup.mixed(),
    })
    const formik = useFormik({
        initialValues: {
            resume: null,
            coverLetter: null,
            academicCertificates: null,
            professionalCertificates: null,
            proofOfIdentity: null,
            proofOfAddress: null,
            workPermits: null,
            righttoWorkDocumentation: null,
            drivingLicense: null,
            dbs: null,
            healthDeclaration: null,
            offerLetter: null
        },
        validationSchema: experienceSchema,
        onSubmit: (v) => {
            const data = {
                candidateId: user?._id,
                jobId: state,
                resume: v?.resume,
                coverLetter: v?.coverLetter,
                academicCertificates: v?.academicCertificates,
                professionalCertificates: v?.professionalCertificates,
                proofOfIdentity: v?.proofOfIdentity,
                proofOfAddress: v?.proofOfAddress,
                workPermits: v?.workPermits,
                righttoWorkDocumentation: v?.righttoWorkDocumentation,
                drivingLicense: v?.drivingLicense,
                dbs: v?.dbs,
                healthDeclaration: v?.healthDeclaration,
                offerLetter: v?.offerLetter
            }
            // console.log('data>>>>>', data)
            createApplication(data)
        },
    })

    const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik

    const onKeyDown = (e) => {
        e.preventDefault();
    }

    async function createApplication(data) {
        // const data = {
        //     candidateId: user?._id,
        //     jobId: state?._id,
        //     about: "Testing Application"
        // }
        // console.log(data)
        const res = await applicationServices.create(data)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            navigate('/jobs/applications')
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }


    return (
        <Box sx={{
            bgcolor: 'rgb(255, 255, 255)',
            // width: '100%',
            borderRadius: 0.4, mt: 4, ml: 1,
            border: '1px solid #e0e0e0', borderRadius: "8px"
        }}>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    {/* <CardContent > */}
                    <Stack spacing={2} sx={{ p: 2 }}  >
                        <Stack direction={'row'} justifyContent='space-between' alignItems={'center'} >
                            <Typography variant="h4" color={"#2D2F39"}>Create Application</Typography>
                        </Stack>
                        <Stack spacing={2} >
                            {/* <Stack direction={'row'} alignItems={'center'} >
                                <Typography variant="profilePageTitle">Company*</Typography>
                                <UploadPdf setFieldValue={setFieldValue} uploadName={"resume"} />
                            </Stack> */}
                            {/* <Stack direction={'row'}>
                                <Typography variant="profilePageTitle">Cover Letter*</Typography> */}
                            <UploadPdf title="resume" setFieldValue={setFieldValue} uploadName={"resume"} />
                            <UploadPdf title="cover Letter" setFieldValue={setFieldValue} uploadName={"coverLetter"} />
                            <UploadPdf title="academic Certificates" setFieldValue={setFieldValue} uploadName={"academicCertificates"} />
                            <UploadPdf title="professional Certificates" setFieldValue={setFieldValue} uploadName={"professionalCertificates"} />
                            <UploadPdf title="Proof Of Identity" setFieldValue={setFieldValue} uploadName={"proofOfIdentity"} />
                            <UploadPdf title="Proof Of Address" setFieldValue={setFieldValue} uploadName={"proofOfAddress"} />
                            <UploadPdf title="Work Permits/Visa" setFieldValue={setFieldValue} uploadName={"workPermits"} />
                            <UploadPdf title="Right to Work Documentation" setFieldValue={setFieldValue} uploadName={"righttoWorkDocumentation"} />
                            <UploadPdf title="Driving License" setFieldValue={setFieldValue} uploadName={"drivingLicense"} />
                            <UploadPdf title="Disclosure and Barring Service" setFieldValue={setFieldValue} uploadName={"dbs"} />
                            <UploadPdf title="Health Declaration" setFieldValue={setFieldValue} uploadName={"healthDeclaration"} />
                            <UploadPdf title="Employment Contracts or Offer Letter" setFieldValue={setFieldValue} uploadName={"offerLetter"} />
                        </Stack>
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

const UploadPdf = ({ setFieldValue, uploadName, title }) => {
    const [upload, setUpload] = useState(null)
    const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]
    const { user } = useSelector((state) => state.auth)


    const onDrop = useCallback((acceptedFiles) => {
        const docFile = acceptedFiles[0];

        // Display resume file name
        setUpload(docFile.name);

        // Upload the resume file to the server using axios or your preferred HTTP library
        const formData = new FormData();
        formData.append('resume', docFile);
        server.post(`upload/candidate/document`, formData)
            .then(res => {
                setFieldValue(uploadName, res?.data?.filePath)
                // console.log('res.data', res.data)
                // return res.data
            })
            .catch(err => {
                return null
            })
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.pdf, .doc, .docx', // Accept only specific file types
        maxFiles: 1,
    })
    return (
        <Stack direction={'row'} spacing={2} alignItems={'center'} >
            <Box sx={{ width: 180 }} >
                <Typography variant="profilePageTitle" sx={{ pb: 1 }}>
                    {title}*
                </Typography>
            </Box>
            <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                {upload ? (
                    <Typography variant="body1">{upload}</Typography>
                ) : isDragActive ? (
                    <Typography variant="body1">Drop the files here...</Typography>
                ) : (
                    <Stack alignItems={'center'} >
                        {/* <Iconify icon={"ph:file-pdf-bold"} sx={{ width: 42, height: 42 }} /> */}
                        <Typography sx={{ fontSize: 14 }} >Upload {title}</Typography>
                    </Stack>
                )}
            </div>
            {/* </FormControl> */}
        </Stack>
    )
}

const dropzoneStyles = {
    border: '1px dashed #cccccc',
    borderRadius: '4px',
    padding: '2px',
    textAlign: 'center',
    cursor: 'pointer',
    width: "40%"
}