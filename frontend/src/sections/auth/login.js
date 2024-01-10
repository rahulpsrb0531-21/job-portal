import { useEffect } from "react"
import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { useSnackbar } from "notistack"
import { Link as RouterLink, json, useNavigate } from "react-router-dom"
import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material"
import authServices from "../../services/authServices"


export default function Login() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const token = sessionStorage.getItem('access')
    const user = JSON.parse(sessionStorage.getItem('user'))

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: (v) => {
            console.log('v >>>>>', v)
            loginCandidate(v)
        },
    })

    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setSubmitting,
        setFieldValue
    } = formik

    useEffect(() => {
        if (token && user?.role === 'CANDIDATE') {
            navigate("/jobs/profile", { replace: true })
        }
    }, [token])

    async function loginCandidate(data) {
        const res = await authServices.login(data)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            sessionStorage.setItem("access", res.accessToken)
            sessionStorage.setItem("user", JSON.stringify(res.candidate))
            navigate("/jobs/profile", { replace: true })
        } else {
            enqueueSnackbar(res?.data, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                            <TextField type="text" placeholder="Email"
                                sx={{
                                    ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px", borderRadius: "2px" },
                                    ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input": {
                                        p: '10px 14px'
                                    }
                                }}
                                {...getFieldProps("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
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
                                {...getFieldProps("password")}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </FormControl>
                        <Button variant="blackButton" type="submit"
                            onClick={() => console.log(errors)}
                        >Log in</Button>
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
                                onClick={() => navigate("/register")}
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
            </Form>
        </FormikProvider>
    )
}