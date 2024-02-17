import { useCallback, useEffect, useState } from "react"
import { server } from "../../../utils/server"
import { useDropzone } from 'react-dropzone'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { Box, Button, MenuItem, Stack, TextField, Typography, Select, Chip, Autocomplete, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import recruiterServices from "../../../services/recruiterServices"
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import adminServices from "../../../services/adminServices"


export default function CreateRecruiter({ handleNext }) {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [uploadedImage, setUploadedImage] = useState(null)
    const [recruiters, setRecruiters] = useState([])
    const token = localStorage.getItem('access')

    const { user } = useSelector((state) => state.auth)
    // console.log("user", user)
    const onDrop = useCallback((acceptedFiles) => {
        const imageFile = acceptedFiles[0]
        setUploadedImage(URL.createObjectURL(imageFile))
        const formData = new FormData();
        formData.append('image', imageFile);
        server.post(`upload-image`, formData)
            .then(res => {
                return res.data
            })
            .catch(err => {
                return null
            })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    })
    const dropzoneStyles = {
        border: '1px dashed #cccccc',
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: '4px',
        padding: '20px',
        // textAlign: 'center',
        cursor: 'pointer',
        backgroundImage: uploadedImage ? `url(${uploadedImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '160px',
    }

    const editRecruiterSchema = Yup.object().shape({
        companyname: Yup.string().required("Company Name is required"),
        companySize: Yup.string().required("Company Size is required"),
        companyType: Yup.string().required("Company Type is required"),
        workEmail: Yup.string().required("Work email is required"),
        website: Yup.string().required("Website is required"),
        twitter: Yup.string(),
        linkedIn: Yup.string(),
        facebook: Yup.string(),
        blogUrl: Yup.string(),
        oneLinePitch: Yup.string().required("One Line Pitch is required"),
        // RECRUITER 
        recruiterName: Yup.string().required("Full Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
        phone: Yup.number().required("Phone number is required"),

        locations: Yup.array().required("Location is required"),
        newLocation: Yup.string(),
        markets: Yup.array(),
        newMarket: Yup.string(),
        isPremiumMember: Yup.boolean().required("Premium member is required")
    })
    const formik = useFormik({
        initialValues: {
            companyname: "",
            companyType: "",
            workEmail: "",
            website: "",
            twitter: "",
            linkedIn: "",
            facebook: "",
            blogUrl: "",
            companySize: "",
            oneLinePitch: "",
            recruiterName: "",
            email: "",
            password: "",
            phone: "",
            phone: null,
            locations: [],
            newLocation: '',
            newLocation: "",
            markets: [],
            newMarket: "",
            isPremiumMember: null
        },
        validationSchema: editRecruiterSchema,
        onSubmit: (v) => {
            // console.log('v>>>>>>', v)
            const data = {
                companyLogo: uploadedImage,
                companyName: v?.companyname,
                companyDescription: "",
                oneLinePitch: v?.oneLinePitch,
                companySize: v?.companySize,
                companyType: v?.companyType,
                markets: v?.markets,
                location: v?.locations,

                // RECRUITER 
                recruiterName: v?.recruiterName,
                password: v?.password,
                email: v?.email,
                phone: v?.phone,
                role: "RECRUITER",

                workEmail: v?.workEmail,
                website: v?.website,
                twitter: v?.twitter,
                linkedIn: v?.linkedIn,
                facebook: 'fjkl;d',
                blogUrl: v?.blogUrl,
                isPremiumMember: (v?.isPremiumMember === "true" ? true : false),
            }
            // console.log('data>>>', data)
            registerRecruiter(data)
        }
    })

    async function registerRecruiter(data) {
        const res = await adminServices.registerRecruiterByAdmin(data)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })

            navigate('/admin/recruiters')

        } else {
            enqueueSnackbar('error', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    useEffect(() => {
        if (user?.role !== "ADMIN" && token) {
            navigate('/login')
        }
    }, [])


    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setSubmitting,
        setFieldValue, resetForm
    } = formik

    const deleteMarket = (idx) => {
        setFieldValue('markets', values.markets.filter((market, i) => i !== idx))
    }

    const deleteLocation = (idx) => {
        setFieldValue('locations', values.locations.filter((data, i) => i !== idx))
    }

    const companySizeData = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+']

    const companyTypeData = ['Startup', "mnc"]
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack justifyContent={'space-between'} direction={'row'}>
                    <Box sx={{ width: "80%" }} >
                        <Stack spacing={2} sx={{
                            width: '80%',
                            bgcolor: 'rgb(255, 255, 255)',
                            borderRadius: 0.4, p: 1, pt: 0
                        }} >

                            <Stack spacing={1}>
                                <Stack>
                                    <Typography variant="profilePageTitle" >About your Recruiter</Typography>
                                    <Typography variant="profilePageSubText" >Keep in mind you can always update this later</Typography>
                                </Stack>

                                <Stack>
                                    <Typography variant="profilePageTitle" >Name*</Typography>
                                    <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                        {...getFieldProps("recruiterName")}
                                        error={Boolean(touched.recruiterName && errors.recruiterName)}
                                        helperText={touched.recruiterName && errors.recruiterName}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography variant="profilePageTitle" >Email*</Typography>
                                    <TextField type="email" placeholder="mail@website.com"
                                        sx={{
                                            ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' },
                                            pt: 1
                                        }}
                                        {...getFieldProps("email")}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography variant="profilePageTitle" >Password*</Typography>
                                    <TextField
                                        autoComplete="off"
                                        type="password" placeholder="Password"
                                        sx={{ ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input ": { height: "32px", borderRadius: '4px', p: 0.2, pl: 1.4 } }}
                                        {...getFieldProps("password")}
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography variant="profilePageTitle" >Phone*</Typography>
                                    <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                        {...getFieldProps("phone")}
                                        error={Boolean(touched.phone && errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                </Stack>
                            </Stack>

                            <Stack>
                                <Typography variant="profilePageTitle" >About your Company</Typography>
                                <Typography variant="profilePageSubText" >Keep in mind you can always update this later</Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Company Name*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("companyname")}
                                    error={Boolean(touched.companyname && errors.companyname)}
                                    helperText={touched.companyname && errors.companyname}
                                />
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Logo Content*</Typography>
                                <div>
                                    <div {...getRootProps()} style={dropzoneStyles}>
                                        <input {...getInputProps()} />
                                        {!uploadedImage &&
                                            <p>Upload Logo</p>
                                        }
                                    </div>
                                </div>
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Work Email*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("workEmail")}
                                    error={Boolean(touched.workEmail && errors.workEmail)}
                                    helperText={touched.workEmail && errors.workEmail}
                                />
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Website*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("website")}
                                    error={Boolean(touched.website && errors.website)}
                                    helperText={touched.website && errors.website}
                                />
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Twitter</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("twitter")}
                                    error={Boolean(touched.twitter && errors.twitter)}
                                    helperText={touched.twitter && errors.twitter}
                                />
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >LinkedIn</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("linkedIn")}
                                    error={Boolean(touched.linkedIn && errors.linkedIn)}
                                    helperText={touched.linkedIn && errors.linkedIn}
                                />
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Blog Url</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("blogUrl")}
                                    error={Boolean(touched.blogUrl && errors.blogUrl)}
                                    helperText={touched.blogUrl && errors.blogUrl}
                                />
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Location*</Typography>
                                <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap sx={{ pb: 1 }} >
                                    {
                                        values?.locations.map((data, idx) => (
                                            <Chip label={data} key={idx} sx={{ borderRadius: "4px" }}
                                                onDelete={() => deleteLocation(idx)}
                                            />
                                        ))
                                    }
                                </Stack>
                                <Field name="newLocation">
                                    {({ field }) => (
                                        <TextField
                                            sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                            {...field}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    setFieldValue("locations", [...values.locations, e.target.value])
                                                    setFieldValue('newLocation', '')
                                                }
                                            }}
                                        />
                                    )}
                                </Field>
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Company size*</Typography>
                                <Select
                                    sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
                                    value={values.companySize} {...getFieldProps('companySize')}
                                >
                                    {
                                        companySizeData?.map((data, idx) => (
                                            <MenuItem key={idx} value={data} >{data}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Company Type*</Typography>
                                <Select
                                    sx={{ ".css-k6dkf7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { p: 1 } }}
                                    value={values.companyType} {...getFieldProps('companyType')}
                                >
                                    {
                                        companyTypeData?.map((data, idx) => (
                                            <MenuItem key={idx} value={data} >{data}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >Markets*</Typography>
                                <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap sx={{ pb: 1 }} >
                                    {
                                        values?.markets.map((skill, idx) => (
                                            <Chip label={skill} key={idx} sx={{ borderRadius: "4px" }}
                                                onDelete={() => deleteMarket(idx)}
                                            />
                                        ))
                                    }
                                </Stack>
                                <Field name="newMarket">
                                    {({ field }) => (
                                        <TextField
                                            sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                            {...field}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    setFieldValue("markets", [...values.markets, e.target.value])
                                                    setFieldValue('newMarket', '')
                                                }
                                            }}
                                        // onKeyDown={() => onKeyDown}
                                        />
                                    )}
                                </Field>
                            </Stack>
                            <Stack>
                                <Typography variant="profilePageTitle" >One-line pitch</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("oneLinePitch")}
                                    error={Boolean(touched.oneLinePitch && errors.oneLinePitch)}
                                    helperText={touched.oneLinePitch && errors.oneLinePitch}
                                />
                            </Stack>
                            <Box>
                                <FormControl>
                                    <Typography variant="profilePageTitle" >Premium Memeber ?*</Typography>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={values?.isPremiumMember}
                                        onChange={(e) => setFieldValue("isPremiumMember", e.target.value)}
                                    >
                                        <FormControlLabel
                                            value={true} control={<Radio size="sm" />}
                                            label={<Typography sx={{ fontSize: 14, fontWeight: 600, ml: -0.6 }} >Yes</Typography>}
                                        />
                                        <FormControlLabel value={false} control={<Radio size="sm" />}
                                            label={<Typography sx={{ fontSize: 14, fontWeight: 600, ml: -0.6 }} >No</Typography>}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Button size="small" variant="outlined" type="submit"
                                // onClick={() => console.log(errors)}
                                // onClick={() => handleNext()}
                                sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                            >Save</Button>
                        </Stack>
                    </Box>
                </Stack>
            </Form>
        </FormikProvider>
    )
}