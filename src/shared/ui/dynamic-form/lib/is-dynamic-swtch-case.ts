export const isDynamicSwitchCase = (item: {
  value?: number | string[];
  [key: string]: any;
}): string | undefined => {
  const value = item?.value;
  if (!value) {
    return "MHInput";
  }
  if (Array.isArray(value)) {
    return "MHSelect";
  }
  if (typeof value === "number") {
    return "MHRangeInput";
  }
  return undefined;
};
