const colors = {
  base: {
    100: '#FBFBFB',
    300: '#F2F2F2',
    400: '#D9D9D9',
    500: '#C1C1C1',
    700: '#767676',
    900: '#303030',
  },
  state: {
    error: {
      300: '#FED1D6',
      500: '#CA1628',
    },
    success: {
      300: '#CBFAD5',
      500: '#3EBB59',
    },
    warning: {
      300: '#FFF3D3',
      500: '#E6B535',
    },
  },
};

module.exports = {
  theme: {
    screens: {
      sm: '540px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontFamily: {
      display: ['lora', 'serif'],
      body: ['montserrat', 'lato', 'arial', 'sans-serif'],
    },
    fontSize: {
      xxs: '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    lineHeight: {
      1: '1rem',
      2: '1.25rem',
      3: '1.5rem',
      4: '1.75rem',
      5: '2rem',
      6: '2.5rem',
      7: '3.125rem',
      8: '3.5rem',
      9: '5.5rem',
    },
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#FFF',
    },
    boxShadow: {
      none: 'none',
      s: '0px 0px 4px rgba(0, 0, 0, 0.12)',
      sm: '0px 1px 4px rgba(0, 0, 0, 0.2)',
      DEFAULT: '0px 1px 8px rgba(0, 0, 0, 0.1)',
      xl: '0px 0px 16px rgba(0, 0, 0, 0.15)',
    },
    extend: {
      ringOffsetWidth: {
        3: '3px',
      },
    },
  },
};
