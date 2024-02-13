import React, { useEffect } from "react"
import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/authServices"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/reducers/authSlice"


export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const token = localStorage.getItem('access')
    const { user } = useSelector((state) => state.auth)

    const LoginSchema = Yup.object().shape({
        candidateName: Yup.string().required("Full Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    const formik = useFormik({
        initialValues: {
            candidateName: "",
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: (v) => {
            // console.log('v >>>>>', { ...v, role: "CANDIDATE" })
            registerCandidate({ ...v, role: "CANDIDATE" })
        },
    })
    async function registerCandidate(data) {
        const res = await authServices.register(data)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            dispatch(setCredentials({ ...res }))
            localStorage.setItem("access", res.accessToken)
            navigate("/candidate/profile", { replace: true })
        } else {
            enqueueSnackbar(res?.data?.message || "server error", {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    useEffect(() => {
        if (token && user?.role === 'CANDIDATE') {
            navigate("/candidate/profile", { replace: true })
        }
        if (user && user?.role === "RECRUITER") {
            navigate("/recruiter/dashboard", { replace: true })
        }
    }, [token])

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
                                {...getFieldProps("candidateName")}
                                error={Boolean(touched.candidateName && errors.candidateName)}
                                helperText={touched.candidateName && errors.candidateName}
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
                                onClick={() => navigate("/login")}
                            > Log in
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    )
}