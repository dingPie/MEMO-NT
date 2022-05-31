// my-theme.ts
import { DefaultTheme } from 'styled-components';

const calcRem = (size: number) => `${size / 16}rem`;

const colors = {
  black: "#000000",
  white: "#FFFFFF",
  dark_gray: "#505050",
  light_gray: "#F5F5F5",
  primary_blue: "#679BFF",
};

const fontSizes = {
  small: calcRem(12),
  base: calcRem(14),
  medium: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(22),
  xxl: calcRem(26),
  titleSize: calcRem(50),
};

const space = {
  small: calcRem(4),
  base: calcRem(6),
  medium: calcRem(8),
  lg: calcRem(12),
  xl: calcRem(16),
  xxl: calcRem(24),
};

const interval = {
  base: calcRem(50),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200),
};

const verticalInterval = {
  base: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

const deviceSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "480px",
  tablet: "768px",
  pc: "1024px",
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  pc: `only screen and (max-width: ${deviceSizes.pc})`,
};

const border = {
  main: `4px double ${colors.dark_gray}`,
  bottom: `2px solid ${colors.dark_gray}`
}

const boxShadow = {
  main: `4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)`,
  top: `-2px -2px 4px 0px #0000000D`,
  bottom: `4px 4px 10px 0px #0000001A`,
}

const theme: DefaultTheme = {
  colors,
  fontSizes,
  space,
  interval,
  verticalInterval,
  device,
  deviceSizes,
  border,
  boxShadow
};

export type ThemeColors = typeof colors;
export type ThemeFontSize = typeof fontSizes;
export type ThemeSpace = typeof space;
export type ThemeInterval = typeof interval;
export type ThemeVerticalInterval = typeof verticalInterval;
export type ThemeDevice = typeof device;
export type ThemeDeviceSizes = typeof deviceSizes;
export type ThemeBorder = typeof border;
export type ThemeBoxShadow = typeof boxShadow;

export default theme;