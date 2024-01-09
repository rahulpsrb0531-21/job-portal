// ----------------------------------------------------------------------

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14,
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled }
          }
        },
        input: {
          borderBottomColor: 'black',
          // backgroundColor: "#FFF",
          // borderRadius: 8,
          // padding: "10px 20px !important",
          '&::placeholder': {
            opacity: 1,
            // color: "blue",
            fontSize: '12px',
            fontWeight: 400,
          },
          fontSize: 14,
          fontWeight: 400
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          borderBottomColor: 'black',
          '&:before': {
            borderBottomColor: 'black'
            // borderBottomColor: theme.palette.grey[500_56]
          },
          '&:after': {
            borderBottomColor: 'black',
            // borderBottomColor: theme.palette.grey[500_56]
          },
          // '&:hover': {
          // borderBottomColor: theme.palette.grey[500_16]
          // }
        }
      }
    },
    // MuiFilledInput: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: theme.palette.grey[500_12],
    //       '&:hover': {
    //         backgroundColor: theme.palette.grey[500_16]
    //       },
    //       '&.Mui-focused': {
    //         backgroundColor: theme.palette.action.focus
    //       },
    //       '&.Mui-disabled': {
    //         backgroundColor: theme.palette.action.disabledBackground
    //       }
    //     },
    //     // underline: {
    //     //   '&:before': {
    //     //     borderBottomColor: theme.palette.grey[500_56]
    //     //   }
    //     // }
    //   }
    // },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // backgroundColor: "#FCFBFA",
          borderRadius: 8,
          // color: "",
          boxShadow: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E1E1E1",
            borderWidth: 1,
          },
          '&.Mui-focused': {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#8F8F8F",
              borderWidth: 1,

            }
          },
          '&:hover': {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#8F8F8F",
              borderWidth: 1,

            }
          },
        }
      }
    }
  };
}
