import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../utils/server';
import { useSelector } from 'react-redux';

const DownloadResumeButton = ({ id }) => {
    const [resumePath, setResumePath] = useState(null)
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
        <div>
            <button onClick={handleDownload}>Download Resume</button>
        </div>
    );
};

export default DownloadResumeButton;
