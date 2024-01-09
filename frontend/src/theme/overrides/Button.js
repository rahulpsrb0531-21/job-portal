// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 18,
          fontWeight: 100,
          height: "fit-content",
          color: 'white',
          padding: "12px 24px",
          borderRadius: 0,
          lineHeight: 1.2,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          },

        },
        sizeLarge: {
          height: 48
        },
        contained: {
          borderRadius: 4,
          fontWeight: 400,
          backgroundColor: "#f73378",
          // borderColor: "",
          '&:hover': {
            // borderColor: "black",
            backgroundColor: "#f06292",
          }
        },
        outlined: {
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 500,
          borderColor: "#b2dfdb",
          color: "black",
          '&:hover': {
            borderColor: "black",
            backgroundColor: "#ffffff",
          }
        },
        blackButton: {
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 500,
          backgroundColor: "black",
          // borderColor: "",
          '&:hover': {
            // borderColor: "black",
            backgroundColor: "rgb(15, 111, 255)",
          }
        },
        redButton: {
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 500,
          backgroundColor: "black",
          // borderColor: "",
          '&:hover': {
            // borderColor: "black",
            backgroundColor: "#E31E25",
          }
        },
        containedInherit: {
          color: theme.palette.grey[800],

          // boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400]
          }
        },
        containedPrimary: {
          // boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          // boxShadow: theme.customShadows.secondary
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}
