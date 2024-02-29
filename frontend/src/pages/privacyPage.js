import { Box, Container, Stack, Typography } from "@mui/material";

export default function PrivacyPage() {
    return (
        <Box sx={{ pb: 4 }}>
            <Stack sx={{ position: 'relative' }} >
                <Box
                    component={'img'}
                    src="/images/privacy-policy.jpg"
                    sx={{
                        width: '100%',
                        height: { xs: 200, sm: 200, md: 320, lg: 320 },
                        objectFit: "cover",
                        p: { xs: 0, sm: 0, md: 1, lg: 1 },
                        borderRadius: { xs: 0, sm: 0, md: 2, lg: 2 }

                    }}
                />
                <Typography sx={{
                    fontSize: { xs: 22, sm: 22, md: 42, lg: 42 },
                    color: "white",
                    fontWeight: 600,
                    position: 'absolute',
                    top: '60%',
                    left: 0,
                    right: 0,
                    textAlign: 'center'
                }} >We care about your privacy</Typography>
            </Stack>
            <Container maxWidth='md' sx={{ pt: 2 }} >
                <Stack spacing={1}>
                    <Typography variant="privacyPolicyText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis tortor a libero bibendum, in blandit odio ultricies. Proin vestibulum elementum arcu, vitae hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh, mattis in dignissim non, efficitur a risus. Pellentesque et elementum nisl, rhoncus efficitur ipsum. Sed iaculis lacus gravida</Typography>
                    <Typography variant="privacyPolicyText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis tortor a libero bibendum, in blandit odio ultricies. Proin vestibulum elementum arcu, vitae hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh, mattis in dignissim non, efficitur a risus. Pellentesque et elementum nisl, rhoncus efficitur ipsum. Sed iaculis lacus gravida odio mattis feugiat. Vestibulum in justo et mauris laoreet tincidunt a ac libero.</Typography>
                </Stack>
                <Box sx={{ pt: 2.8 }} >
                    <Typography variant="privacyPolicyTitle" sx={{ pb: 1 }} >What information we do collect?</Typography>
                    <Stack spacing={1} >
                        <Typography variant="privacyPolicyText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis tortor a libero bibendum, in blandit odio ultricies. Proin vestibulum elementum arcu, vitae hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh,nisl, rhoncus efficitur ipsum. Sed iaculis lacus gravida</Typography>
                        <Typography variant="privacyPolicyText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis tortor a libero bibendum, in blandit odio ultricies. Proin vestibulum elementum arcu, vitae hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh, mattis in dignissim non, efficitur a risus. Pellentesque et elementum nisl,hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh, mattis in dignissim non, efficitur a risus. Pellentesque et elementum nisl, rhoncus efficitur ipsum. Sed iaculis lacus gravida</Typography>
                        <Typography variant="privacyPolicyText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis tortor a libero bibendum, in blandit odio ultricies. Proin vestibulum elementum arcu, vitae hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh, mattis rhoncus efficitur ipsum. Sed iaculis lacus gravida</Typography>
                    </Stack>
                </Box>
                <Box sx={{ pt: 2.8 }}>
                    <Typography variant="privacyPolicyTitle" sx={{ pb: 1 }}>How do we use your information?</Typography>
                    <Stack spacing={1}>
                        <Typography variant="privacyPolicyText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis tortor a libero bibendum, in blandit odio ultricies. Proin vestibulum elementum arcu, vitae hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh,nisl, rhoncus efficitur ipsum. Sed iaculis lacus gravida</Typography>
                        <Typography variant="privacyPolicyText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis tortor a libero bibendum, in blandit odio ultricies. Proin vestibulum elementum arcu, vitae hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh, mattis in dignissim non, efficitur a risus. Pellentesque et elementum nisl,hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh, mattis in dignissim non, efficitur a risus. Pellentesque et elementum nisl, rhoncus efficitur ipsum. Sed iaculis lacus gravida</Typography>
                        <Typography variant="privacyPolicyText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mattis tortor a libero bibendum, in blandit odio ultricies. Proin vestibulum elementum arcu, vitae hendrerit lectus finibus at. Aliquam id consequat risus. Ut mi nibh, mattis rhoncus efficitur ipsum. Sed iaculis lacus gravida</Typography>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}