import { FormControl, FormLabel, Box, Stack, TextField, Typography, Select, MenuItem, Divider, Button, Chip } from "@mui/material"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Iconify from "../Iconify"


export function CandidateProfile() {
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
                        <Typography variant="profilePageTitle">Your name*</Typography>
                        <TextField value={'Rakesh Tamboli'}
                            sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                        />
                    </FormControl>
                    <FormControl>
                        <Typography variant="profilePageTitle" >Where are you based?*</Typography>
                        <TextField value={'Mumbai'}
                            sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                        />
                    </FormControl>
                    <Stack direction={'row'} spacing={2} >
                        <FormControl sx={{ width: '72%' }} >
                            <Typography variant="profilePageTitle" >Select your primary role*</Typography>
                            <Select
                                sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
                                value={'Full Stack Developer'} >
                                <MenuItem value={'Full Stack Developer'}>Full Stack Developer</MenuItem>
                                <MenuItem>Frontend Developer</MenuItem>
                                <MenuItem>Backend Developer</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl >
                            <Typography variant="profilePageTitle" >Years of experience*</Typography>
                            <Select value={"q"}
                                sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
                            >
                                <MenuItem value={"q"} >{"<1 years"}</MenuItem>
                                <MenuItem>{"<2 years"}</MenuItem>
                                <MenuItem>{"<3 years"}</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <FormControl>
                        <Typography>Your Bio</Typography>
                        <TextField multiline={true} rows={5} />
                    </FormControl>
                </Stack>
            </Stack>
            <Divider sx={{ py: 1 }} />
            <SocialLink />
            <Divider sx={{ py: 1 }} />
            <Experience />
            <Divider sx={{ py: 1 }} />
            <Education />
            <Divider sx={{ py: 1 }} />
            <Skills />
            <Divider sx={{ py: 1 }} />
            <Achievements />
        </Box>
    )
}

const FonControlSocialMedia = ({ title, link }) => {
    return (
        <FormControl>
            <Typography variant="profilePageTitle">{title}</Typography>
            <TextField variant="outlined" value={link}
                sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
            />
        </FormControl>
    )
}

const SocialLink = () => {
    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
            <Box>
                <Stack>
                    <Typography variant="profilePageTitle" >Social Profiles</Typography>
                    <Typography variant="profilePageSubText" >Where can people find you online?</Typography>
                </Stack>
            </Box>
            <Stack sx={{ width: "60%" }} spacing={1} >
                <FonControlSocialMedia title="website" link='rakesh.com' />
                <FonControlSocialMedia title="twitter" link='rakesh.com' />
                <FonControlSocialMedia title="linkedin" link='rakesh.com' />
                <FonControlSocialMedia title="youtube" link='rakesh.com' />
            </Stack>
        </Stack>
    )
}

const Experience = () => {
    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
            <Box>
                <Stack>
                    <Typography variant="profilePageTitle" >Your work experience</Typography>
                    <Typography variant="profilePageSubText" >What other positions have you held?</Typography>
                </Stack>
            </Box>
            <Box sx={{ width: "60%" }} >
                <Stack direction={'row'} justifyContent={'space-between'} sx={{
                    bgcolor: 'rgb(255, 255, 255)',
                    p: 2, borderRadius: "4px",
                    border: "1px solid rgb(224, 224, 224)",
                    borderLeftColor: "rgb(224, 224, 224)",
                    borderBottomColor: "rgb(224, 224, 224)"
                }} >
                    <Stack direction={'row'} spacing={1}
                    // sx={{ border: "1px solid rgb(224, 224, 224)", p: 1 }}
                    >
                        <Iconify icon={"bx:building"}
                            sx={{ width: 32, height: 32, border: "1px solid rgb(224, 224, 224)", borderRadius: '4px' }} />
                        <Stack>
                            <Typography variant="profilePageTitle">Full Stack Developer</Typography>
                            {/* <br /> */}
                            <Typography variant="profilePageSubText">CreativeWebo</Typography>
                        </Stack>
                    </Stack>
                    <Typography variant="profilePageSubText">Edit</Typography>
                </Stack>
                <Typography
                    sx={{
                        fontSize: 14, pt: 1,
                        fontWeight: 500
                        , color: 'rgb(15, 111, 255)'
                    }}
                >+Add work experience</Typography>

                {/* form  */}
                <Stack sx={{ bgcolor: "rgb(250, 250, 250)", p: 1.4, borderRadius: "4px" }} spacing={1} >
                    <AddExperienceLabelText title={"Company*"} />
                    <AddExperienceLabelText title={"Title*"} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                            <FormControl>
                                <Typography variant="profilePageTitle">Start Date*</Typography>
                                <DatePicker
                                    sx={{ ".css-zqoy3u-MuiInputBase-input-MuiOutlinedInput-input": { p: 1.4 } }}
                                    views={['month', 'year']} />
                            </FormControl>
                            <FormControl>
                                <Typography variant="profilePageTitle">End Date*</Typography>
                                <DatePicker
                                    sx={{ ".css-zqoy3u-MuiInputBase-input-MuiOutlinedInput-input": { p: 1.4 } }}
                                    views={['month', 'year']} />
                            </FormControl>
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl>
                        <Typography variant="profilePageTitle">Description</Typography>
                        <TextField multiline={true} rows={4} value={'description'} />
                    </FormControl>
                    <Stack direction={'row'} justifyContent={'end'} alignContent={'center'} spacing={1} >
                        <Button variant="outlined" >Cancel</Button>
                        <Button variant="blackButton" sx={{ letterSpacing: 2 }}  >Save</Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack >
    )
}
const AddExperienceLabelText = ({ title, value }) => {
    return (
        <FormControl>
            <Typography variant="profilePageTitle">{title}</Typography>
            <TextField value={value} sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }} />
        </FormControl>
    )
}

