import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material";


export default function Login() {
    return (
        <Stack direction={'row'}
            alignItems={'center'}
            justifyContent={'space-evenly'}
            sx={{ width: "100%", pt: 10 }} >
            <Stack sx={{ width: '22%' }} spacing={2}>
                <Box sx={{ textAlign: 'center' }} >
                    <Typography
                        sx={{ fontSize: 36, fontWeight: 700, color: 'gb(6, 6, 6)' }}
                    >Login</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 400, color: "rgb(0, 0, 0)" }} >Find the job made for you!</Typography>
                </Box>
                <FormControl>
                    <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Email</Typography>
                    <TextField type="email" placeholder="Email"
                        sx={{
                            ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px", borderRadius: "2px" },
                            ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input": {
                                p: '10px 14px'
                            }
                        }}
                    />
                </FormControl>
                <FormControl>
                    <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Paaword</Typography>
                    <TextField
                        autoComplete="off"
                        type="password" placeholder="Password"
                        sx={{
                            ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px", borderRadius: "2px" },
                            ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input": {
                                p: '10px 14px'
                            }
                        }}
                    />
                </FormControl>
                <Button variant="blackButton" >Log in</Button>
                <Stack direction={'row'} justifyContent={'center'} >
                    <Typography
                        sx={{ fontSize: 14, fontWeight: 700, color: "rgb(0, 0, 0)" }}
                    >Not registered?</Typography>
                    <Typography
                        sx={{
                            fontSize: 14, fontWeight: 700, color: "rgb(0, 0, 0)", ":hover": {
                                textDecoration: 'underline'
                            }
                        }}
                    >Create an Account
                    </Typography>
                </Stack>
            </Stack>
            <Stack sx={{ width: '20%' }}>
                <Typography
                    sx={{ fontSize: 46, fontWeight: 700, textAlign: "center" }}
                >Find the job made for you.</Typography>
            </Stack>
        </Stack>
    )
}