import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material";


export default function Register() {
    return (
        <Stack direction={'row'}
            alignItems={'center'}
            justifyContent={'space-evenly'}
            sx={{ width: "100%", pt: 10 }} >
            <Stack sx={{ width: '20%' }}>
                <Typography
                    sx={{ fontSize: 46, fontWeight: 700, textAlign: "center" }}
                >Find the job made for you.</Typography>
            </Stack>
            <Stack sx={{ width: '22%' }} spacing={2}>
                <Box sx={{ textAlign: 'center' }} >
                    <Typography
                        sx={{ fontSize: 36, fontWeight: 700, color: 'gb(6, 6, 6)' }}
                    >Create Account</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 400, color: "rgb(0, 0, 0)" }} >Find your next opportunity!</Typography>
                </Box>
                <FormControl>
                    <Typography
                        sx={{ fontSize: 16, fontWeight: 700 }}
                    >Full Name</Typography>
                    <TextField type="text" placeholder="enter text"
                        sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px", borderRadius: "2px" } }}
                    />
                </FormControl>
                <FormControl>
                    <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Email</Typography>
                    <TextField type="email" placeholder="mail@website.com"
                        sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px", borderRadius: "2px" } }}
                    />
                </FormControl>
                <FormControl>
                    <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Paaword</Typography>
                    <TextField type="password" placeholder="enter password"
                        sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px", borderRadius: "2px" } }}
                    />
                </FormControl>
                <Button variant="blackButton" >Sign Up</Button>
                <Stack direction={'row'} justifyContent={'center'} >
                    <Typography
                        sx={{ fontSize: 14, fontWeight: 700, color: "rgb(0, 0, 0)" }}
                    >Already have an account?
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14, fontWeight: 700, color: "rgb(0, 0, 0)", ":hover": {
                                textDecoration: 'underline'
                            }
                        }}
                    > Log in
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}