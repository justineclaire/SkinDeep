module.exports = {
  purge: {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/flowbite/**/*.js",
      "node_modules/flowbite-react/lib/esm/**/*.js",
    ],
  },
  theme: {
    extend: {
      fontSize: {
        'xxs': ['0.625rem', { // 10px font size
          lineHeight: '0.875rem', // 14px line height
        }],
      },
      colors: {
        "sky": '#CAE9F9',
        "webpink": '#ffc3c3',
        "bgpink": '#fbe6e3'
      },
    },
    fontFamily: {
      'Archivo': ['Archivo', 'sans-serif'],
      'Valera': ['Valera Round', 'sans-serif'],
      sanss: ['Graphik', 'sans-serif'],
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "BlinkMacSystemFont",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    screens: {
      'xs': '100px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}