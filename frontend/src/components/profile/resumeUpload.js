import React, { useCallback, useEffect, useState } from "react";
import { FormControl, FormLabel, Box, Stack, TextField, Typography, Select, MenuItem, Divider, Button, Chip } from "@mui/material"
import { useDropzone } from "react-dropzone";
import Iconify from "../Iconify"
import { useSelector } from "react-redux";
import candidateServices from "../../services/candidateServices";
import { server } from "../../utils/server";
import DownloadResumeButton from "../DownloadResumeButton";
import fileDownload from 'js-file-download'
import Axios from "axios";
import { useSnackbar } from "notistack";

export function ResumeUpload() {
    const { enqueueSnackbar } = useSnackbar()
    const [uploadedResume, setUploadedResume] = useState(null)
    const [candidate, setCandidate] = useState({})
    const [update, setUpdate] = useState(false)
    const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]
    const { user } = useSelector((state) => state.auth)
    console.log('candidte', candidate)
    function download(url, filename) {
        Axios.get(url, {
            responseType: 'blob',
        }).then(res => {
            fileDownload(res.data, filename);
        });
    }

    const onDrop = useCallback((acceptedFiles) => {
        const resumeFile = acceptedFiles[0];

        // Display resume file name
        setUploadedResume(resumeFile.name);

        // Upload the resume file to the server using axios or your preferred HTTP library
        const formData = new FormData();
        formData.append('resume', resumeFile);
        server.post(`upload/resume/candidate/${user?._id}`, formData)
            .then(res => {
                getCandidateById()
                return res.data
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

    // const removeFile = () => {
    //     setUploadedResume(null);
    // }

    const handleDownload = async () => {
        try {
            const id = user?._id
            const response = await server.get(`api/candidate/upload/resume/${id}`, { responseType: 'blob' })
            console.log("response", response)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${user?.candidateName} resume.pdf`)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    }

    useEffect(() => {
        if (candidate !== null) {
            getCandidateById()
        }
    }, [user, update])

    async function getCandidateById(data) {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            setCandidate(res?.candidate)
        } else {
            enqueueSnackbar('Something went wrong', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    const deleteCandidateResume = async () => {
        const data = { candidateId: user?._id }
        // console.log(id)
        const res = await candidateServices.deleteResume(data)
        if (res && res.success) {
            setUpdate(!update)
            setUploadedResume(null)
        } else {
            enqueueSnackbar(res?.message, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }
    // console.log(candidate)
    return (
        <Box>
            <Stack direction={'row'} justifyContent={'space-between'} >
                <Box>
                    <Stack>
                        <Typography variant="profilePageTitle" >About</Typography>
                        <Typography variant="profilePageSubText" >Tell us about yourself so startups know who you are.</Typography>
                    </Stack>
                </Box>
                <Stack sx={{ width: "60%" }} spacing={2} >
                    <FormControl>
                        <Typography variant="profilePageTitle" sx={{ pb: 1 }}>
                            upload a new one below
                        </Typography>
                        <div {...getRootProps()} style={dropzoneStyles}>
                            <input {...getInputProps()} />
                            {uploadedResume ? (
                                <Typography variant="body1">{uploadedResume}</Typography>
                            ) : isDragActive ? (
                                <Typography variant="body1">Drop the files here...</Typography>
                            ) : (
                                <Stack alignItems={'center'} >
                                    <Iconify icon={"ph:file-pdf-bold"} sx={{ width: 42, height: 42 }} />
                                    <Typography variant="body1">Upload new file</Typography>
                                </Stack>
                            )}
                        </div>
                    </FormControl>
                    {
                        (candidate?.resume?.length === 0) ? "" : (
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{
                                border: '0.4px solid #ccc', width: 300,
                                p: 1,
                            }} >
                                <Stack direction={'row'} alignItems={'center'} spacing={2} >
                                    <Iconify icon={"ph:file-pdf-bold"} sx={{ width: 42, height: 42, color: "blue" }} />
                                    <Typography
                                        sx={{ fontSize: 16, fontWeight: 700, cursor: "pointer" }}
                                        onClick={handleDownload}>Download Resume</Typography>
                                </Stack>
                                {/* <Iconify icon={"mdi:cancel-bold"} sx={{ width: 22, height: 22, cursor: "pointer" }} onClick={() => deleteCandidateResume()} /> */}
                                <Typography sx={{ fontSize: 16, fontWeight: 700, cursor: "pointer" }} onClick={() => deleteCandidateResume()}>X</Typography>
                            </Stack>
                        )
                    }
                </Stack>
            </Stack>
            {/* <DownloadResumeButton id={user?._id} /> */}
        </Box>
    )
}

const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
}