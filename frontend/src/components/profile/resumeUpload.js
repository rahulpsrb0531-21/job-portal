import React, { useCallback, useEffect, useState } from "react";
import { FormControl, FormLabel, Box, Stack, TextField, Typography, Select, MenuItem, Divider, Button, Chip } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDropzone } from "react-dropzone";
import Iconify from "../Iconify"
import { useSelector } from "react-redux";
import candidateServices from "../../services/candidateServices";
import { server } from "../../utils/server";


export function ResumeUpload() {
    const [uploadedResume, setUploadedResume] = useState(null)
    const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]
    const { user } = useSelector((state) => state.auth)

    // console.log('candidate', candidate)

    const onDrop = useCallback((acceptedFiles) => {
        const resumeFile = acceptedFiles[0];

        // Display resume file name
        setUploadedResume(resumeFile.name);

        // Upload the resume file to the server using axios or your preferred HTTP library
        const formData = new FormData();
        formData.append('resume', resumeFile);
        server.post(`upload/resume/candidate/${user?._id}`, formData)
            .then(res => {
                return res.data
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
    const removeFile = () => {
        setUploadedResume(null);
    }
    return (
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
                        <Typography variant="profilePageTitle" sx={{ pb: 1 }}>
                            {/* View your resume or  */}
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

                        {/* <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {!uploadedResume ? (
          <p>Drag & drop your resume here, or click to select a resume (PDF, DOC, DOCX)</p>
        ) : (
          <p>Resume uploaded: {uploadedResume}</p>
        )}
      </div> */}
                    </FormControl>
                    <Typography sx={{
                        fontSize: 14, cursor: 'pointer', textAlign: "right", ":hover": {
                            textDecoration: "underline"
                        }
                    }} onClick={() => removeFile()} >Remove your resume</Typography>
                </Stack>
            </Stack>
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