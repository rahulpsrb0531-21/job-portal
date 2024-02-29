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
            offset: 30
        })
    }, [])
    return (
        <Stack sx={{ mt: 8 }} >
            <Typography variant="sactionTitle" >Our services</Typography>
            <Grid container rowGap={2} columnGap={2} justifyContent={'center'} sx={{ pt: 2 }}>
                {
                    companyOurSerivceData?.map((data, idx) => (
                        <Grid item xs={11.4} sm={5.6} md={3.8}
                            sx={{
                                height: { xs: 260, sm: 340, md: 360, lg: 380 },
                                borderRadius: "2px", p: 2,
                                border: "1px solid rgb(238, 238, 238)",
                                bgcolor: '#e7f0e7',
                                // bgcolor: 'red',
                                boxShadow: "0px 2px 6px #0000000A",
                                position: 'relative'
                            }}
                            data-aos="fade-up"
                        >
                            <Stack spacing={2} >
                                <Iconify icon={data?.icon} sx={{ width: { xs: 82 }, height: 42 }} />
                                <Typography variant="serviceCardTitle" >{data?.title}</Typography>
                            </Stack>
                            <Typography variant="serviceCardSubText"
                                sx={{ position: 'absolute', bottom: 10 }}
                            >{data?.description}</Typography>
                        </Grid>
                    ))
                }
            </Grid>
            {/* </Stack> */}
        </Stack>
    )
}