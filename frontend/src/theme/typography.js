import { fontFamily } from '@mui/system';

// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ xs, sm, md, lg }) {
  return {
    '@media (min-width:0px)': {
      fontSize: pxToRem(xs),
    },
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = 'Roboto'

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(28),
  },
  h4: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    color: "#B0B0B0",
    fontWeight: 300,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(18),
  },
  body2: {
    lineHeight: 1.5,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize'
  },
  logo: {
    fontWeight: 900,
    fontSize: pxToRem(30),
    ...responsiveFontSizes({ xs: 14, sm: 18, md: 20, lg: 30 }),
  },
  // logoContent: {
  //   fontWeight: 900,
  //   fontSize: pxToRem(20),
  //   ...responsiveFontSizes({ xs: 12, sm: 14, md: 18, lg: 20 }),
  // },
  heroText: {
    color: "#ffff",
    opacity: 0.8,
    fontWeight: 400,
    letterSpacing: 2,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 10, sm: 12, md: 14, lg: 16 }),
  },
  heroText2: {
    color: "#ffff", opacity: 0.8,
    fontWeight: 600,
    letterSpacing: 2,
    fontSize: pxToRem(30),
    textTransform: "uppercase",
    ...responsiveFontSizes({ xs: 10, sm: 12, md: 14, lg: 50 }),
  },
  profilePageTitle: {
    color: "rgb(5, 12, 38)",
    fontWeight: 500,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 14, sm: 14, md: 14, lg: 14 }),
  },
  profilePageSubText: {
    color: "rgb(113, 117, 132)",
    // letterSpacing: 2,
    // lineHeight: "10px",
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 14, lg: 14 }),
  },
  companyTitle: {
    color: "rgb(5, 12, 38)",
    fontWeight: 500,
    lineHeight: "30px",
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 24, sm: 24, md: 24, lg: 24 }),
  },
  companySubText: {
    color: "rgb(97, 97, 97)",
    fontWeight: 400,
    lineHeight: "20px",
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 14, sm: 14, md: 16, lg: 16 }),
  }

};

export default typography;
