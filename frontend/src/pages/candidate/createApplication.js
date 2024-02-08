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
            // width: '100%',
            borderRadius: 0.4, mt: 4, ml: 1,
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
                                    width: '58%'
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
                                    width: '58%'
                                }}
                                placeholder='Write a note to Dkrin to let them know why you think you’d be a good fit.'
                                {...getFieldProps("relavantWork")}
                                error={Boolean(touched.relavantWork && errors.relavantWork)}
                                helperText={touched.relavantWork && errors.relavantWork}


                            />
                        </Stack>
                        <Divider />
                        {/* <Stack spacing={2} >
                            <UploadPdf title="resume" setFieldValue={setFieldValue} uploadName={"resume"}
                                textHelper={touched.resume && errors.resume} />
                            <UploadPdf title="cover Letter" setFieldValue={setFieldValue} uploadName={"coverLetter"}
                                textHelper={touched.coverLetter && errors.coverLetter}
                            />
                            <UploadPdf title="academic Certificates" setFieldValue={setFieldValue} uploadName={"academicCertificates"}
                                textHelper={touched.academicCertificates && errors.academicCertificates}
                            />
                            <UploadPdf title="professional Certificates" setFieldValue={setFieldValue} uploadName={"professionalCertificates"}
                                textHelper={touched.professionalCertificates && errors.professionalCertificates}
                            />
                            <UploadPdf title="Proof Of Identity" setFieldValue={setFieldValue} uploadName={"proofOfIdentity"}
                                textHelper={touched.proofOfIdentity && errors.proofOfIdentity}
                            />
                            <UploadPdf title="Proof Of Address" setFieldValue={setFieldValue} uploadName={"proofOfAddress"}
                                textHelper={touched.proofOfAddress && errors.proofOfAddress}
                            />
                            <UploadPdf title="Work Permits/Visa" setFieldValue={setFieldValue} uploadName={"workPermits"}
                                textHelper={touched.workPermits && errors.workPermits}
                            />
                            <UploadPdf title="Right to Work Documentation" setFieldValue={setFieldValue} uploadName={"righttoWorkDocumentation"}
                                textHelper={touched.righttoWorkDocumentation && errors.righttoWorkDocumentation}
                            />
                            <UploadPdf title="Driving License" setFieldValue={setFieldValue} uploadName={"drivingLicense"}
                                textHelper={touched.drivingLicense && errors.drivingLicense}
                            />
                            <UploadPdf title="Disclosure and Barring Service" setFieldValue={setFieldValue} uploadName={"dbs"}
                                textHelper={touched.dbs && errors.dbs}
                            />
                            <UploadPdf title="Health Declaration" setFieldValue={setFieldValue} uploadName={"healthDeclaration"}
                                textHelper={touched.healthDeclaration && errors.healthDeclaration}
                            />
                            <UploadPdf title="Employment Contracts or Offer Letter" setFieldValue={setFieldValue} uploadName={"offerLetter"}
                                textHelper={touched.offerLetter && errors.offerLetter}
                            />
                        </Stack> */}
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

const UploadPdf = ({ setFieldValue, uploadName, title, textHelper }) => {
    const [upload, setUpload] = useState(null)
    const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]
    const { user } = useSelector((state) => state.auth)


    const onDrop = useCallback((acceptedFiles) => {
        const docFile = acceptedFiles[0];

        // Display resume file name
        setUpload(docFile.name);

        // Upload the resume file to the server using axios or your preferred HTTP library
        const formData = new FormData();
        formData.append('document', docFile);
        server.post(`upload/candidate/document/${user?._id}/${uploadName}`, formData)
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
            <Box sx={{ width: 196 }} >
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
            <FormHelperText>{textHelper}</FormHelperText>
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