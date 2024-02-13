// ParallaxMousemove.js
import React, { useState, useEffect } from 'react';
import './ParallaxMousemove.css'; // Import your CSS file for styling
import { Box, Stack, Typography } from '@mui/material';

const textElements = [
    { id: 1, text: 'Reactjs', top: '10%', left: '30%' },
    { id: 2, text: 'Nodejs', top: '50%', left: '70%' },
    { id: 3, text: 'expressjs', top: '20%', left: '50%' },
    { id: 4, text: 'redux', top: '15%', left: '10%' },
    { id: 5, text: 'devops', top: '30%', left: '10%' },
    { id: 6, text: 'software', top: '40%', left: '70%' },
    { id: 6, text: 'Typescript', top: '30%', left: '40%' },
    { id: 6, text: 'Backend', top: '20%', left: '70%' },
    { id: 6, text: 'Frontend', top: '39%', left: '50%' },
    { id: 6, text: 'API', top: '30%', left: '80%' },
    { id: 3, text: 'expressjs', top: '24%', left: '31%' },
    { id: 3, text: 'expressjs', top: '50%', left: '45%' },
    { id: 3, text: 'expressjs', top: '60%', left: '50%' },
    { id: 3, text: 'expressjs', top: '70%', left: '20%' },
    { id: 6, text: 'API', top: '20%', left: '10%' },
    { id: 6, text: 'API', top: '10%', left: '70%' },
    { id: 6, text: 'Typescript', top: '20%', left: '40%' },
    { id: 6, text: 'Typescript', top: '40%', left: '4%' },
    { id: 6, text: 'Typescript', top: '80%', left: '70%' },
    { id: 6, text: 'Frontend', top: '80%', left: '90%' },
    { id: 6, text: 'Frontend', top: '70%', left: '50%' },
    { id: 6, text: 'Frontend', top: '20%', left: '58%' },
    { id: 6, text: 'Frontend', top: '30%', left: '60%' },
];

const ParallaxMousemove = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <Box sx={{
            width: '100%',
            // bgcolor: "red",
            height: "100%"
        }} >
            <div className="parallax-container">
                <Stack alignItems={'center'} justifyContent={'center'}
                    sx={{
                        backgroundImage: `url(/images/blur-background.png)`,
                        // backgroundImage: 'linear-gradient(#fff,#fff 0%,rgba(255,255,255,0))',
                        backgroundSize: "cover",
                        // zIndex: 19999,
                    }}
                >
                    <Typography
                        sx={{
                            border: "2px dashed black",
                            borderRadius: '1vw',
                            fontSize: { xs: 22, lg: 52 }, fontWeight: 600,
                            textAlign: 'center',
                            width: '44%',
                            bgcolor: 'white',
                            zIndex: 19999,
                            mt: 10,
                        }}
                    >Welcome to DKRIN</Typography>
                </Stack>
                {textElements.map((element) => (
                    <div
                        key={element.id}
                        className="parallax-text"
                        style={{
                            top: element.top,
                            left: element.left,
                            transform:
                                `translate(-${mousePosition.x / (20 * element.id)}px, -${mousePosition.y / (20 * element.id)}px)`,

                        }}
                    >
                        {element.text}
                    </div>
                ))}
            </div>
        </Box>
    );
};

export default ParallaxMousemove;
