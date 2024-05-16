export const generateRequiredMessage = (
  fieldName: string,
  isRequired: boolean
) => {
  return isRequired
    ? {
        required: `${fieldName} is required.`,
      }
    : {};
};
