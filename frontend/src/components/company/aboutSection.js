import { Box, Stack, Typography } from "@mui/material";


export default function AboutSection() {

    const aboutSentance = [
        {
            title: "1",
            value: 'DKRIN Limited is committed to supporting our cherished clients whom we refer to as partners in all their individual endeavours or projects. Whether you aim to set up a business in the UK, to build your IT suite, work in the UK or study in the UK, then your best source for maximum support is DKRIN.'
        },
        {
            title: "2",
            value: "DKRIN Limited was formed to offer the best of bespoke and customized support services to all our clients such as local and international business in getting the best of IT Development & Consultancy, Management Consultancy and Educational consultancy services."
        },
        {
            title: "3",
            value: "We also aim to support our clients who endeavour to have access to the best of logistics from the UK to their factories and manufacturing plants overseas."
        },
        {
            title: "4",
            value: "We have supported many individuals to successfully set up and strategically manage their businesses in the UK and are doing profitably. We have also supported numerous students from the UK and all over the world to study successfully in accredited colleges and universities all over the world."
        },
        {
            title: "5",
            value: "We support our clients using with complete managed IT services and smart technology solutions to local businesses with a global approach."
        },
        {
            title: "6",
            value: "DKRIN offers a platform where both local and international career aspirants can look for their desired  jobs available in the UK and apply accordingly. The UK always looks to fill the gap of skilled workforce within the industry."
        },
        {
            title: "7",
            value: "We at DKRIN have a dynamic and dedicated team who are always on hand to give you the best of support to make your goals become reality."
        }
    ]

    return (
        <Stack spacing={4} sx={{ my: 10 }} >
            <Typography sx={{ fontSize: 32, fontWeight: 900, textAlign: "center" }} >ABOUT US</Typography>
            <Stack direction={'row'} justifyContent={'center'} spacing={4}
                // sx={{ mx: 10 }}
                // justifyContent={'space-between'}
                alignItems={"start"}
            >
                <Box
                    component={'img'}
                    src="./images/about-img.jpg"
                    sx={{ width: { xs: 100, lg: 400 }, borderRadius: "2px", objectFit: "contain" }}
                />
                <Stack sx={{ width: '60%' }} spacing={2} >
                    <Typography sx={{ fontSize: 22, fontWeight: 600 }} >At DKRIN our values is an acronym of our name and it means the following</Typography>
                    {
                        aboutSentance?.map((data, idx) => (
                            <Typography key={idx}
                                sx={{ fontSize: 16 }}
                            >{data?.value}</Typography>
                        ))
                    }
                </Stack>
            </Stack>
        </Stack>
    )
}