const Education = () => {
    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
            <Box>
                <Stack>
                    <Typography variant="profilePageTitle" >Education</Typography>
                    <Typography variant="profilePageSubText" >What schools have you studied at?</Typography>
                </Stack>
            </Box>
            <Box sx={{ width: "60%" }} >
                <Stack direction={'row'} justifyContent={'space-between'} sx={{
                    bgcolor: 'rgb(255, 255, 255)',
                    p: 2, borderRadius: "4px",
                    border: "1px solid rgb(224, 224, 224)",
                    borderLeftColor: "rgb(224, 224, 224)",
                    borderBottomColor: "rgb(224, 224, 224)"
                }} >
                    <Stack direction={'row'} spacing={1}
                    // sx={{ border: "1px solid rgb(224, 224, 224)", p: 1 }}
                    >
                        <Iconify icon={"fluent-mdl2:education"}
                            sx={{ width: 32, height: 32, border: "1px solid rgb(224, 224, 224)", borderRadius: '4px' }} />
                        <Stack>
                            <Typography variant="profilePageTitle">
                                Guru Nanak Khalsa College Of Arts, Science & Commerce</Typography>
                            <Typography variant="profilePageSubText">Computer Science, Bachelor's</Typography>
                        </Stack>
                    </Stack>
                    <Typography variant="profilePageSubText">Edit</Typography>
                </Stack>
                <Typography
                    sx={{
                        fontSize: 14, pt: 1,
                        fontWeight: 500
                        , color: 'rgb(15, 111, 255)'
                    }}
                >+Add work education</Typography>

                {/* form  */}
                <Stack sx={{ bgcolor: "rgb(250, 250, 250)", p: 1.4, borderRadius: "4px" }} spacing={1} >
                    <AddExperienceLabelText title={"Education*"} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                            <FormControl>
                                <Typography variant="profilePageTitle">Graduation*</Typography>
                                <DatePicker
                                    sx={{ ".css-zqoy3u-MuiInputBase-input-MuiOutlinedInput-input": { p: 1.4 } }}
                                    views={['month', 'year']} />
                            </FormControl>
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl>
                        <Typography variant="profilePageTitle">Degree & Major</Typography>
                        <Select value={'bsc'} >
                            <MenuItem value='bsc' >BSC</MenuItem>
                            <MenuItem value='mca'>MCA</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        <Typography>GPA</Typography>
                        <Stack direction={'row'} spacing={1} >
                            <AddExperienceLabelText title={""} />
                            <AddExperienceLabelText title={""} />
                        </Stack>
                    </Box>
                    <Stack direction={'row'} justifyContent={'end'} alignContent={'center'} spacing={1} >
                        <Button variant="outlined" >Cancel</Button>
                        <Button variant="blackButton" sx={{ letterSpacing: 2 }}  >Save</Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack >
    )
}

const Skills = () => {
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    }
    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
            <Box>
                <Stack>
                    <Typography variant="profilePageTitle" >Your Skills</Typography>
                    <Typography variant="profilePageSubText" >This will help startups hone in on your strengths.</Typography>
                </Stack>
            </Box>
            <Stack sx={{ width: "60%" }} spacing={1} >
                <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap >
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                    <Chip label="nodejs" sx={{ borderRadius: "4px" }} onDelete={handleDelete} />
                </Stack>
                <FormControl>
                    <TextField
                        sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                    />
                    <Button variant="blackButton" sx={{ letterSpacing: 2, textAlign: "right", width: 100, mt: 0.6 }}  >Save</Button>
                </FormControl>
            </Stack>
        </Stack>
    )
}

const Achievements = () => {
    return (
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ pt: 2 }} >
            <Box>
                <Stack>
                    <Typography variant="profilePageTitle" >Achievements</Typography>
                    <Typography variant="profilePageSubText" >Sharing more details about yourself will help you stand out more.</Typography>
                </Stack>
            </Box>
            <Stack sx={{ width: "60%" }} spacing={1} >
                <FormControl>
                    <TextField multiline={true} rows={6}
                        sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                        placeholder="It's OK to brag - e.g. I launched 3 successful Facebook apps which in total reached 2M+ users and generated $100k+ in revenue. I built everything from the front-end to the back-end and everything in between."
                    />
                    <Button variant="blackButton" sx={{ letterSpacing: 2, width: 100, mt: 0.6 }}  >Save</Button>
                </FormControl>
            </Stack>
        </Stack>
    )
}