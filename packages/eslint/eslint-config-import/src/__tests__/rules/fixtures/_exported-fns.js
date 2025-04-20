/**
 * @deprecated Use `newImport` instead.
 */
export const deprecatedExport = () => {
  return 42;
};

export const validExport = () => {
  return 42;
};

// For testing no-rename-default
export default function defaultExport() {
  return [];
}

// For testing no-absolute-path
export const absolutePathExport = () => {
  return 42;
};

// For testing no-cycle
export const cycleExport = () => {
  return 42;
};

// For testing no-relative-packages
export const relativePackageExport = () => {
  return 42;
};
