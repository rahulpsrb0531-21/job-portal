// ----------------------------------------------------------------------

export default function CssBaseline() {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          // userSelect: "none",

        },
        html: {
          width: '100%',
          padding: '0px',

        },
        body: {
          width: '100%',
          "-ms-overflow-style": "none",
          // scrollbarWidth: "none",
          // "&::-webkit-scrollbar": {
          //   display: "none",
          // },
          // "&::-moz-scrollbar": {
          //   display: "none",
          // },
          // body: {
          background: 'linear-gradient(45deg, #FFFFFF 90%, #FFFFFF 90%)',
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          //  }
        },
        '@font-face': {
          fontFamily: "bahnschrift",
          src: "url('/assets/font/Bahnschrift-Font-Family/BAHNSCHRIFT.TTF')"
        },
        '#root': {
          width: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        // img: {
        //   display: 'block',
        //   maxWidth: '100%',
        // },

      },
    },
  };
}
