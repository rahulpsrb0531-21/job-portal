import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../utils/server';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';

const DownloadResumeButton = ({ id }) => {
    const { user } = useSelector((state) => state.auth)

    const handleDownload = async () => {
        try {
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
    };

    return (
        <Stack>
            <button onClick={handleDownload}>Download Resume</button>
        </Stack>
    );
};

export default DownloadResumeButton;
