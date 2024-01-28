import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Tab, Typography } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Overview from '../components/profile/overview'
import { CandidateProfile } from '../components/profile/condidateProfile'
import { ResumeUpload } from '../components/profile/resumeUpload'

export default function Profile() {
    const navigate = useNavigate()
    const [value, setValue] = useState('1')
    const token = localStorage.getItem('access')
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    return (
        <Box>
            <Typography sx={{ fontSize: 32, fontWeight: 500, pl: 1, pt: 2 }} >Edit your MyBrand profile</Typography>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Overview" value="1" />
                        <Tab label="Profile" value="2" />
                        <Tab label="Resume/CV" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1"><Overview /></TabPanel>
                <TabPanel value="2"><CandidateProfile /></TabPanel>
                <TabPanel value="3"><ResumeUpload /></TabPanel>
            </TabContext>
        </Box>
    );
}