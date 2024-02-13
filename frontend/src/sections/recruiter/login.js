import { useEffect } from "react"
import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { useSnackbar } from "notistack"
import { Link as RouterLink, json, useNavigate } from "react-router-dom"
import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material"
import authServices from "../../services/authServices"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/reducers/authSlice"


export default function RecruiterLogin() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const token = localStorage.getItem('access')
    console.log(user)

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
            // console.log('v >>>>>', v)
            loginRecruiter(v)
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
        if (user && user?.role === "RECRUITER") {
            navigate("/recruiter/dashboard", { replace: true })
        }
        if (user && user?.role === "CANDIDATE") {
            navigate("/candidate/profile", { replace: true })
        }
    }, [token])

    async function loginRecruiter(data) {
        const res = await authServices.recruiterLogin(data)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            dispatch(setCredentials({ ...res }))
            localStorage.setItem("access", res.accessToken)
            navigate("/recruiter/dashboard", { replace: true })
        } else {
            enqueueSnackbar(res?.data || "server error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack
                    direction={{ xs: "column", lg: 'row' }}
                    alignItems={'center'}
                    justifyContent={'space-evenly'}
                    sx={{ width: "100%", pt: { xs: 4, lg: 10 } }}
                    spacing={4}
                >
                    <Stack sx={{ width: { xs: '90%', lg: '22%' } }} spacing={2}>
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
                            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Password</Typography>
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
                                        textDecoration: 'underline', cursor: "pointer"
                                    }
                                }}
                                onClick={() => navigate("/onboarding/recruiter/sign-up")}
                            >Create an Account
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack sx={{ width: { xs: '80%', lg: '20%' } }}>
                        <Typography
                            sx={{ fontSize: 46, fontWeight: 700, textAlign: "center" }}
                        >Find the job made for you.</Typography>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    )
}