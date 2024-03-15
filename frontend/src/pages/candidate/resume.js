import { Stack, Typography } from "@mui/material";
import Axios from "axios"
import { useDropzone } from 'react-dropzone';
import { server } from '../../utils/server';
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import candidateServices from "../../services/candidateServices";



export default function Resume() {
    const [upload, setUpload] = useState(null)
    const [candidate, setCandidate] = useState({})
    console.log('candidate', candidate)
    const [updatePage, setUpdatePage] = useState(false)
    const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]
    const { user } = useSelector((state) => state.auth)


    const onDrop = useCallback((acceptedFiles) => {
        const docFile = acceptedFiles[0]
        // Display resume file name
        setUpload(docFile.name)
        // Upload the resume file to the server using axios or your preferred HTTP library
        const formData = new FormData();
        formData.append('document', docFile);
        server.post(`upload/candidate/document/${user?._id}/${'resume'}`, formData)
            .then(res => {
                // setUpload(res?.data?.filePath)
                // getCandidateById()
            })
            .catch(err => {
                return null
            })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: '.pdf, .doc, .docx', // Accept only specific file types
        maxFiles: 1,
    })

    const handleDownload = async () => {
        try {
            const id = user?._id
            const response = await server.get(`api/candidate/upload/resume/${id}/${'resume'}`, { responseType: 'blob' })
            // console.log("response", response)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${user?.candidateName}.pdf`)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    }

    const deleteCandidateResume = async () => {
        const data = { candidateId: user?._id, docName: 'resume' }
        // console.log(id)
        const res = await candidateServices.deleteResume(data)
        if (res && res.success) {
            getCandidateById()
            // setUpdatePage(!updatePage)
            setUpload(null)
        } else {
            console.log(res)
            // enqueueSnackbar(res?.message, {
            //     variant: "error",
            //     anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            // })
        }
    }

    async function getCandidateById(data) {
        const id = user?._id
        const res = await candidateServices.getCandidateById(id)
        if (res && res.success) {
            setCandidate(res?.candidate)
        } else {
            console.log(res?.data)
            // enqueueSnackbar('Something went wrong', {
            //     variant: "error",
            //     anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
            // })
        }
    }

    useEffect(() => {
        getCandidateById()
    }, [])

    return (
        <Stack direction={{ xs: "column", lg: 'row' }} sx={{ pt: 4 }} spacing={4} >
            <Stack sx={{ width: { xs: "100%", sm: "100%", md: "30%", lg: "30%" } }} spacing={0.1} >
                <Typography
                    sx={{ fontSize: 22, fontWeight: 600 }}
                >Upload your recent resume or CV</Typography>
                <Typography variant="profilePageSubText" sx={{ pb: 0.8 }} >Upload your most up-to-date resume</Typography>
            </Stack>
            <Stack
                sx={{
                    width: { xs: "94%", sm: "94%", sm: "70%", lg: "70%" },
                    // bgcolor: "red"
                }}
                spacing={1} >
                <Typography
                    sx={{ fontSize: 14, fontWeight: 500 }}
                // onClick={() => handleDownload()}
                >
                    <span style={{ color: "#143fcd", cursor: "pointer" }}
                        onClick={() => handleDownload()}
                    >
                        View your resume
                    </span> or upload a new one below</Typography>

                <div {...getRootProps()} style={dropzoneStyles}>
                    <input {...getInputProps()} />
                    {(upload || candidate?.resume !== null) ? (
                        <Typography variant="body1">
                            {upload || 'resume uploaded'}</Typography>
                    ) : isDragActive ? (
                        <Typography variant="body1">Drop the files here...</Typography>
                    ) : (
                        <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: 50 }}  >
                            <Typography sx={{ fontSize: 16 }} >Upload file resume</Typography>
                        </Stack>
                    )}
                </div>
                <Typography
                    onClick={() => deleteCandidateResume()}
                    sx={{
                        fontSize: 14, textAlign: 'right', ":hover": {
                            cursor: "pointer",
                            textDecoration: "underline"
                        }
                    }}
                >Remove your resume</Typography>
            </Stack>
        </Stack>
    )
}


























// const UploadPdf = ({ setFieldValue, uploadName, title, docValue, getCandidateById }) => {
//     const [upload, setUpload] = useState(null)
//     const [updatePage, setUpdatePage] = useState(false)
//     const SUPPORTED_FORMATS_PDF = ['application/pdf', 'application/octet-stream', "image/jpeg", "image/jpg"]
//     const { user } = useSelector((state) => state.auth)


