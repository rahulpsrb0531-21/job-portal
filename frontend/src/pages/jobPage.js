import React, { useState } from 'react'
import { Box, Stack, Tab } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Overview from '../components/profile/overview'
import { BrowseAllJobs } from '../components/job/browseAllJobs'

export default function JobPage() {
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', pt: 2 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Browse all " value="1" />
                        <Tab label="Saved" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Stack spacing={1} >
                        <BrowseAllJobs />
                        <BrowseAllJobs />
                        <BrowseAllJobs />
                        <BrowseAllJobs />
                    </Stack>
                </TabPanel>
                <TabPanel value="2">Saved Jobs</TabPanel>
            </TabContext>
        </Box>
    );
}