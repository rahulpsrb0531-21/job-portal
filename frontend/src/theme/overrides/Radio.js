// ----------------------------------------------------------------------

export default function Button(theme) {
    return {
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: 'black',
                    // '&.MuiTypography-root': {
                    //   }
                },
                // MuiTypography:{
                //     label: {
                //         fontSize: 2,
                //     }
                // },
                colorSecondary: {
                    '&$Mui-checked': {
                        color: 'green',
                    },
                },

            }
        }
    };
}
