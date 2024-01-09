import React, { useState } from 'react'
import { Box, Stack, Tab, Typography } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Overview from '../components/profile/overview'
import { BrowseAllJobs } from '../components/job/browseAllJobs'
import Iconify from '../components/Iconify'

export default function AppliedPage() {
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', pt: 2 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Ongoing " value="1" />
                        <Tab label="Archived" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={"start"}
                        sx={{
                            border: '1px solid #e0e0e0', borderRadius: "8px", p: 1,
                            ":hover": { boxShadow: 1 }
                        }}
                    >
                        <Stack direction={'row'} spacing={1} >
                            <Typography>Logo</Typography>
                            <Box>
                                <Typography
                                    sx={{ fontSize: 20, fontWeight: 500 }}
                                >Quantapp</Typography>
                                <Typography
                                    sx={{ fontSize: 16, color: 'rgb(97, 97, 97)' }}
                                >Full Stack Developer</Typography>
                                <Typography
                                    sx={{ fontSize: 12, fontWeight: 600 }}
                                >.Pending Jan 4</Typography>
                            </Box>
                        </Stack>
                        <Iconify icon={"fluent:ios-arrow-24-regular"} sx={{ width: 16, height: 16, transform: "rotate(180deg)" }} />
                    </Stack>
                </TabPanel>
                <TabPanel value="2">Archived</TabPanel>
            </TabContext>
        </Box>
    )
}