import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from "yup"
import Dialog from '@mui/material/Dialog';
import { Box, Button, CardContent, Divider, FormControl, FormHelperText, FormLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Iconify from "../Iconify";
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

export default function DocumentUpload({ open, setOpen, candidateData }) {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [candidate, setCandidate] = useState({})
    const { user } = useSelector((state) => state.auth)
    const { enqueueSnackbar } = useSnackbar();

    const experienceSchema = Yup.object().shape({
        totalYearExp: Yup.string().required("Total Years Experience"),
        relavantWork: Yup.string().required("Write relevant work experience"),
        resume: Yup.mixed().required("upload resume"),
        coverLetter: Yup.mixed().required("Upload Cover Letter"),
        academicCertificates: Yup.mixed().required("Upload Academic Certificates"),
        professionalCertificates: Yup.mixed().required("Upload Professional Certificates"),
        proofOfIdentity: Yup.mixed().required("Upload Proof of Identity"),
        proofOfAddress: Yup.mixed().required("Upload Proof of Address"),
        workPermits: Yup.mixed().required("Upload Work Permits/Visa"),
        righttoWorkDocumentation: Yup.mixed().required("Upload Right to Work Documentation"),
        drivingLicense: Yup.mixed().required("Upload Driving License"),
        dbs: Yup.mixed().required("Upload Disclosure and Barring Service"),
        healthDeclaration: Yup.mixed().required("Upload Health Declaration"),
        offerLetter: Yup.mixed().required("Upload Employment Contracts or Offer Letter"),
    })
    const formik = useFormik({
        initialValues: {
            totalYearExp: "",
            relavantWork: "",
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
                totalYearExp: v?.totalYearExp,
                relavantWork: v?.relavantWork,
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
        const res = await applicationServices.create(data)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            navigate('/candidate/applications')
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

    async function getCandidateById(data) {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            setCandidate(res?.candidate)
        } else {
            console.log(res?.data)
            // enqueueSnackbar('Something went wrong', {
            //     variant: "error",
            //     anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            // })
        }
    }

    const data = [
        {
            title: "resume",
            uploadName: "resume",
            docValue: candidate?.resume
        },
        {
            title: "cover Letter",
            uploadName: "coverLetter",
            docValue: candidate?.coverLetter
        },
        {
            title: "academic Certificates",
            uploadName: "academicCertificates",
            docValue: candidate?.academicCertificates
        },
        {
            title: "professional Certificates",
            uploadName: "professionalCertificates",
            docValue: candidate?.professionalCertificates
        },
        {
            title: "Proof Of Identity",
            uploadName: "proofOfIdentity",
            docValue: candidate?.proofOfIdentity
        },
        {
            title: "Proof Of Address",
            uploadName: "proofOfAddress",
            docValue: candidate?.proofOfAddress
        },
        {
            title: "Work Permits/Visa",
            uploadName: "workPermits",
            docValue: candidate?.workPermits
        },
        {
            title: "Right to Work Documentation",
            uploadName: "righttoWorkDocumentation",
            docValue: candidate?.righttoWorkDocumentation
        },
        {
            title: "Driving License",
            uploadName: "drivingLicense",
            docValue: candidate?.drivingLicense
        },
        {
            title: "Disclosure and Barring Service",
            uploadName: "dbs",
            docValue: candidate?.dbs
        },
        {
            title: "Health Declaration",
            uploadName: "healthDeclaration",
            docValue: candidate?.healthDeclaration
        },
        {
            title: "Offer Letter",
            uploadName: "offerLetter",
            docValue: candidate?.offerLetter
        },
    ]
    return (
        <Stack>
            <Typography sx={{ fontSize: { xs: 24, lg: 18 }, fontWeight: 600 }} >Upload Documents</Typography>
            {/* <Box>
                    <Stack>
                        <Typography sx={{ fontSize: { xs: 14 } }} >Tell us about yourself so startups know who you are.</Typography>
                    </Stack>
                </Box> */}
            <Stack sx={{ width: { xs: '100%', lg: "60%" } }} spacing={2} >
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        {/* <CardContent > */}
                        <Stack spacing={2} sx={{ p: 1.2 }}  >
                            <Stack spacing={2} >
                                {
                                    data?.map((doc, idx) => (
                                        <UploadPdf title={doc?.title} setFieldValue={setFieldValue}
                                            uploadName={doc?.uploadName}
                                            // textHelper={touched.resume && errors.resume}
                                            docValue={doc?.docValue}
                                            getCandidateById={getCandidateById}
                                        />
                                    ))
                                }
                            </Stack>
                        </Stack>
                    </Form>
                </FormikProvider>
            </Stack>
        </Stack>

    )
}

const UploadPdf = ({ setFieldValue, uploadName, title, docValue, getCandidateById }) => {
    const [upload, setUpload] = useState(null)
    const [updatePage, setUpdatePage] = useState(false)
    const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]
    const { user } = useSelector((state) => state.auth)


    const onDrop = useCallback((acceptedFiles) => {
        const docFile = acceptedFiles[0]
        // Display resume file name
        setUpload(docFile.name)
        // Upload the resume file to the server using axios or your preferred HTTP library
        const formData = new FormData();
        formData.append('document', docFile);
        server.post(`upload/candidate/document/${user?._id}/${uploadName}`, formData)
            .then(res => {
                setFieldValue(uploadName, res?.data?.filePath)
                getCandidateById()
            })
            .catch(err => {
                return null
            })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.pdf, .doc, .docx', // Accept only specific file types
        maxFiles: 1,
    })

    const handleDownload = async () => {
        try {
            const id = user?._id
            const response = await server.get(`api/candidate/upload/resume/${id}/${uploadName}`, { responseType: 'blob' })
            console.log("response", response)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${user?.candidateName} ${title}.pdf`)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    }

    const deleteCandidateResume = async () => {
        const data = { candidateId: user?._id, docName: uploadName }
        // console.log(id)
        const res = await candidateServices.deleteResume(data)
        if (res && res.success) {
            getCandidateById()
            // setUpdatePage(!updatePage)
            setUpload(null)
        } else {
            console.log(res)
            // enqueueSnackbar(res?.message, {
            //     variant: "error",
            //     anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            // })
        }
    }
    return (
        <Stack direction={{ lg: 'row' }} spacing={2} alignItems={{ lg: 'center' }}
        // sx={{ bgcolor: 'blue', width: '100%' }}
        >
            <Box sx={{ width: 196, pb: 0.6 }} >
                <Typography variant="profilePageTitle">
                    {title}*
                </Typography>
            </Box>
            {
                (docValue?.length === 0) ? (
                    <Box sx={{ width: { xs: '90%', lg: '46%' } }}>
                        <div {...getRootProps()} style={dropzoneStyles}>
                            <input {...getInputProps()} />
                            {upload ? (
                                <Typography variant="body1">{upload}</Typography>
                            ) : isDragActive ? (
                                <Typography variant="body1">Drop the files here...</Typography>
                            ) : (
                                <Stack alignItems={'center'} >
                                    <Typography sx={{ fontSize: 14 }} >Upload
                                        {/* {title} */}
                                    </Typography>
                                </Stack>
                            )}
                        </div>
                        {/* <FormHelperText>{textHelper}</FormHelperText> */}
                    </Box>
                ) : (
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{
                        border: '0.4px solid #ccc', width: { xs: '90%', lg: "46%" },
                        p: { xs: 0.8, lg: 1 }, borderRadius: '4px'
                    }} >
                        <Stack direction={'row'} alignItems={'center'} spacing={2} onClick={handleDownload}>
                            <Iconify icon={"ph:file-pdf-bold"} sx={{ width: { xs: 22, lg: 42 }, color: "blue" }} />
                            <Typography
                                sx={{ fontSize: { xs: 14, lg: 16 }, fontWeight: 700, cursor: "pointer" }}
                            // onClick={handleDownload}
                            >Download {title}</Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 16, fontWeight: 700, cursor: "pointer" }}
                            onClick={() => deleteCandidateResume()}
                        >X</Typography>
                    </Stack>
                )
            }
        </Stack>
    )
}

const dropzoneStyles = {
    border: '1px dashed #cccccc',
    borderRadius: '4px',
    padding: '2px',
    textAlign: 'center',
    cursor: 'pointer',
}
