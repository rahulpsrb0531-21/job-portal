import React, { useEffect } from "react"
import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/authServices"
import { setCredentials } from "../../redux/reducers/authSlice"
import { useDispatch, useSelector } from "react-redux"


export default function RecruiterRegister() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const token = localStorage.getItem('access')
    // const { user } = useSelector((state) => state.auth)

    const registerSchema = Yup.object().shape({
        recruiterName: Yup.string().required("Full Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    const formik = useFormik({
        initialValues: {
            recruiterName: "",
            email: "",
            password: "",
        },
        validationSchema: registerSchema,
        onSubmit: (v) => {
            // console.log('v >>>>>', { ...v, role: "CANDIDATE" })
            register({ ...v, role: "RECRUITER" })
        },
    })
    async function register(data) {
        const res = await authServices.recruiterRegister(data)
        setSubmitting(false)
        console.log(res)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            dispatch(setCredentials({ ...res }))
            localStorage.setItem("access", res.accessToken)
            if (res.accessToken) {
                navigate("/onboarding/recruiter", { replace: true })
            } else {
                navigate("/onboarding/recruiter/login", { replace: true })
            }
        } else {
            enqueueSnackbar(res?.data?.message || "server error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    // useEffect(() => {
    //     if (token) {
    //         navigate("/recruiter/dashboard", { replace: true })
    //     }
    // }, [token])

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

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack direction={{ xs: "column", lg: 'row' }}
                    alignItems={'center'}
                    justifyContent={'space-evenly'}
                    sx={{ width: "100%", pt: { xs: 4, lg: 10 } }}
                    spacing={4} >
                    <Stack sx={{ width: { xs: '80%', lg: '20%' } }}>
                        <Typography
                            sx={{ fontSize: 46, fontWeight: 700, textAlign: "center" }}
                        >Find the job made for you.</Typography>
                    </Stack>
                    <Stack sx={{ width: { xs: '90%', lg: '22%' } }} spacing={2}>
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
                                {...getFieldProps("recruiterName")}
                                error={Boolean(touched.recruiterName && errors.recruiterName)}
                                helperText={touched.recruiterName && errors.recruiterName}
                            />
                        </FormControl>
                        <FormControl>
                            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Email</Typography>
                            <TextField type="email" placeholder="mail@website.com"
                                sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px", borderRadius: "2px" } }}
                                {...getFieldProps("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </FormControl>
                        <FormControl>
                            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Password</Typography>
                            <TextField type="password" placeholder="enter password"
                                sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px", borderRadius: "2px" } }}
                                {...getFieldProps("password")}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </FormControl>
                        <Button variant="blackButton" type="submit"
                        >Sign Up</Button>
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
                                onClick={() => navigate("/onboarding/recruiter/login")}
                            > Log in
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    )
}