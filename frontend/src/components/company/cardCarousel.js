import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

const CardCarousel = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showButton, setShowButton] = useState(true)

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
    };

    return (
        <Stack sx={{ position: 'relative', width: '94%', overflow: 'hidden', ml: 1 }}>
            <motion.div
                style={{
                    display: 'flex', transition: 'transform 0.3s',
                    transform: `translateX(-${currentIndex * 100}%)`
                }}
            >
                {cards.map((card, index) => (
                    <Card key={index}
                        sx={{ flex: '0 0 100%', borderRadius: "4px", }}
                    >
                        <Box
                            // card 
                            sx={{
                                width: { xs: '100%', lg: 300 },
                                boxShadow: "5px 5px 20px black",
                                overflow: "hidden",
                                position: "relative",
                                ":hover": { cursor: "pointer" },
                            }}
                        >
                            <Box
                                // img 
                                component={'img'}
                                src={card?.img}
                                sx={{
                                    aspectRatio: 3 / 2, width: { xs: "100%", lg: 300 }, objectFit: "contain", borderRadius: "4px"
                                }}
                                onClick={() => setShowButton(true)}
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
                                onClick={() => setShowButton(!showButton)}
                            >
                                <Typography
                                    sx={{ fontSize: 18, m: '10px' }}
                                >{card?.title}</Typography>
                                <Typography
                                    sx={{
                                        fontSize: 14, m: "10px",
                                        ":hover": {
                                            opacity: 1,
                                            visibility: "visible"
                                        }
                                    }}
                                >{card?.description}</Typography>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </motion.div>
            {
                showButton === true && (
                    <>
                        <Button onClick={prevCard}
                            sx={{
                                position: 'absolute', top: '50%', left: '0px', transform: 'translateY(-50%)'
                            }}
                        >
                            Prev
                        </Button>
                        <Button onClick={nextCard} sx={{ position: 'absolute', top: '50%', right: '0px', transform: 'translateY(-50%)' }}>
                            Next
                        </Button>
                    </>
                )
            }
        </Stack>
    );
};

export default CardCarousel;


{/* <Card key={index}
                        // style={{ flex: '0 0 100%', maxWidth: '100%', padding: '0 10px',}}
                        sx={{ flex: '0 0 100%', bgcolor: 'red', borderRadius: "4px" }}
                    >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {card.title}
                            </Typography>
                            <Typography color="textSecondary">
                                {card.description}
                            </Typography>
                            <img src={card.image} alt={card.title} style={{ maxWidth: '100%' }} />
                        </CardContent>
                    </Card> */}