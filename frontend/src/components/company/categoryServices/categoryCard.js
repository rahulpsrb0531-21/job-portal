import { Box, Typography } from "@mui/material";

export default function CategoryCard({ data }) {
    return (
        <Box
            // card 
            sx={{
                width: { xs: '90%', lg: 300 },
                boxShadow: "5px 5px 20px black",
                overflow: "hidden",
                position: "relative",
                ":hover": { cursor: "pointer" }
            }}
        >
            <Box
                // img 
                component={'img'}
                src={data?.img}
                sx={{
                    aspectRatio: 3 / 2,
                    width: { xs: "100%", lg: 300 },
                    objectFit: "cover",
                    borderRadius: "4px"
                }}
            />
            <Box
                // intro  
                sx={{
                    width: { xs: "100%", lg: 300 },
                    height: 38,
                    boxSizing: 'border-box',
                    position: "absolute",
                    bottom: '0px',
                    backgroundColor: "rgb(27,27,27, .8)",
                    color: "white",
                    ":hover": {
                        height: 140,
                        bottom: 0,
                        bgcolor: 'black'
                    },
                    transition: "0.5s"
                }}
            >
                <Typography
                    sx={{ fontSize: 18, m: '10px' }}
                >{data?.title}</Typography>
                <Typography
                    sx={{
                        fontSize: 14, m: "10px",
                        ":hover": {
                            opacity: 1,
                            visibility: "visible"
                        }
                    }}
                >{data?.description}</Typography>
            </Box>
        </Box>
    )
}