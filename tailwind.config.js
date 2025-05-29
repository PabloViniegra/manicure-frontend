import flyonui from 'flyonui'
import plugin from 'flyonui/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flyonui/dist/js/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Variable', 'sans-serif'],
        mont: ['Montserrat Variable', 'sans-serif'],
        display: ['Gabarito Variable', 'system-ui'],
        mono: ['Spline Sans Mono Variable', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#377DFF',
          light: '#EBF4FF',
          dark: '#1557C0',
        },
        accent: {
          DEFAULT: '#34D399',
          light: '#ECFDF5',
        },
        warning: {
          DEFAULT: '#FBBF24',
          light: '#FFFBEB',
        },
        danger: {
          DEFAULT: '#EF4444',
          light: '#FEF2F2',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        background: '#F7FAFC',
        surface: '#FFFFFF',
        muted: '#F1F5F9',
      },
    },
  },
  plugins: [flyonui, plugin],
}
