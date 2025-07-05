/**
 * Design Tokens - Aspire Card Management App
 * Based on Adobe XD design specifications
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#01AC66', // Main Aspire Green
    600: '#00835A', // Darker Aspire Green
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  // Secondary Colors
  secondary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#005DFF', // Aspire Blue
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Accent Colors
  accent: {
    purple: '#7B61FF',
    orange: '#F59E0B',
    pink: '#EC4899',
  },

  // Neutral Grays
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

  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Special Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const gradients = {
  // Card Gradients
  cardPrimary: 'linear-gradient(135deg, #01AC66 0%, #00835A 100%)',
  cardSecondary: 'linear-gradient(135deg, #005DFF 0%, #1E40AF 100%)',
  cardFrozen: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
  
  // Background Gradients
  appBackground: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
  modalBackdrop: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%)',
} as const;

export const typography = {
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    mono: ['SF Mono', 'Monaco', 'Cascadia Code', 'monospace'],
  },

  fontSize: {
    xs: '12px',    // 0.75rem
    sm: '14px',    // 0.875rem
    base: '16px',  // 1rem
    lg: '18px',    // 1.125rem
    xl: '20px',    // 1.25rem
    '2xl': '24px', // 1.5rem
    '3xl': '30px', // 1.875rem
    '4xl': '36px', // 2.25rem
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // Card specific shadows
  card: '0 8px 32px rgba(1, 172, 102, 0.2)',
  cardHover: '0 12px 40px rgba(1, 172, 102, 0.3)',
  cardFrozen: '0 8px 32px rgba(107, 114, 128, 0.2)',
} as const;

export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Component specific tokens
export const components = {
  card: {
    width: {
      mobile: '280px',
      desktop: '340px',
    },
    height: {
      mobile: '176px',
      desktop: '214px',
    },
    borderRadius: borderRadius.lg,
    shadow: shadows.card,
    shadowHover: shadows.cardHover,
  },

  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: {
      sm: `${spacing[2]} ${spacing[3]}`,
      md: `${spacing[3]} ${spacing[4]}`,
      lg: `${spacing[4]} ${spacing[6]}`,
    },
    borderRadius: borderRadius.base,
  },

  modal: {
    width: '400px',
    borderRadius: borderRadius.lg,
    backdropBlur: '8px',
    padding: spacing[6],
  },

  carousel: {
    spacing: spacing[4],
    indicatorSize: '8px',
    arrowSize: '32px',
  },
} as const;

// CSS Custom Properties generator
export const generateCSSCustomProperties = () => {
  const cssVars: Record<string, string> = {};

  // Colors
  Object.entries(colors.primary).forEach(([key, value]) => {
    cssVars[`--color-primary-${key}`] = value;
  });

  Object.entries(colors.gray).forEach(([key, value]) => {
    cssVars[`--color-gray-${key}`] = value;
  });

  // Spacing
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });

  // Component specific
  cssVars['--card-width-mobile'] = components.card.width.mobile;
  cssVars['--card-width-desktop'] = components.card.width.desktop;
  cssVars['--card-height-mobile'] = components.card.height.mobile;
  cssVars['--card-height-desktop'] = components.card.height.desktop;

  return cssVars;
};

// Theme configuration for Tailwind CSS
export const tailwindTheme = {
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    gray: colors.gray,
    white: colors.white,
    black: colors.black,
    transparent: colors.transparent,
    success: colors.status.success,
    warning: colors.status.warning,
    error: colors.status.error,
    info: colors.status.info,
  },
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  fontWeight: typography.fontWeight,
  spacing,
  borderRadius,
  boxShadow: shadows,
  screens: breakpoints,
};