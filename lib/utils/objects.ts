export const getIntKeys = (e: Record<string, unknown>): number[] => {
  return Object.keys(e)
    .map((key) => parseInt(key))
    .filter((key) => !Number.isNaN(key));
};
