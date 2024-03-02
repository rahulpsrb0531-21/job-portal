import { useEffect } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { companyOurSerivceData } from "../../utils/basicData";
import Iconify from "../Iconify";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function OurServices() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            offset: 30,

        })
    }, [])
    return (
        <Stack sx={{ mt: 8 }} >
            <Typography variant="sactionTitle"
                sx={{
                    textAlign: "left",
                    fontWeight: 200,
                    pl: { xs: 0, sm: 0, md: 1.6, lg: 1.6 }
                }} >Our services</Typography>
            <Grid container rowGap={2} columnGap={2} justifyContent={'center'} sx={{ pt: 2 }}>
                {
                    companyOurSerivceData?.map((data, idx) => (
                        <Grid item xs={11.4} sm={5.6} md={3.8} lg={3.8}
                            data-aos="fade-up">
                            <Stack sx={{
                                // width: "100%",
                                height: { xs: 340, sm: 340, md: 360, lg: 400 },
                                borderRadius: "2px",
                                p: 3,
                                // border: "1px solid rgb(238, 238, 238)",
                                bgcolor: '#e7f0e7',
                                boxShadow: "0px 2px 6px #0000000A",
                                position: 'relative'
                            }}
                            // spacing={4}
                            >
                                <Stack spacing={2} >
                                    <Stack alignItems={'center'} justifyContent={'center'}
                                        sx={{
                                            // border: "1px solid black",
                                            width: 74,
                                            p: 1,
                                            py: 2,
                                            borderRadius: 8,
                                            bgcolor: "white"
                                        }} >
                                        <Iconify icon={data?.icon}
                                            sx={{ width: { xs: 82 }, height: 38 }}
                                        />
                                    </Stack>
                                    <Typography variant="serviceCardTitle" >{data?.title}</Typography>
                                </Stack>
                                <Typography variant="serviceCardSubText"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 16, pr: 2,
                                        // lineHeight: "20px"
                                    }}
                                >{data?.description}</Typography>
                            </Stack>
                        </Grid>
                    ))
                }
            </Grid>
            {/* </Stack> */}
        </Stack>
    )
}