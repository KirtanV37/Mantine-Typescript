import {
  Button,
  createTheme,
  TextInput,
  localStorageColorSchemeManager,
  rem,
  PasswordInput,
  NavLink,
} from "@mantine/core";
import {
  primary,
  danger,
  dark,
  info,
  light,
  secondary,
  success,
  warning,
} from "./colors";

export const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  primaryColor: "primary",
  colors: {
    primary,
    secondary,
    success,
    danger,
    warning,
    info,
    light,
    dark,
  },
  defaultRadius: "sm",
  cursorType: "pointer",
  headings: {
    fontFamily: "Poppins, sans-serif",
    sizes: {
      h1: { fontSize: rem(36) },
      h2: { fontSize: rem(30) },
      h3: { fontSize: rem(24) },
    },
  },
  spacing: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "filled",
        radius: "md",
        size: "sm",
        color: "primary",
      },
      styles: {
        root: {
          fontWeight: 600,
          textTransform: "capitalize",
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        variant: "default",
        size: "sm",
        radius: "md",
      },
      styles: (theme) => ({
        input: {},
        label: {
          fontWeight: 400,
          color: theme.colors.secondary[9],
        },
      }),
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        variant: "default",
        size: "sm",
        radius: "md",
      },
      styles: (theme) => ({
        input: {
          borderColor: theme.colors.warning[3],
        },
        innerInput: {
          "&:hover": {
            border: `1px solid ${theme.colors.warning[9]}`,
          },
          "&:focus": {
            border: `1px solid ${theme.colors.success[5]} !important`,
            outline: "none",
          },
        },
        label: {
          fontWeight: 400,
          color: theme.colors.secondary[9],
          fontSize: theme.fontSizes.sm,
        },
        error: {
          fontSize: theme.fontSizes.xs,
          color: theme.colors.danger[6],
        },
        visibilityToggle: {
          color: theme.colors.secondary[4],
        },
      }),
    }),
    NavLink: NavLink.extend({
      defaultProps: {
        variant: "light",
      },
      styles: (theme, { active }) => ({
        root: {
          fontWeight: 500,
          textTransform: "capitalize",
          color: active ? theme.colors.primary[7] : theme.colors.secondary[7],
          backgroundColor: active ? theme.colors.primary[0] : undefined,
          "&:hover": {
            backgroundColor: theme.colors.primary[1],
          },
        },
        label: {
          fontSize: theme.fontSizes.sm,
        },
      }),
    }),
  },
});

export const colorSchemeManager = localStorageColorSchemeManager({
  key: "mantine-color-scheme",
});
