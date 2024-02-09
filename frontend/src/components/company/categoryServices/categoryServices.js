import { Box, Stack } from "@mui/material";
import CategoryCard from "./categoryCard";
import { companyServiceData } from "../../../utils/basicData";


export default function CategoryServices() {
    // const data = [
    //     {
    //         img: "../images/it.png",
    //         title: "IT Development & Consultancy",
    //         description: "IT consultants are great communicators and have excellent organisational skills as well as sound knowledge and understanding of IT systems."
    //     },
    //     {
    //         img: "../images/management.png",
    //         title: "Management Consultancy",
    //         description: "Management consultants help businesses improve their performance and grow by solving problems and finding new and better ways of doing things."
    //     },
    //     {
    //         img: "../images/education.png",
    //         title: "Education Consultancy & Training",
    //         description: "Education is the process of facilitating learning, or the acquisition of knowledge, skills, values, beliefs, and habits."
    //     },
    //     {
    //         img: "../images/jobs.png",
    //         title: "Jobs",
    //         description: "Connect with 20000+ employers. Apply to Millions of job opportunities across top companies, industries & locations on India's No.1 job site. Apply online. Post CV today."
    //     },
    // ]
    return (
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}
            justifyContent={'center'} alignItems={'center'} >
            {
                companyServiceData?.map((data, idx) => (
                    <CategoryCard data={data} />
                ))
            }
        </Stack>
    )
}