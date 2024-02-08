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
            navigate('/jobs/applications')
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
            // if (uploadName === 'resume') {
            // setFieldValue("resume", res?.candidate?.resume)
            // console.log(res)
            // }
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
        <Box>
            <Stack direction={{ xs: "column", lg: 'row' }} justifyContent={'space-between'} >
                <Box>
                    <Stack>
                        <Typography variant="profilePageTitle" >About</Typography>
                        <Typography variant="profilePageSubText" >Tell us about yourself so startups know who you are.</Typography>
                    </Stack>
                </Box>
                <Stack sx={{ width: "60%" }} spacing={2} >
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
                                    {/* <UploadPdf title="resume" setFieldValue={setFieldValue} uploadName={"resume"}
                                        textHelper={touched.resume && errors.resume}
                                        docValue={candidate?.resume}
                                        getCandidateById={getCandidateById}
                                    />
                                    <UploadPdf title="cover Letter" setFieldValue={setFieldValue} uploadName={"coverLetter"}
                                        textHelper={touched.coverLetter && errors.coverLetter}
                                        docValue={candidate?.coverLetter}
                                        getCandidateById={getCandidateById}
                                    /> */}
                                    {/* <UploadPdf title="academic Certificates" setFieldValue={setFieldValue} uploadName={"academicCertificates"}
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
                            /> */}
                                </Stack>
                            </Stack>
                        </Form>
                    </FormikProvider>
                </Stack>
            </Stack>
        </Box>
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

    // useEffect(() => { }, [])

    // console.log('value11 1', docValue)
    return (
        <Stack direction={'row'} spacing={2} alignItems={'center'} >
            <Box sx={{ width: 196 }} >
                <Typography variant="profilePageTitle" sx={{ pb: 1 }}>
                    {title}*
                </Typography>
            </Box>
            {/* <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                {upload ? (
                    <Typography variant="body1">{upload}</Typography>
                ) : isDragActive ? (
                    <Typography variant="body1">Drop the files here...</Typography>
                ) : (
                    <Stack alignItems={'center'} >
                        <Typography sx={{ fontSize: 14 }} >Upload {title}</Typography>
                    </Stack>
                )}
            </div>
            <FormHelperText>{textHelper}</FormHelperText> */}

            {
                (docValue?.length === 0) ? (
                    <>
                        {/* <Box sx={{ width: 196 }} >
                            <Typography variant="profilePageTitle" sx={{ pb: 1 }}>
                                {title}*
                            </Typography>
                        </Box> */}
                        <div {...getRootProps()} style={dropzoneStyles}>
                            <input {...getInputProps()} />
                            {upload ? (
                                <Typography variant="body1">{upload}</Typography>
                            ) : isDragActive ? (
                                <Typography variant="body1">Drop the files here...</Typography>
                            ) : (
                                <Stack alignItems={'center'} >
                                    <Typography sx={{ fontSize: 14 }} >Upload {title}</Typography>
                                </Stack>
                            )}
                        </div>
                        {/* <FormHelperText>{textHelper}</FormHelperText> */}
                    </>
                ) : (
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{
                        border: '0.4px solid #ccc', width: 300,
                        p: 1,
                    }} >
                        <Stack direction={'row'} alignItems={'center'} spacing={2} >
                            <Iconify icon={"ph:file-pdf-bold"} sx={{ width: 42, height: 42, color: "blue" }} />
                            <Typography
                                sx={{ fontSize: 16, fontWeight: 700, cursor: "pointer" }}
                                onClick={handleDownload}
                            >Download {title}</Typography>
                        </Stack>
                        {/* <Iconify icon={"mdi:cancel-bold"} sx={{ width: 22, height: 22, cursor: "pointer" }} onClick={() => deleteCandidateResume()} /> */}
                        <Typography sx={{ fontSize: 16, fontWeight: 700, cursor: "pointer" }}
                            onClick={() => deleteCandidateResume()}
                        >X</Typography>
                    </Stack>
                )
            }

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















// import React, { useCallback, useEffect, useState } from "react";
// import { FormControl, FormLabel, Box, Stack, TextField, Typography, Select, MenuItem, Divider, Button, Chip } from "@mui/material"
// import { useDropzone } from "react-dropzone";
// import Iconify from "../Iconify"
// import { useSelector } from "react-redux";
// import candidateServices from "../../services/candidateServices";
// import { server } from "../../utils/server";
// import DownloadResumeButton from "../DownloadResumeButton";
// import fileDownload from 'js-file-download'
// import Axios from "axios";
// import { useSnackbar } from "notistack";

// export function ResumeUpload() {
//     const { enqueueSnackbar } = useSnackbar()
//     const [uploadedResume, setUploadedResume] = useState(null)
//     const [candidate, setCandidate] = useState({})
//     const [update, setUpdate] = useState(false)
//     const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]
//     const { user } = useSelector((state) => state.auth)
//     console.log('candidte', candidate)
//     function download(url, filename) {
//         Axios.get(url, {
//             responseType: 'blob',
//         }).then(res => {
//             fileDownload(res.data, filename);
//         });
//     }

