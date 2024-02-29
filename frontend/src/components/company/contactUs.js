import { Box, Button, Container, Divider, FormControl, FormHelperText, FormLabel, Stack, TextField, Typography } from "@mui/material";
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, getIn } from "formik"

export default function ContactUs() {

    const contactUsSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        phone: Yup.number().required("Number is required"),
        message: Yup.string().required("Message is required")
    })
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: ''
        },
        validationSchema: contactUsSchema,
        onSubmit: (v) => {
            const data = {
                name: v?.name,
                email: v?.email,
                phone: v?.phone,
                message: v?.message
            }
            // createApplication(data)
        },
    })

    const { errors, touched, values, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik


    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack direction={{ xs: "column", sm: "column", md: "row", lg: 'row' }}
                    sx={{
                        height: 'auto',
                        bgcolor: "rgb(235, 255, 0)",
                        // p: { xs: 0, sm: 0, md: 4, lg: 4 },
                        pb: 6
                    }}
                >

                    <Stack direction={'row'} sx={{
                        // bgcolor: "red",
                        width: { xs: '100%', sm: '100%', md: "64%", lg: "64%" }, px: 4
                    }} spacing={2} >
                        <VerticalLine />
                        <Typography variant="contactUsTitle"
                            sx={{ pr: { xs: 0, sm: 0, md: 20, lg: 20 } }}
                        >Get in touch and start saving time today
                        </Typography>
                    </Stack>

                    <VerticalLine />

                    <Stack sx={{
                        width: { xs: '100%', sm: '100%', md: "36%", lg: "36%" },
                        p: 4
                    }} >
                        <Typography
                            sx={{ fontSize: 16 }}
                        >Our team will take you through the key features and benefits of Atticus, and get to know your current verification needs and pain points.
                        </Typography>
                        <Stack spacing={1} sx={{ pt: 2 }} >
                            <FormControl>
                                <Typography sx={{ fontSize: 14 }} >Name</Typography>
                                <TextField
                                    sx={{ ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input": { height: "6px", bgcolor: "white", borderRadius: "8px" } }}
                                    {...getFieldProps("name")}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ fontSize: 14 }} >Email</Typography>
                                <TextField
                                    sx={{ ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input": { height: "6px", bgcolor: "white", borderRadius: "8px" } }}
                                    {...getFieldProps("email")}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ fontSize: 14 }} >Phone</Typography>
                                <TextField
                                    sx={{ ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input": { height: "6px", bgcolor: "white", borderRadius: "8px" } }}
                                    {...getFieldProps("phone")}
                                    error={Boolean(touched.phone && errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ fontSize: 14 }} >Message</Typography>
                                <TextField
                                    multiline={true}
                                    sx={{ bgcolor: 'white', borderRadius: "8px" }}
                                    rows={4}
                                    {...getFieldProps("message")}
                                // error={Boolean(touched.message && errors.message)}
                                // helperText={touched.message && errors.message}
                                />
                                <FormHelperText>{errors.message}</FormHelperText>
                            </FormControl>
                            <Button variant="blackButton" type="submit"  >
                                Request more information
                            </Button>
                        </Stack>
                    </Stack>
                </Stack >
            </Form>
        </FormikProvider>
    )
}

const VerticalLine = () => {
    return (
        <Box
            sx={{
                width: "1px", height: 'auto', bgcolor: 'black', mt: "0px",
                display: { xs: "none", sm: 'none', md: "block", lg: "block" }
            }}
        ></Box>
    )
}