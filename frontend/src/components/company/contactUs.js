import { Box, Button, Container, Divider, FormControl, FormHelperText, FormLabel, Stack, TextField, Typography } from "@mui/material";
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, getIn } from "formik"

export default function ContactUs() {

    const contactUsSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        phone: Yup.number().required("Number is required"),
        message: Yup.string()
        // message: Yup.string().required("Message is required")
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
                <Box sx={{ bgcolor: "#851b15" }} >
                    <Container maxWidth='lg' >
                        <Stack direction={{ xs: "column", sm: "column", md: "row", lg: 'row' }}
                            sx={{
                                height: 'auto',
                                width: "100%",
                                // p: { xs: 0, sm: 0, md: 4, lg: 4 },
                                // p: { xs: 4, sm: 0, md: 10, lg: 10 },
                                py: 10, color: "white"
                            }}
                            spacing={{ xs: 10, sm: 10, md: 0, lg: 0 }}
                        >

                            <Stack direction={'row'} sx={{
                                // bgcolor: "red",
                                width: { xs: '100%', sm: '100%', md: "64%", lg: "64%" }
                            }} spacing={{ xs: 0, sm: 0, md: 2, lg: 2 }} >
                                {/* <VerticalLine /> */}
                                <Typography variant="contactUsTitle"
                                    sx={{ pl: { xs: 0, sm: 0, md: 2, lg: 2 } }}>Get in touch and <br /> start saving time today
                                </Typography>
                            </Stack>

                            {/* <VerticalLine /> */}

                            <Stack sx={{
                                width: { xs: '100%', sm: '100%', md: "30%", lg: "30%" }
                            }} >
                                <Typography
                                    sx={{
                                        fontSize: 16,
                                        lineHeight: 1.6
                                    }}
                                >Our team will take you through the key features and benefits of Atticus, and get to know your current verification needs and pain points.
                                </Typography>
                                <Stack spacing={3} sx={{ pt: 4 }} >
                                    <FormControl>
                                        <Typography sx={{ fontSize: 14 }} >Name</Typography>
                                        <TextField
                                            sx={{ ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input": { height: "6px", bgcolor: "white", borderRadius: "8px" }, mt: '10px' }}
                                            {...getFieldProps("name")}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Typography sx={{ fontSize: 14 }} >Email</Typography>
                                        <TextField
                                            sx={{ ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input": { height: "6px", bgcolor: "white", borderRadius: "8px" }, mt: '10px' }}
                                            {...getFieldProps("email")}
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Typography sx={{ fontSize: 14 }} >Phone</Typography>
                                        <TextField
                                            sx={{ ".css-q1w0rq-MuiInputBase-input-MuiOutlinedInput-input": { height: "6px", bgcolor: "white", borderRadius: "8px" }, mt: '10px' }}
                                            {...getFieldProps("phone")}
                                            error={Boolean(touched.phone && errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Typography sx={{ fontSize: 14 }} >Message</Typography>
                                        <TextField
                                            multiline={true}
                                            sx={{
                                                bgcolor: 'white', borderRadius: "8px", mt: '10px'
                                            }}
                                            rows={4}
                                            {...getFieldProps("message")}
                                        />
                                        {/* <FormHelperText>{errors.message}</FormHelperText> */}
                                    </FormControl>
                                </Stack>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        fontWeight: 400,
                                        borderRadius: 8, letterSpacing: 0.4,
                                        mt: '20px'
                                    }}
                                >
                                    Request more information
                                </Button>
                            </Stack>
                        </Stack >
                    </Container>
                </Box>
            </Form>
        </FormikProvider>
    )
}

const VerticalLine = () => {
    return (
        <Box
            sx={{
                width: "1px", height: 'auto', bgcolor: 'black', mt: "0px",
                display: { xs: "none", sm: 'none', md: "block", lg: "block" },
                bgcolor: "white"
            }}
        ></Box>
    )
}