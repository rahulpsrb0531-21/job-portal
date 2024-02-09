import { Box, Stack } from "@mui/material";
import CategoryCard from "./categoryCard";
import { companyServiceData } from "../../../utils/basicData";


export default function CategoryServices() {

    return (
        <Stack direction={{ xs: 'column', lg: 'row' }}
            mt={4}
            spacing={4}
            justifyContent={'center'} alignItems={'center'} >
            {
                companyServiceData?.map((data, idx) => (
                    <CategoryCard data={data} />
                ))
            }
        </Stack>
    )
}