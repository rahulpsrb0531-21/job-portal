import { useCallback, useEffect, useState } from "react"
import { server } from "../../utils/server"
import { useDropzone } from 'react-dropzone'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { Box, Button, MenuItem, Stack, TextField, Typography, Select, Chip } from "@mui/material";
import recruiterServices from "../../services/recruiterServices"
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default function EditRecruiterProfile() {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const [uploadedImage, setUploadedImage] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const token = localStorage.getItem('access')

    useEffect(() => {
        if (user?.role !== "RECRUITER" && token) {
            navigate('/login')
        }
    }, [])
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
        recruiterName: Yup.string().required("Name is required"),
        phone: Yup.number().required("Name is required"),
        locations: Yup.array().required("Location is required"),
        newLocation: Yup.string(),
        markets: Yup.array(),
        newMarket: Yup.string(),
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
            phone: null,
            locations: [],
            newLocation: '',
            newLocation: "",
            markets: [],
            newMarket: "",
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
                recruiterName: user?.recruiterName,
                email: user?.email,
                phone: v?.phone,
                workEmail: v?.workEmail,
                website: v?.website,
                twitter: v?.twitter,
                linkedIn: v?.linkedIn,
                facebook: 'fjkl;d',
                blogUrl: v?.blogUrl
            }
            console.log(data)
            updateRecruiter(data)
        }
    })

    async function updateRecruiter(data) {
        const res = await recruiterServices.update(data)
        setSubmitting(false)
        if (res && res.success) {
            enqueueSnackbar(res?.message, {
                variant: "success",
                anchorOrigin: { horizontal: "right", vertical: "top" },
                autoHideDuration: 1000
            })
            navigate('/recruiter/dashboard')
        } else {
            enqueueSnackbar('error', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    useEffect(() => {
        if (user) {
            setFieldValue("recruiterName", user?.recruiterName)
            setFieldValue("workEmail", user?.email)
        }
    }, [user])


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
                    <Box sx={{ bgcolor: 'black', width: '18%', textAlign: "center", px: 1 }} >
                        <Typography sx={{ color: "white", fontSize: 18, pt: 4 }} >Set up your account</Typography>
                        <Typography sx={{ color: "white", fontSize: 12 }} >We make it easy for you to connect with high-quality startup talent who are ready for a new challenge.start sourcing today</Typography>
                    </Box>
                    <Box sx={{ width: "80%" }} >
                        <Stack spacing={1} sx={{
                            width: '50%',
                            bgcolor: 'rgb(255, 255, 255)',
                            borderRadius: 0.4, p: 1, pt: 4
                        }} >
                            <Typography variant="companyTitle" >Let's create you Account</Typography>
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
                            <Stack>
                                <Typography variant="profilePageTitle" >About your</Typography>
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
                                <Typography variant="profilePageTitle" >Phone*</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("phone")}
                                    error={Boolean(touched.phone && errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                />
                            </Stack>
                            <Button size="small" variant="outlined" type="submit"
                                onClick={() => console.log(errors)}
                                sx={{ fontSize: 14, width: "58px", height: "30px", fontWeight: 500 }}
                            >Save</Button>
                        </Stack>
                    </Box>
                </Stack>
            </Form>
        </FormikProvider>
    )
}