import { useEffect, useState } from "react"
import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { useSnackbar } from "notistack"
import { Link as RouterLink, json, useNavigate } from "react-router-dom"
import { Box, Button, FormControl, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import authServices from "../../services/authServices"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/reducers/authSlice"
import Iconify from '../../components/Iconify'

export default function RecruiterLogin() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const token = localStorage.getItem('access')
    const [showPassword, setShowPassword] = useState(false)
    // console.log(user)

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

    const handleShowPassword = () => {
        setShowPassword((show) => !show)
    }


    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack
                    direction={{ xs: "column", sm: "column", md: "column", lg: 'row' }}
                    alignItems={'center'}
                    justifyContent={'space-evenly'}
                    sx={{ position: "relative" }}
                >
                    <Stack sx={{ width: '100%' }}>
                        {/* desktop img */}
                        <Box
                            component={'img'}
                            src="/images/recruiter-login-page-background-img.webp"
                            sx={{
                                width: { md: 400, lg: 420 },
                                display: { xs: 'none', sm: "none", md: "block", lg: 'block' },
                                position: "absolute", top: 0, left: 0
                            }}
                        />
                        {/* mobile img  */}
                        <Box
                            component={'img'}
                            src="/images/login-page-background-img-mobile-view.webp"
                            sx={{
                                width: { xs: 100, sm: 140 },
                                display: { xs: 'flex', sm: "flex", md: "none", lg: 'none' }
                            }}
                        />
                        <Typography variant="loginTitle"
                            sx={{
                                lineHeight: { xs: "22px", md: "46px", lg: "46px" },
                                position: "absolute",
                                left: { xs: 0, lg: 0 },
                                right: { xs: 0, md: 580, lg: 580 },
                                top: { xs: 10, md: 280, lg: 320 }
                            }}
                        >Find the right <br /> candidate <br /> for your organisation.</Typography>
                    </Stack>
                    <Stack
                        sx={{
                            position: "absolute", top: { xs: 120, sm: 120, md: 10, lg: 10 },
                            ml: { xs: 0, sm: 0, md: 44, lg: 44 }
                        }}
                        spacing={2.8} alignItems={'center'} >
                        <Typography
                            sx={{ fontSize: 36, fontWeight: 700, color: 'gb(6, 6, 6)', textAlign: "left", width: "100%" }}
                        >Login</Typography>
                        <FormControl>
                            <Typography variant="formLabelText">Email</Typography>
                            <TextField type="text" placeholder="Email"
                                sx={{
                                    width: 280,
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                }}
                                {...getFieldProps("email")}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </FormControl>
                        <FormControl>
                            <Typography variant="formLabelText" >Password</Typography>
                            <TextField
                                autoComplete="off"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                sx={{
                                    ".MuiInputBase-root": { borderRadius: '4px' },
                                    width: 280
                                }}
                                {...getFieldProps("password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword} edge="end">
                                                <Iconify
                                                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                        </FormControl>
                        <Button variant="blackButton" type="submit"
                            onClick={() => console.log(errors)}
                            sx={{ width: 280, height: 44 }}
                        >Log in</Button>
                        <Stack direction={'row'} justifyContent={'center'}
                            sx={{ pb: '14px' }}
                        >
                            <Typography
                                sx={{ fontSize: 14, color: "rgb(0, 0, 0)" }}
                            >Not registered?</Typography>
                            <Typography
                                sx={{
                                    fontSize: 14, textDecoration: 'underline', color: "rgb(0, 0, 0)", ":hover": {
                                        color: "blue", cursor: "pointer"
                                    }
                                }}
                                onClick={() => navigate("/onboarding/recruiter/sign-up")}
                            >Create an Account
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Form>
        </FormikProvider>
    )
}