const FONT_FAMILY_NOTO = "Noto Sans KR";

const typography = {
  title1: {
    fontFamily: FONT_FAMILY_NOTO,
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "24px",
  },

  title2: {
    fontFamily: FONT_FAMILY_NOTO,
    fontWeight: 700,
    fontSize: "22px",
    lineHeight: "24px",
  },

  title3: {
    fontFamily: FONT_FAMILY_NOTO,
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "18px",
  },

  body1: {
    fontFamily: FONT_FAMILY_NOTO,
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "20px",
  },

  body2: {
    fontFamily: FONT_FAMILY_NOTO,
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "14px",
  },

  body2Bold: {
    fontFamily: FONT_FAMILY_NOTO,
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "14px",
  },

  caption: {
    fontFamily: FONT_FAMILY_NOTO,
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "16px",
  },

  small: {
    fontFamily: FONT_FAMILY_NOTO,
    fontWeight: 500,
    fontSize: "10px",
    lineHeight: "10px",
  },
} as const;

export default typography;
