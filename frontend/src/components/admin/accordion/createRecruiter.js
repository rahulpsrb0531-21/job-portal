import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { useFormik, Form, FormikProvider } from "formik"
import { Autocomplete, Box, Button, FormControl, Stack, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import authServices from "../../../services/authServices"
import recruiterServices from "../../../services/recruiterServices"


export default function CreateRecruiter({ handleNext }) {
    const [recruiters, setRecruiters] = useState([])
    const [newRecruiter, setNewRecruiter] = useState(false)
    const [isSelectedCompany, setIsSelectedCompany] = useState(false)
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

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
            handleNext()
        } else {
            enqueueSnackbar(res?.message, {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    useEffect(() => {
        getAllRecruiter()
    }, [])

    async function getAllRecruiter() {
        const res = await recruiterServices.getAllRecruiter()
        // console.log(res)
        if (res && res.data.length > 0) {
            setRecruiters(
                res.data.map(({ recruiterName: label, ...rest }) => (
                    label
                ))
            )
        } else {
            setRecruiters([])
            setFieldValue("recruiterName", null)
            // enqueueSnackbar("No Projects Availble",{variant:"error",anchorOrigin:{horizontal:"right",vertical:"top"}})
        }
    }

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
                <Box sx={{
                    bgcolor: 'rgb(255, 255, 255)', width: '80%',
                    borderRadius: 0.4, p: 2,
                    border: '1px solid #e0e0e0', borderRadius: "8px"
                }} >

                    {/* <Box  > */}
                    {/* <Typography
                        sx={{ fontSize: 36, fontWeight: 700, color: 'gb(6, 6, 6)' }}
                    >Reacuiter Create Account</Typography> */}
                    {/* <Typography sx={{ fontSize: 14, fontWeight: 400, color: "rgb(0, 0, 0)" }} >Find your next opportunity!</Typography>
                    </Box> */}
                    {
                        !newRecruiter ?
                            (
                                <Stack spacing={2} >
                                    <Stack direction={'row'} alignItems={'center'} sx={{ width: '100%' }}>
                                        <Autocomplete
                                            fullWidth
                                            disableClearable
                                            options={recruiters}
                                            id="combo-box-demo"
                                            // value={recruiterName}
                                            onChange={(event, value) => {
                                                // setFieldValue("recruiterName", value) 
                                                // console.log('value', value)
                                                setIsSelectedCompany(true)
                                            }}
                                            ListboxProps={{ style: { maxHeight: 200, overflow: 'auto' } }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                                    placeholder="Recruiter Name"
                                                />
                                            )}
                                        />
                                        <Stack direction={'row'} alignItems='center'>
                                            <Typography sx={{ ml: 1 }}>-</Typography>
                                            <Typography sx={{ ml: 1 }}>-</Typography>
                                            <Typography sx={{ ml: 1 }}>-</Typography>
                                            <Typography sx={{ fontSize: '20px', color: '#818E94', ml: 1 }} >OR</Typography>
                                            <Typography sx={{ ml: 1 }}>-</Typography>
                                            <Typography sx={{ ml: 1 }}>-</Typography>
                                            <Typography sx={{ ml: 1 }}>-</Typography>
                                        </Stack>
                                        <Button type="submit" variant="outlined" sx={{ width: "30%", py: 2, px: 3 }}
                                            onClick={() => setNewRecruiter(true)}
                                        >+ Add New Recruiter</Button>
                                    </Stack>
                                    <Button type="submit" disabled={!isSelectedCompany} variant="outlined" sx={{ width: 200 }}
                                        onClick={() => handleNext()}
                                    >Save</Button>
                                </Stack>

                            ) :
                            (
                                <Stack sx={{ width: '60%', pl: 2, pb: 3.2 }} spacing={2}>
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
                                        <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Paaword</Typography>
                                        <TextField type="password" placeholder="enter password"
                                            sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px", borderRadius: "2px" } }}
                                            {...getFieldProps("password")}
                                            error={Boolean(touched.password && errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                    </FormControl>
                                    <Button sx={{ width: 100 }} variant="blackButton" type="submit"
                                    // onClick={() => handleNext()}
                                    >Sign Up</Button>
                                </Stack>
                            )
                    }
                    {/* </Stack> */}


                </Box>
            </Form>
        </FormikProvider >
    )
}