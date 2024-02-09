import { Box, Stack, Typography } from "@mui/material";
import { companyOurSerivceData } from "../../utils/basicData";
import Iconify from "../Iconify";


export default function OurServices() {
    return (
        <Stack sx={{ mt: 8 }} >
            <Typography sx={{ fontSize: 24, fontWeight: 900, textTransform: "uppercase", textAlign: "center" }} >Our services</Typography>
            <Stack rowGap={2} columnGap={2} mx={1} my={2}
                flexWrap={"wrap"}
                justifyContent={'center'}
                direction={{ xs: 'column', lg: 'row' }}
            >
                {
                    companyOurSerivceData?.map((data, idx) => (
                        <Stack direction={'row'} spacing={1}
                            sx={{ width: { lg: '30%' }, borderRadius: "4px", p: 2, bgcolor: '#f7f7f7' }}
                        >
                            <Iconify icon={data?.icon} sx={{ width: { xs: 82 }, height: 32 }} />
                            <Stack spacing={2}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600 }} >{data?.title}</Typography>
                                <Typography sx={{ fontSize: 14 }}>{data?.description}</Typography>
                            </Stack>
                        </Stack>
                    ))
                }
            </Stack>
        </Stack>
    )
}