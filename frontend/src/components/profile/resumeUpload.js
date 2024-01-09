import React, { useCallback, useState } from "react";
import { FormControl, FormLabel, Box, Stack, TextField, Typography, Select, MenuItem, Divider, Button, Chip } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDropzone } from "react-dropzone";
import Iconify from "../Iconify"


export function ResumeUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the accepted files (e.g., send to server, store in state, etc.)
        setSelectedFile(acceptedFiles[0]);
        console.log('Accepted files:', acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const removeFile = () => {
        setSelectedFile(null);
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
                            {selectedFile ? (
                                <Typography variant="body1">{selectedFile.name}</Typography>
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