import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { Box, Button, Checkbox, FormControl, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import authServices from "../../services/authServices"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/reducers/authSlice"
import Iconify from "../../components/Iconify"


export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const token = localStorage.getItem('access')
    const { user } = useSelector((state) => state.auth)
    const [privacyChecked, setPrivacyChecked] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


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
            registerCandidate({
                ...v, privacyChecked: privacyChecked
                , role: "CANDIDATE"
            })
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

    const handleShowPassword = () => {
        setShowPassword((show) => !show)
    }

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack direction={{ xs: "column", lg: 'row' }}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{ position: "relative" }} >
                    <Stack sx={{ width: '100%' }}>
                        {/* desktop img */}
                        <Box
                            component={'img'}
                            src="/images/register-page-background-img.webp"
                            sx={{
                                width: { md: 400, lg: 420 },
                                display: { xs: 'none', sm: "none", md: "block", lg: 'block' },
                                position: "absolute", top: 0, left: 0
                            }} />
                        {/* mobile img  */}
                        <Stack alignItems={'end'} >
                            <Box
                                component={'img'}
                                src="/images/register-page-background-img-mobile-view.webp"
                                sx={{
                                    width: { xs: 100, sm: 140 },
                                    display: { xs: 'flex', sm: "flex", md: "none", lg: 'none' }
                                }}
                            />
                        </Stack>
                        <Typography variant="loginTitle"
                            sx={{
                                lineHeight: { xs: "22px", md: "46px", lg: "46px" },
                                position: "absolute",
                                left: { xs: 0, sm: 0, md: 0, lg: 0 },
                                right: { xs: 40, sm: 0, md: 600, lg: 640 },
                                top: { xs: 10, md: 280, lg: 280 }
                            }}
                        >Find the job <br /> made for <br /> you.</Typography>
                    </Stack>
                    <Stack sx={{
                        position: "absolute",
                        top: { xs: 160, sm: 120, md: 12, lg: 12 },
                        ml: { xs: 0, sm: 0, md: 74, lg: 84 }
                    }} spacing={2} alignItems={'center'} >
                        <Box sx={{ textAlign: 'center' }} >
                            <Typography
                                sx={{ fontSize: 36, fontWeight: 700, color: 'gb(6, 6, 6)' }}
                            >Create Account</Typography>
                        </Box>
                        <FormControl>
                            <Typography variant="formLabelText">Full Name</Typography>
                            <TextField type="text" placeholder="enter text"
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    width: 280
                                }}
                                {...getFieldProps("candidateName")}
                                error={Boolean(touched.candidateName && errors.candidateName)}
                                helperText={touched.candidateName && errors.candidateName}
                            />
                        </FormControl>
                        <FormControl>
                            <Typography variant="formLabelText">Email</Typography>
                            <TextField type="email" placeholder="mail@website.com"
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    width: 280
                                }}
                                {...getFieldProps("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </FormControl>
                        <FormControl>
                            <Typography variant="formLabelText">Password</Typography>
                            <TextField
                                type={showPassword ? 'text' : 'password'}
                                placeholder="enter password"
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    width: 280
                                }}
                                {...getFieldProps("password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </FormControl>
                        <Stack direction={'row'} alignItems='center' >
                            <Checkbox onClick={() => setPrivacyChecked(!privacyChecked)} />
                            <Typography sx={{ fontSize: 14 }} >I ACCEPT THE <span style={{ color: "#699BF7", fontWeight: 600 }} >PRIVACY STATEMENT</span></Typography>
                        </Stack>
                        <Button disabled={!privacyChecked} variant="blackButton" type="submit"
                            sx={{ width: 280 }}
                        >Sign Up</Button>
                        <Stack direction={'row'} justifyContent={'center'} >
                            <Typography
                                sx={{ fontSize: 14, color: "rgb(0, 0, 0)" }}
                            >Already have an account?
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14, color: "rgb(0, 0, 0)",
                                    cursor: "pointer",
                                    textDecoration: 'underline',
                                    ":hover": {
                                        color: "blue"
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