//     const onDrop = useCallback((acceptedFiles) => {
//         const resumeFile = acceptedFiles[0];

//         // Display resume file name
//         setUploadedResume(resumeFile.name);

//         // Upload the resume file to the server using axios or your preferred HTTP library
//         const formData = new FormData();
//         formData.append('resume', resumeFile);
//         server.post(`upload/resume/candidate/${user?._id}`, formData)
//             .then(res => {
//                 getCandidateById()
//                 return res.data
//             })
//             .catch(err => {
//                 return null
//             })
//     }, [])

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         accept: '.pdf, .doc, .docx', // Accept only specific file types
//         maxFiles: 1,
//     })

//     // const removeFile = () => {
//     //     setUploadedResume(null);
//     // }

//     const handleDownload = async () => {
//         try {
//             const id = user?._id
//             const response = await server.get(`api/candidate/upload/resume/${id}`, { responseType: 'blob' })
//             console.log("response", response)
//             const url = window.URL.createObjectURL(new Blob([response.data]))
//             const link = document.createElement('a')
//             link.href = url
//             link.setAttribute('download', `${user?.candidateName} resume.pdf`)
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         } catch (error) {
//             console.error('Error downloading resume:', error);
//         }
//     }

//     useEffect(() => {
//         if (candidate !== null) {
//             getCandidateById()
//         }
//     }, [user, update])

//     async function getCandidateById(data) {
//         const id = user?._id
//         const res = await candidateServices.getCandidateById(id)
//         if (res && res.success) {
//             setCandidate(res?.candidate)
//         } else {
//             enqueueSnackbar('Something went wrong', {
//                 variant: "error",
//                 anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
//             })
//         }
//     }

//     const deleteCandidateResume = async () => {
//         const data = { candidateId: user?._id }
//         // console.log(id)
//         const res = await candidateServices.deleteResume(data)
//         if (res && res.success) {
//             setUpdate(!update)
//             setUploadedResume(null)
//         } else {
//             enqueueSnackbar(res?.message, {
//                 variant: "error",
//                 anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
//             })
//         }
//     }
//     // console.log(candidate)
//     return (
//         <Box>
//             <Stack direction={'row'} justifyContent={'space-between'} >
//                 <Box>
//                     <Stack>
//                         <Typography variant="profilePageTitle" >About</Typography>
//                         <Typography variant="profilePageSubText" >Tell us about yourself so startups know who you are.</Typography>
//                     </Stack>
//                 </Box>
//                 <Stack sx={{ width: "60%" }} spacing={2} >
//                     <FormControl>
//                         <Typography variant="profilePageTitle" sx={{ pb: 1 }}>
//                             upload a new one below
//                         </Typography>
//                         <div {...getRootProps()} style={dropzoneStyles}>
//                             <input {...getInputProps()} />
//                             {uploadedResume ? (
//                                 <Typography variant="body1">{uploadedResume}</Typography>
//                             ) : isDragActive ? (
//                                 <Typography variant="body1">Drop the files here...</Typography>
//                             ) : (
//                                 <Stack alignItems={'center'} >
//                                     <Iconify icon={"ph:file-pdf-bold"} sx={{ width: 42, height: 42 }} />
//                                     <Typography variant="body1">Upload new file</Typography>
//                                 </Stack>
//                             )}
//                         </div>
//                     </FormControl>
//                     {
//                         (candidate?.resume?.length === 0) ? "" : (
//                             <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{
//                                 border: '0.4px solid #ccc', width: 300,
//                                 p: 1,
//                             }} >
//                                 <Stack direction={'row'} alignItems={'center'} spacing={2} >
//                                     <Iconify icon={"ph:file-pdf-bold"} sx={{ width: 42, height: 42, color: "blue" }} />
//                                     <Typography
//                                         sx={{ fontSize: 16, fontWeight: 700, cursor: "pointer" }}
//                                         onClick={handleDownload}>Download Resume</Typography>
//                                 </Stack>
//                                 {/* <Iconify icon={"mdi:cancel-bold"} sx={{ width: 22, height: 22, cursor: "pointer" }} onClick={() => deleteCandidateResume()} /> */}
//                                 <Typography sx={{ fontSize: 16, fontWeight: 700, cursor: "pointer" }} onClick={() => deleteCandidateResume()}>X</Typography>
//                             </Stack>
//                         )
//                     }
//                 </Stack>
//             </Stack>
//             {/* <DownloadResumeButton id={user?._id} /> */}
//         </Box>
//     )
// }

// const dropzoneStyles = {
//     border: '2px dashed #cccccc',
//     borderRadius: '4px',
//     padding: '20px',
//     textAlign: 'center',
//     cursor: 'pointer',
// }