import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function OverView() {
    const { state } = useLocation();
    const { id } = state
    console.log(state)
    // const { user } = useSelector((user) => user.auth)
    // console.log('user>>>', user)
    return (
        <Stack>
            <Stack>
                <Typography variant="companyTitle" >BetaMind careers </Typography>
                <Typography variant="companyTitle" >Reinventing the company-customer relationship</Typography>
                <Typography variant="companySubText" >We are Sales & Marketing tech SaaS startup and our mission is "Reinventing the company-customer relationship".We are building new products which solves issues of B2B marketing by utilizing video contents and have released alpha version of product on Jan 2022. As of now we are focusing on Japanese market but going to expand our business in Asia in next few years.</Typography>
            </Stack>
            <Stack>
                <Typography>Jobs</Typography>
                {/* < */}
            </Stack>
        </Stack>
    )
}