import { useEffect, useState } from "react"
import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { useSnackbar } from "notistack"
import { Link as RouterLink, json, useNavigate } from "react-router-dom"
import { Box, Button, FormControl, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import authServices from "../../services/authServices"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/reducers/authSlice"
import Iconify from "../../components/Iconify"


export default function Login() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const token = localStorage.getItem('access')
    const [showPassword, setShowPassword] = useState(false)
    // const user = JSON.parse(localStorage.getItem('user'))

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
            navigate("/candidate/dashboard", { replace: true })
        }
        if (user && user?.role === "RECRUITER") {
            navigate("/recruiter/dashboard", { replace: true })
        }
    }, [token])

    async function loginCandidate(data) {
        const res = await authServices.login(data)
        // console.log("res>>>>>>>>", res)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })

            dispatch(setCredentials({ ...res }))
            localStorage.setItem("access", res.accessToken)
            console.log(res?.candidate)
            // navigate(res?.candidate?.navConfig[0]?.path, { replace: true })
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
                    direction={{ xs: "column", sm: 'column', md: 'row', lg: 'row' }}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{ position: "relative" }}
                >
                    <Stack sx={{ width: '100%' }}>
                        {/* desktop img */}
                        <Box
                            component={'img'}
                            src="/images/login-page-background-img.webp"
                            sx={{
                                width: { md: 440, lg: 460 },
                                display: { xs: 'none', sm: "none", md: "block", lg: 'block' },
                                position: "absolute", top: 0, left: 0
                            }}
                        />
                        {/* mobile img  */}
                        <Stack alignItems={'start'}>
                            <Box
                                component={'img'}
                                src="/images/login-page-background-img-mobile-view.webp"
                                sx={{
                                    width: { xs: 100, sm: 140 },
                                    display: { xs: 'flex', sm: "flex", md: "none", lg: 'none' }
                                }}
                            />
                        </Stack>
                        <Typography variant="loginTitle"
                            sx={{
                                lineHeight: { xs: "22px", sm: '22px', md: "46px", lg: "46px" },
                                position: "absolute",
                                textAlign: "center",
                                left: { xs: 130, sm: 310, md: 76, lg: 86 },
                                top: { xs: 10, sm: 10, md: 270, lg: 280 }
                            }}
                        >Find the job <br /> made for <br /> you.</Typography>
                    </Stack>
                    <Stack sx={{
                        position: "absolute",
                        top: { xs: 120, sm: 120, md: 12, lg: 12 },
                        ml: { xs: 0, sm: 0, md: 74, lg: 84 }
                    }} spacing={2} alignItems={'center'} >
                        <Box sx={{ textAlign: 'center' }} >
                            <Typography
                                sx={{ fontSize: 36, fontWeight: 700, color: 'rgb(6, 6, 6)' }}
                            >Login</Typography>
                        </Box>
                        <FormControl>
                            <Typography variant="formLabelText">Email</Typography>
                            <TextField type="text" placeholder="Email"
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
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
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
                            sx={{ width: 280 }}
                        >Log in</Button>
                        <Stack direction={'row'} justifyContent={'center'} >
                            <Typography
                                sx={{ fontSize: 14, color: "rgb(0, 0, 0)" }}
                            >Not registered ? </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14, color: "rgb(0, 0, 0)",
                                    cursor: "pointer",
                                    textDecoration: 'underline',
                                    ":hover": {
                                        color: "blue"
                                    }
                                }}
                                onClick={() => navigate("/register")}
                            > Create an Account
                            </Typography>
                        </Stack>
                    </Stack>
                    {/* </Stack> */}
                </Stack>
            </Form>
        </FormikProvider>
    )
}