//     const onDrop = useCallback((acceptedFiles) => {
//         const docFile = acceptedFiles[0]
//         // Display resume file name
//         setUpload(docFile.name)
//         // Upload the resume file to the server using axios or your preferred HTTP library
//         const formData = new FormData();
//         formData.append('document', docFile);
//         server.post(`upload/candidate/document/${user?._id}/${uploadName}`, formData)
//             .then(res => {
//                 setFieldValue(uploadName, res?.data?.filePath)
//                 getCandidateById()
//             })
//             .catch(err => {
//                 return null
//             })
//     }, [])

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         accept: '.pdf, .doc, .docx', // Accept only specific file types
//         maxFiles: 1,
//     })

//     const handleDownload = async () => {
//         try {
//             const id = user?._id
//             const response = await server.get(`api/candidate/upload/resume/${id}/${uploadName}`, { responseType: 'blob' })
//             // console.log("response", response)
//             const url = window.URL.createObjectURL(new Blob([response.data]))
//             const link = document.createElement('a')
//             link.href = url
//             link.setAttribute('download', `${user?.candidateName} ${title}.pdf`)
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         } catch (error) {
//             console.error('Error downloading resume:', error);
//         }
//     }

//     const deleteCandidateResume = async () => {
//         const data = { candidateId: user?._id, docName: uploadName }
//         // console.log(id)
//         const res = await candidateServices.deleteResume(data)
//         if (res && res.success) {
//             getCandidateById()
//             // setUpdatePage(!updatePage)
//             setUpload(null)
//         } else {
//             console.log(res)
//             // enqueueSnackbar(res?.message, {
//             //     variant: "error",
//             //     anchorOrigin: { horizontal: "right", vertical: "top" }, autoHideDuration: 1000
//             // })
//         }
//     }
//     return (
//         <Stack direction={{ lg: 'row' }} spacing={2} alignItems={{ lg: 'center' }}
//         >
//             <Box sx={{ width: 196, pb: 0.6 }} >
//                 <Typography sx={{
//                     fontSize: 14,
//                     color: "rgb(5, 12, 38)",
//                     fontWeight: 500, lineHeight: '16px'
//                 }} >
//                     {title}
//                 </Typography>
//             </Box>
//             {
//                 (docValue?.length === 0) ? (
//                     <Box sx={{ width: { xs: '100%', lg: '46%' } }}>
//                         <div {...getRootProps()} style={dropzoneStyles}>
//                             <input {...getInputProps()} />
//                             {upload ? (
//                                 <Typography variant="body1">{upload}</Typography>
//                             ) : isDragActive ? (
//                                 <Typography variant="body1">Drop the files here...</Typography>
//                             ) : (
//                                 <Stack alignItems={'center'} justifyContent={'center'} sx={{ height: 50 }}  >
//                                     <Typography sx={{ fontSize: 16 }} >Upload file
//                                         {/* {title} */}
//                                     </Typography>
//                                 </Stack>
//                             )}
//                         </div>
//                         {/* <FormHelperText>{textHelper}</FormHelperText> */}
//                     </Box>
//                 ) : (
//                     <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{
//                         border: '0.4px solid #ccc',
//                         width: { xs: '100%', lg: "46%" },
//                         height: 60,
//                         px: 2,
//                         py: 5.4,
//                         borderRadius: '4px'
//                     }} >
//                         <Stack direction={'row'} alignItems={'center'} spacing={2} onClick={handleDownload}>
//                             <Iconify icon={"ph:file-pdf-bold"} sx={{ width: { xs: 22, lg: 42 }, color: "blue" }} />
//                             <Typography
//                                 sx={{ fontSize: { xs: 14, lg: 16 }, fontWeight: 700, cursor: "pointer" }}
//                             // onClick={handleDownload}
//                             >Download {title}</Typography>
//                         </Stack>
//                         <Typography sx={{ fontSize: 16, fontWeight: 700, cursor: "pointer", px: 1 }}
//                             onClick={() => deleteCandidateResume()}
//                         >X</Typography>
//                     </Stack>
//                 )
//             }
//         </Stack>
//     )
// }

const dropzoneStyles = {
    border: '1px dashed #cccccc',
    borderRadius: '4px',
    padding: '24px',
    textAlign: 'center',
    cursor: 'pointer',
}
