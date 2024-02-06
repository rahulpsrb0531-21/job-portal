import { Card, Container, Typography } from "@mui/material";
import * as Yup from "yup"
import { useFormik, Form, FormikProvider, FieldArray, Field, getIn } from "formik"
import { useSnackbar } from "notistack";


export default function CreateCandidate() {
    const { enqueueSnackbar } = useSnackbar()

    const candidateProfileSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        location: Yup.string().required("location is required"),
        primaryRole: Yup.string().required("Primary Role is required"),
        experience: Yup.string().required("Experience is required"),
        bio: Yup.string(),
        websiteLink: Yup.string(),
        twitterLink: Yup.string(),
        linkedinLink: Yup.string(),
        gitHubLink: Yup.string(),
        // work: Yup.array().of(
        //     Yup.object().shape({
        //         company: Yup.string().required("Company is required"),
        //         title: Yup.string().required("Title is required"),
        //         startDate: Yup.date().required("Start Date is required"),
        //         endDate: Yup.date().required("End Date is required"),
        //         description: Yup.string()
        //     })),
        // education: Yup.array().of(
        //     Yup.object().shape({
        //         education: Yup.string().required("Education is required"),
        //         // graduation: dayjs(Date.now()),
        //         graduation: Yup.date().required("Graduation is required"),
        //         degreeAndMajor: Yup.string().required("Degree And Major is required"),
        //         // degree: Yup.string().required("Degree is required"),
        //         gpa: Yup.string(),
        //         gpaMax: Yup.string()
        //     })),
        skills: Yup.array(),
        newSkill: Yup.string(),
        achivements: Yup.string().max(1000, 'Upto 1000 characters')
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            location: "",
            primaryRole: "",
            experience: "",
            bio: "",
            websiteLink: "",
            twitterLink: "",
            linkedinLink: "",
            gitHubLink: "",
            work: [],
            education: [],
            skills: [],
            newSkill: "",
            achivements: "",
        },
        validationSchema: candidateProfileSchema,
        onSubmit: (v) => {
            const data = {
                candidateName: v?.name,
                location: v?.location,
                primaryRole: v?.primaryRole,
                yearsOfExperience: v?.experience,
                bio: v?.bio,
                website: v?.websiteLink,
                linkedin: v?.linkedinLink,
                twitter: v?.twitterLink,
                gitHub: v?.gitHubLink,
                // workExperience: workData,
                workExperience: v?.work,
                // eduction: educationData,
                eduction: v?.education,
                skills: v?.skills,
                achivements: v?.achivements,
                role: "CONDIDATE"
            }
            // console.log(data)
            // updateCandidate(data)
        }
    })

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

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Container sx={{
                    bgcolor: 'rgb(255, 255, 255)', width: '100%',
                    borderRadius: 0.4, p: 1,
                    border: '1px solid #e0e0e0', borderRadius: "8px"
                }}>
                    <Card>
                        <Typography>Candidate</Typography>
                    </Card>
                </Container>
            </Form>
        </FormikProvider>
    )
}