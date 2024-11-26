export const theme = {
  colors: {
    // Main colors
    primary: '#007AFF',    // iOS Blue
    secondary: '#5856D6',  // iOS Purple
    
    // Backgrounds
    background: {
      primary: '#000000',  // True Black
      secondary: '#1C1C1E',// Dark Gray
      tertiary: '#2C2C2E', // Lighter Gray
    },
    
    // Surface colors
    surface: {
      primary: 'rgba(28, 28, 30, 0.9)',    // Glass effect dark
      secondary: 'rgba(44, 44, 46, 0.8)',   // Glass effect lighter
      elevated: 'rgba(58, 58, 60, 0.7)',    // Elevated surface
    },

    // Text colors
    text: {
      primary: '#FFFFFF',      // White
      secondary: '#8E8E93',    // Gray
      tertiary: '#48484A',     // Darker Gray
      accent: '#007AFF',       // iOS Blue
    },

    // Status colors
    status: {
      success: '#34C759',      // iOS Green
      warning: '#FF9500',      // iOS Orange
      error: '#FF3B30',        // iOS Red
      info: '#5856D6',         // iOS Purple
    },

    // Gradients
    gradients: {
      primary: ['#007AFF', '#5856D6'],      // Blue to Purple
      success: ['#34C759', '#30D158'],      // Green
      warning: ['#FF9500', '#FF3B30'],      // Orange to Red
      dark: ['#1C1C1E', '#2C2C2E'],         // Dark fade
      glass: [
        'rgba(28, 28, 30, 0.9)',
        'rgba(44, 44, 46, 0.8)',
      ],
    },

    // Special effects
    effects: {
      glass: {
        background: 'rgba(28, 28, 30, 0.8)',
        blur: 20,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      shadow: {
        light: {
          color: '#000',
          opacity: 0.1,
          offset: { width: 0, height: 2 },
          radius: 8,
        },
        medium: {
          color: '#000',
          opacity: 0.15,
          offset: { width: 0, height: 4 },
          radius: 16,
        },
      },
    },
  },

  typography: {
    fontFamily: {
      sans: 'System',      // San Francisco on iOS
      mono: 'Menlo',       // iOS monospace
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    }
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
  },

  borderRadius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 22,
    full: 9999,
  },

  // iOS-specific layout
  layout: {
    safeArea: {
      top: 47,      // iPhone notch area
      bottom: 34,   // iPhone home indicator area
    },
    navigationBar: {
      height: 44,
    },
    tabBar: {
      height: 49,
    },
  }
};
