import { useCallback, useEffect, useState } from "react"
import { server } from "../../utils/server"
import { useDropzone } from 'react-dropzone'
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { Box, Button, MenuItem, Stack, TextField, Typography, Select, Chip, FormControl } from "@mui/material";
import recruiterServices from "../../services/recruiterServices"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCredentials } from "../../redux/reducers/authSlice"


export default function EditRecruiterProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const [uploadedImage, setUploadedImage] = useState(null)
    const { user } = useSelector((state) => state.auth)
    const token = localStorage.getItem('access')
    const [locations, setLocations] = useState([])
    const [newLocation, setNewLocation] = useState('')
    const [markets, setMarkets] = useState([])
    const [newMarket, setNewMarket] = useState('')
    const [resData, setResData] = useState({})

    const addLocation = () => {
        if (newLocation?.length !== 0) {
            setLocations([...locations, newLocation])
            setNewLocation('')
        }
    }

    const removeLocation = (index) => {
        const updatedLocation = locations.filter((_, i) => i !== index);
        setLocations(updatedLocation);
    }

    const addMarket = () => {
        if (newMarket?.length !== 0) {
            setMarkets([...markets, newMarket])
            setNewMarket('')
        }
    }

    const removeMarket = (index) => {
        const updatedMarket = markets.filter((_, i) => i !== index);
        setMarkets(updatedMarket)
    }

    useEffect(() => {
        if (user?.role !== "RECRUITER" || !token) {
            navigate('/')
        }
    }, [])

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
        // companyname: Yup.string().required("Company Name is required"),
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
        // locations: Yup.array().required("Location is required"),
        // newLocation: Yup.string(),
        markets: Yup.array(),
        newMarket: Yup.string(),
    })
    const formik = useFormik({
        initialValues: {
            // companyname: "",
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
            // locations: [],
            // newLocation: '',
            newLocation: "",
            markets: [],
            newMarket: "",
        },
        validationSchema: editRecruiterSchema,
        onSubmit: (v) => {
            // console.log('v>>>>>>', v)
            const data = {
                // companyLogo: uploadedImage,
                // companyName: v?.companyname,
                oneLinePitch: v?.oneLinePitch,
                companySize: v?.companySize,
                companyType: v?.companyType,
                markets: markets,
                location: locations,
                recruiterName: v?.recruiterName,
                email: user?.email,
                phone: v?.phone,
                workEmail: v?.workEmail,
                website: v?.website,
                twitter: v?.twitter,
                linkedIn: v?.linkedIn,
                facebook: 'facebook.com',
                blogUrl: v?.blogUrl
            }
            // console.log(data)
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
            dispatch(setCredentials({ ...res }))
            navigate('/recruiter/dashboard')
        } else {
            enqueueSnackbar('error', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }

    // getRecruiterById
    async function getRecruiterById(id) {
        const res = await recruiterServices.getRecruiterById(id)
        // setSubmitting(false)
        // console.log(res, 'sdfhls')
        if (res && res.success) {
            // console.log('res', res)
            setFieldValue("recruiterName", res?.user?.recruiterName)
            setFieldValue("workEmail", res.user?.email)
            setFieldValue("phone", res.user?.phone)
            setFieldValue("one", res.user?.email)
            setFieldValue("oneLinePitch", res.user?.oneLinePitch)
            setFieldValue("companySize", res.user?.companySize)
            setFieldValue("companyType", res.user?.companyType)
            setMarkets(res.user?.markets)
            setLocations(res.user?.location)
            setFieldValue("recruiterName", res.user?.recruiterName)
            setFieldValue("email", res.user?.email)
            setFieldValue("phone", res.user?.phone)
            setFieldValue("workEmail", res.user?.workEmail)
            setFieldValue("website", res.user?.website)
            setFieldValue("twitter", res.user?.twitter)
            setFieldValue("linkedIn", res.user?.linkedIn)
            setFieldValue("blogUrl", res.user?.blogUrl)
            // setResData({ ...res })
        } else {
            enqueueSnackbar('error', {
                variant: "error",
                anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            })
        }
    }
    useEffect(() => {
        if (user) {
            // console.log(user)
            getRecruiterById(user?._id)
            // setFieldValue("recruiterName", user?.recruiterName)
            // setFieldValue("workEmail", user?.email)
            // setFieldValue("phone", user?.phone)
            // setFieldValue("one", user?.email)
            // setFieldValue("oneLinePitch", user?.oneLinePitch)
            // setFieldValue("companySize", user?.companySize)
            // setFieldValue("companyType", user?.companyType)
            // setMarkets(user?.markets)
            // setLocations(user?.location)
            // setFieldValue("recruiterName", user?.recruiterName)
            // setFieldValue("email", user?.email)
            // setFieldValue("phone", user?.phone)
            // setFieldValue("workEmail", user?.workEmail)
            // setFieldValue("website", user?.website)
            // setFieldValue("twitter", user?.twitter)
            // setFieldValue("linkedIn", user?.linkedIn)
            // setFieldValue("blogUrl", user?.blogUrl)
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
                <Stack justifyContent={'center'} direction={'row'} my={1} >
                    <Box sx={{ width: { xs: "100%", lg: '40%' }, border: '1px solid #e0e0e0', }} >
                        <Stack spacing={2} sx={{
                            width: "100%",
                            bgcolor: 'rgb(255, 255, 255)',
                            borderRadius: 0.4, p: 2, pt: { xs: 2, lg: 4 }
                        }} >
                            <Typography variant="companyTitle" >Edit Profile</Typography>

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
                            {/* <Stack>
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
                            </Stack> */}
                            <Stack sx={{ width: { xs: "100%", lg: "60%" } }} spacing={1} >
                                <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap >
                                    {
                                        locations.map((location, idx) => (
                                            <Chip label={location} key={idx} sx={{ borderRadius: "4px" }}
                                                onDelete={() => removeLocation(idx)}
                                            />
                                        ))
                                    }
                                </Stack>
                                <FormControl>
                                    <Typography variant="profilePageTitle" >Locations?*</Typography>
                                    <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                        value={newLocation}
                                        onChange={(e) => setNewLocation(e.target.value)}
                                    />
                                    <Button variant="blackButton" sx={{ fontSize: 12, width: "120px", height: "30px", bgcolor: 'black', fontWeight: 500, mt: 0.6 }}
                                        onClick={() => addLocation()}
                                    >Add Location</Button>
                                </FormControl>
                            </Stack>

                            <Stack sx={{ width: { xs: "100%", lg: "60%" } }} spacing={1} >
                                <Stack direction={'row'} flexWrap={'wrap'} spacing={1} useFlexGap >
                                    {
                                        markets.map((market, idx) => (
                                            <Chip label={market} key={idx} sx={{ borderRadius: "4px" }}
                                                onDelete={() => removeMarket(idx)}
                                            />
                                        ))
                                    }
                                </Stack>
                                <FormControl>
                                    <Typography variant="profilePageTitle" >Markets?*</Typography>
                                    <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "40px" } }}
                                        value={newMarket}
                                        onChange={(e) => setNewMarket(e.target.value)}
                                    />
                                    <Button variant="blackButton" sx={{ fontSize: 12, width: "120px", height: "30px", bgcolor: 'black', fontWeight: 500, mt: 0.6 }}
                                        onClick={() => addMarket()}
                                    >Add Markets</Button>
                                </FormControl>
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

                            {/* <Stack>
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
                            </Stack> */}

                            <Stack>
                                <Typography variant="profilePageTitle" >One-line pitch</Typography>
                                <TextField sx={{ ".css-3ux5v-MuiInputBase-root-MuiOutlinedInput-root": { height: "32px", borderRadius: '4px' } }}
                                    {...getFieldProps("oneLinePitch")}
                                    error={Boolean(touched.oneLinePitch && errors.oneLinePitch)}
                                    helperText={touched.oneLinePitch && errors.oneLinePitch}
                                />
                            </Stack>
                            <Button size="small" variant="outlined" type="submit"
                                onClick={() => console.log(errors)}
                                sx={{ fontSize: 14, width: "88px", height: "30px", fontWeight: 500 }}
                            >Edit</Button>
                        </Stack>
                    </Box>
                </Stack>
            </Form>
        </FormikProvider>
    )
}