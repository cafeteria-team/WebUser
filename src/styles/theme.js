const fontSizes = {
  description: "12px",
  detail: "14px",
  body: "16px",
  title: "20px",
};
const fontWeights = {
  normal: 400,
  bold: 600,
};
const lineHeights = {
  normal: 1,
  title: 1.25,
  paragraph: 1.5,
};
const radii = {
  button: "8px",
  rounded: "16px",
};
const space = {
  zero: "0px",
  small: "6px",
  medium: "12px",
  large: "20px",
  xlarge: "26px",
  xxlarge: "50px",
};
const shadow = {
  content:
    "0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)",
  button: "rgb(249 217 189) 0px 8px 16px 0px",
};
const size = {
  mobileS: "400px",
  mobile: "600px",
};

const theme = {
  //   breakpoints: [32, 48, 64],
  space,
  fontSizes,
  fontWeights,
  lineHeights,

  colors: {
    main: "#FF9030",
    mainOpacity: "#FCF1E8",
    blue: "#1A90FF",
    red: "#FF4842",
    text: "#212B36",
    subTitle: "#637381",
    detailIcon: "#E2E6E7",
    description: "#B2B2B2",
    border: "#ECEFF1",
    background: "#F9FAFB",
  },
  shadow,
  radii,
  mobileS: `(max-width:${size.mobileS})`,
  mobile: `(max-width:${size.mobile})`,
};

export default theme;
