/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mango Insurance brand palette — tuned to the real amber→orange logo.
        mango: {
          50: '#FFF6EC',
          100: '#FDECD6',
          200: '#FBD7A8',
          300: '#FBC069',
          400: '#FBB040', // gold (top of the logo gradient)
          500: '#F5821F', // primary brand orange (the "INSURANCE" orange)
          600: '#E06A12',
          700: '#C25612', // deep orange (text on light)
          800: '#9A4511',
          900: '#7C3811',
        },
        leaf: {
          50: '#E6F4EC',
          100: '#D2EBDC',
          200: '#A7D8BC',
          300: '#6FC096',
          400: '#42B07C',
          500: '#2FA56B', // success / trust green
          600: '#1E9E6A',
          700: '#197F55',
          800: '#155F41',
          900: '#114B34',
        },
        // Fortegra navy — used for the underwriter logo + deep accents.
        navy: {
          50: '#EAF0F6',
          100: '#CDDBEA',
          500: '#1C4470',
          700: '#16385C',
          900: '#0F2742',
        },
        // Cool charcoal, matching the Mango wordmark.
        ink: {
          DEFAULT: '#23232B',
          900: '#15151B',
          800: '#23232B',
          700: '#3A3A45',
          600: '#52525E',
          500: '#73737F',
          400: '#9A9AA5',
          300: '#B4B4BD',
          200: '#C9C9D1',
        },
        sand: {
          50: '#FFFFFF',
          100: '#FAF6F1',
          200: '#F6F1EA',
          300: '#F2ECE3',
          400: '#E9E2D8',
          500: '#E4DBCF',
          600: '#D8CDBD',
        },
        line: {
          DEFAULT: '#EFE8DE',
          soft: '#F2ECE3',
          mid: '#E4DCD0',
        },
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        display: ['Poppins', '"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        mango: '0 18px 40px -12px rgba(245,96,31,.45)',
        'mango-sm': '0 8px 18px -6px rgba(245,96,31,.55)',
        card: '0 1px 2px rgba(20,16,12,.04)',
        soft: '0 18px 50px -24px rgba(40,28,16,.28)',
        phone: '0 40px 80px -24px rgba(40,28,16,.5), 0 0 0 2px rgba(255,255,255,.04) inset',
        lift: '0 30px 60px -28px rgba(40,28,16,.4)',
      },
      maxWidth: {
        content: '1180px',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        pop: {
          '0%': { transform: 'scale(.6)', opacity: '0' },
          '60%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: { '0%,100%': { opacity: '.55' }, '50%': { opacity: '1' } },
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(4deg)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-30px) translateX(14px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-8%)' },
          '100%': { transform: 'translateX(8%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        fadeUp: 'fadeUp .5s ease both',
        spinSlow: 'spinSlow .9s linear infinite',
        pop: 'pop .55s ease both',
        pulseSoft: 'pulseSoft 1.2s ease infinite',
        float: 'float 7s ease-in-out infinite',
        floatSlow: 'floatSlow 11s ease-in-out infinite',
        drift: 'drift 9s ease-in-out infinite alternate',
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
}
