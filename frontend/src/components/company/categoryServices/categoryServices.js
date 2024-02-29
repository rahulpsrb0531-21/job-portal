import { useEffect } from "react"
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material"
import CategoryCard from "./categoryCard"
import { companyServiceData } from "../../../utils/basicData"
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function CategoryServices() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            offset: 30
        })
    }, [])

    return (
        <Grid container rowGap={3} columnGap={{ xs: 1, sm: 1, md: 2, lg: 3 }} pl={{ xs: 0.8, lg: 2 }} sx={{ pt: 12 }} >
            {
                companyServiceData?.map((data, idx) => (
                    <Grid item xs={11.7} sm={5.8} md={3.8} lg={2.8} data-aos="fade-up" >
                        <Card sx={{ width: '100%', borderRadius: '2px' }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    sx={{ aspectRatio: 3 / 2 }}
                                    height={{ xs: 200, lg: 280 }}
                                    image={data?.img}
                                    alt={data?.title}
                                    loading="lazy"
                                />
                                <CardContent sx={{ p: 1, py: 4 }} >
                                    <Typography gutterBottom variant="h5" component="div">
                                        {data?.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {data?.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}