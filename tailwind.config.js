/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          active: 'var(--color-primary-active)',
        },
        ink: 'var(--color-ink)',
        body: 'var(--color-body)',
        muted: 'var(--color-muted)',
        hairline: {
          DEFAULT: 'var(--color-hairline)',
          strong: 'var(--color-border-strong)',
        },
        canvas: 'var(--color-canvas)',
        surface: {
          soft: 'var(--color-surface-soft)',
          strong: 'var(--color-surface-strong)',
          dark: 'var(--color-surface-dark)',
          'dark-elevated': 'var(--color-surface-dark-elevated)',
        },
        signature: {
          coral: 'var(--color-signature-coral)',
          forest: 'var(--color-signature-forest)',
          cream: 'var(--color-signature-cream)',
          peach: 'var(--color-signature-peach)',
          mint: 'var(--color-signature-mint)',
          yellow: 'var(--color-signature-yellow)',
          mustard: 'var(--color-signature-mustard)',
        },
        soft: {
          coral: 'var(--color-bg-soft-coral)',
          mint: 'var(--color-bg-soft-mint)',
          peach: 'var(--color-bg-soft-peach)',
        },
        'on-primary': 'var(--color-on-primary)',
        'on-dark': 'var(--color-on-dark)',
        link: {
          DEFAULT: 'var(--color-link)',
          active: 'var(--color-link-active)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          border: 'var(--color-info-border)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          border: 'var(--color-success-border)',
        },
        pricing: {
          ink: 'var(--color-pricing-ink)',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Outfit"', '"Inter"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['48px', { lineHeight: '1.1', fontWeight: '500', letterSpacing: '0' }],
        'display-lg': ['40px', { lineHeight: '1.2', fontWeight: '400', letterSpacing: '0' }],
        'display-md': ['32px', { lineHeight: '1.2', fontWeight: '400', letterSpacing: '0' }],
        'title-lg': ['24px', { lineHeight: '1.35', fontWeight: '400', letterSpacing: '0.12px' }],
        'title-md': ['20px', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0' }],
        'title-sm': ['18px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0' }],
        'label-md': ['16px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0' }],
        'button': ['16px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0' }],
        'body-md': ['14px', { lineHeight: '1.25', fontWeight: '400', letterSpacing: '0' }],
        'caption': ['14px', { lineHeight: '1.35', fontWeight: '500', letterSpacing: '0.16px' }],
        'legal': ['13.12px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0' }],
      },
      spacing: {
        'xxs': '4px',
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
        'section': '96px',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '6px',
        'md': '10px',
        'lg': '12px',
        'pill': '9999px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}
