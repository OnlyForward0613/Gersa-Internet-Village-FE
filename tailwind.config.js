module.exports = {
  content: ["./pages/**/*.{html,js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pwprimary: {
          100: "#eeeae6",
          200: "#ab9484",
          300: "#562808",
        },
        pwsecondary: {
          100: "#fbd4b9",
          200: "#f59b5c",
          300: "#f07016",
        },
        pwaccent: {
          100: "#e6f4f6",
          200: "#b3dfe3",
          300: "#80cad1",
          400: "#4db5bf",
          500: "#0095a3",
          600: "#006872",
        },
        pwgray: {
          100: "#ffffff",
          200: "#f8f9fa",
          300: "#dde2e5",
          400: "#acb5bd",
          500: "#495057",
          600: "#212429",
        },
        pwsuccess: {
          100: "#98f3c9",
          200: "#f4c791",
          300: "#198754",
        },
        pwinfo: {
          100: "#a6caff",
          200: "#5e9fff",
          300: "#0d6efd",
        },
        pwdanger: {
          100: "#ffb0b8",
          200: "#fa707e",
          300: "#dc3545",
        },
        pwwarning: {
          100: "#ffe9a6",
          200: "#fed456",
          300: "#ffc107",
        },
      },
      fontFamily: {
        pally: ["Pally", "sans-serif"],
        excon: ["Excon", "serif"],
      },
    },
  },
  plugins: [],
};
