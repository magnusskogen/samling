module.exports = {
    theme: {
      colors: {
        green: "#006a38",
        "pale-green": "#c0d0c8",
        "mid-green": "#e1e8e4",
        "light-green": "#edf1ef",
        beige: "#ffebdf",
        "light-beige": "#fbf1eb",
        white: "#fff",
        black: "#000",
        grey: "#aaa",
        "light-grey": "#ddd",
        transparent: "transparent",
        orange: "#fb894c",
      },
      screens: {
        sm: "500px",
        md: "768px",
        lg: "1280px",
        xl: "1880px",
        mob: [
          {
            min: "0",
            max: "767px",
          },
        ],
      },
      extend: {
        spacing: {
          7: "1.75rem",
          9: "2.25rem",
          11: "2.625rem",
          14: "3.5rem",
          60: "10rem",
        },
        opacity: {
          40: 0.4,
        },
      },
    },
    variants: {},
    plugins: [],
    corePlugins: {
      container: false,
    },
  };