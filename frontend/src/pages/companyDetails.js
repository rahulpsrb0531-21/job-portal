import React, { useState } from "react"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Stack, Tab, Typography } from "@mui/material";
import OverView from "../components/company/overview";

export default function CompanyDetails() {
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Stack mt={6} spacing={2} >
            <Stack direction={'row'} alignItems={'center'} justifyContent={"space-between"} >
                <Stack direction={'row'}>
                    <Box
                        component={'img'}
                        src="https://photos.wellfound.com/startups/i/8360909-783a7fbc4f0ae14f7a0c656bce23c8fa-medium_jpg.jpg?buster=1622336656"
                        alt='brand'
                        sx={{ width: 80, objectFit: 'contain' }}
                    />
                    <Stack>
                        <Typography variant="companyTitle" >BetaMind</Typography>
                        <Typography variant="companySubText" >Reinventing the company-customer relationship</Typography>
                    </Stack>
                </Stack>
                <Button size="small" variant="outlined" type="submit"
                    sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                >Save</Button>
            </Stack>

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Overview" value="1" />
                        <Tab label="People" value="2" />
                        <Tab label="Culture and benefits" value="3" />
                        <Tab label="Jobs" value="4" />
                        {/* <Tab label="Funding" value="5" /> */}
                    </TabList>
                </Box>
                <TabPanel value="1"><OverView /></TabPanel>
            </TabContext>
        </Stack>
    )
}