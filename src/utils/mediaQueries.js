const breakpoints = {
  sm: 768,
  lg: 1280,
};

const size = {
  sm: `${breakpoints.sm}px`,
  lg: `${breakpoints.lg}px`,
};

const device = {
  sm: `(max-width: ${size.sm})`,
  md: `(min-width: ${size.sm}) and (max-width: ${size.lg})`,
  lg: `(min-width: ${size.lg})`,
};

export default device;
