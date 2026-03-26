import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:  { DEFAULT: '#0EA5E9', dark: '#0284C7', light: '#38BDF8' },
        clinical: { DEFAULT: '#10B981', dark: '#059669', light: '#34D399' },
        alert:    { DEFAULT: '#EF4444', dark: '#DC2626', light: '#F87171' },
        warning:  { DEFAULT: '#F59E0B', dark: '#D97706', light: '#FCD34D' },
        surface:  { DEFAULT: '#F8FAFC', card: '#FFFFFF', border: '#E2E8F0' },
        sidebar:  { DEFAULT: '#0F172A', hover: '#1E293B', active: '#1D4ED8' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        elevated: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}
export default config
